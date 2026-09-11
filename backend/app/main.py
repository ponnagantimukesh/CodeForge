"""
FastAPI Main Application for CitizenScheme AI.
High-performance REST API with CORS, PDF processing, rule evaluation,
chat assistant, persona management, and admin oversight.
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from .models import (
    CitizenProfile, GovernmentScheme, EligibilityResult,
    ChatRequest, ChatResponse, ApplicationItem, NotificationItem,
    AdminRuleReviewItem, LockerDocument, CreateApplicationRequest,
    ApplicationStatusLog
)
from .data import (
    INITIAL_SCHEMES, PRESET_PERSONAS, INITIAL_APPLICATIONS,
    INITIAL_NOTIFICATIONS, INITIAL_ADMIN_REVIEWS, SAMPLE_DOCUMENT_CORPUS,
    INITIAL_LOCKER_DOCUMENTS
)
from .rule_engine import evaluate_scheme_eligibility
from .ai_processor import (
    extract_text_from_pdf, simplify_scheme_document,
    grounded_chat_answer
)

app = FastAPI(
    title="CitizenScheme AI API",
    description="Generative AI & Explainable Rule Engine for Citizen Government Scheme Accessibility",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Datastore initialized with realistic seed data
db_schemes: List[GovernmentScheme] = [s.model_copy(deep=True) for s in INITIAL_SCHEMES]
db_profile: CitizenProfile = PRESET_PERSONAS["farmer_ramesh"].model_copy(deep=True)
db_applications: List[ApplicationItem] = [a.model_copy(deep=True) for a in INITIAL_APPLICATIONS]
db_notifications: List[NotificationItem] = [n.model_copy(deep=True) for n in INITIAL_NOTIFICATIONS]
db_admin_reviews: List[AdminRuleReviewItem] = [r.model_copy(deep=True) for r in INITIAL_ADMIN_REVIEWS]
db_locker_documents: List[LockerDocument] = [d.model_copy(deep=True) for d in INITIAL_LOCKER_DOCUMENTS]

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "CitizenScheme AI Backend",
        "version": "1.0.0",
        "schemes_count": len(db_schemes),
        "active_profile": db_profile.full_name
    }

# ----------------- SCHEMES ENDPOINTS -----------------

@app.get("/api/schemes", response_model=List[GovernmentScheme])
def get_schemes(
    search: Optional[str] = None,
    category: Optional[str] = None,
    level: Optional[str] = None,
    state: Optional[str] = None,
    status: Optional[str] = "Active"
):
    results = db_schemes
    if status and status != "All":
        results = [s for s in results if s.status.lower() == status.lower()]
    if category and category != "All":
        results = [s for s in results if s.category.lower() == category.lower()]
    if level and level != "All":
        results = [s for s in results if s.level.lower() == level.lower()]
    if state and state != "All" and state != "All India":
        results = [s for s in results if s.state == "All India" or s.state.lower() == state.lower()]
    if search:
        q = search.lower()
        results = [
            s for s in results
            if q in s.name.lower() or q in s.department.lower() or q in s.description.lower() or q in s.category.lower()
        ]
    return results

@app.get("/api/schemes/{scheme_id}", response_model=GovernmentScheme)
def get_scheme_by_id(scheme_id: str):
    for s in db_schemes:
        if s.id == scheme_id:
            return s
    raise HTTPException(status_code=404, detail="Scheme not found")

# ----------------- CITIZEN MATCHES & ELIGIBILITY -----------------

class EligibilityCheckRequest(BaseModel):
    scheme_id: str
    language: Optional[str] = "en"
    citizen_profile: Optional[CitizenProfile] = None

@app.post("/api/schemes/calculate-eligibility", response_model=EligibilityResult)
def calculate_eligibility(req: EligibilityCheckRequest):
    target = None
    for s in db_schemes:
        if s.id == req.scheme_id:
            target = s
            break
    if not target:
        raise HTTPException(status_code=404, detail="Scheme not found")
        
    profile = req.citizen_profile or db_profile
    return evaluate_scheme_eligibility(target, profile, language=req.language or "en")

@app.get("/api/schemes/matches/all")
def get_all_matches(language: Optional[str] = "en"):
    """Calculates eligibility for active profile across all schemes and sorts by match percentage."""
    matches = []
    for s in db_schemes:
        if s.status == "Active":
            res = evaluate_scheme_eligibility(s, db_profile, language=language or "en")
            matches.append({
                "scheme": s,
                "eligibility": res
            })
    # Sort highest match first
    matches.sort(key=lambda x: x["eligibility"].match_percentage, reverse=True)
    return matches

# ----------------- SIMPLIFY SCHEME (CORE FEATURE) -----------------

class SimplifyTextRequest(BaseModel):
    raw_text: Optional[str] = None
    sample_id: Optional[str] = None
    language: Optional[str] = "en"

@app.get("/api/sample-docs")
def get_sample_docs():
    """Returns sample documents ready for instant 1-click hackathon demonstration."""
    return [
        {
            "id": "pm-kisan",
            "title": "PM-KISAN Operational Guidelines.pdf",
            "department": "Ministry of Agriculture & Farmers Welfare",
            "pages": 14,
            "size": "1.2 MB",
            "preview": "Central Sector Scheme providing income support to all landholding eligible farmer families..."
        },
        {
            "id": "pm-jay",
            "title": "Ayushman Bharat PM-JAY Policy Circular.pdf",
            "department": "National Health Authority",
            "pages": 22,
            "size": "2.4 MB",
            "preview": "Secondary and tertiary hospitalization cover of Rs. 5,00,000 per family per year..."
        },
        {
            "id": "post-matric",
            "title": "National Post-Matric Scholarship Scheme Guidelines.pdf",
            "department": "Ministry of Social Justice & Empowerment",
            "pages": 18,
            "size": "1.8 MB",
            "preview": "Financial assistance to students belonging to underprivileged communities (SC/ST/OBC/EWS)..."
        }
    ]

@app.post("/api/schemes/simplify-file")
async def simplify_pdf_file(
    file: UploadFile = File(...),
    language: str = Form("en")
):
    """Processes uploaded PDF file, extracts text, and returns structured plain-language summary."""
    try:
        content = await file.read()
        extracted_text = extract_text_from_pdf(content)
        scheme_summary = simplify_scheme_document(extracted_text, language=language)
        
        # Calculate instant match with active citizen profile
        eligibility = evaluate_scheme_eligibility(scheme_summary, db_profile, language=language)
        
        return {
            "success": True,
            "filename": file.filename,
            "file_size": f"{len(content) / 1024:.1f} KB",
            "extracted_text_preview": extracted_text[:500] + ("..." if len(extracted_text) > 500 else ""),
            "simplified_scheme": scheme_summary,
            "personalized_eligibility": eligibility
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process document: {str(e)}")

@app.post("/api/schemes/simplify-text")
def simplify_text_or_sample(req: SimplifyTextRequest):
    """Processes either raw text or one of the pre-loaded sample documents."""
    text = req.raw_text
    if req.sample_id and req.sample_id in SAMPLE_DOCUMENT_CORPUS:
        text = SAMPLE_DOCUMENT_CORPUS[req.sample_id]
        
    if not text:
        raise HTTPException(status_code=400, detail="Either raw_text or valid sample_id must be provided")
        
    scheme_summary = simplify_scheme_document(text, language=req.language or "en")
    eligibility = evaluate_scheme_eligibility(scheme_summary, db_profile, language=req.language or "en")
    
    return {
        "success": True,
        "sample_id": req.sample_id,
        "extracted_text_preview": text[:500] + ("..." if len(text) > 500 else ""),
        "simplified_scheme": scheme_summary,
        "personalized_eligibility": eligibility
    }

# ----------------- AI ASSISTANT & CHAT -----------------

@app.post("/api/assistant/chat", response_model=ChatResponse)
def assistant_chat(req: ChatRequest):
    profile = req.citizen_profile or db_profile
    return grounded_chat_answer(
        message=req.message,
        language=req.language,
        active_scheme_id=req.scheme_id,
        profile=profile
    )

# ----------------- PROFILE & PERSONAS -----------------

@app.get("/api/profile", response_model=CitizenProfile)
def get_profile():
    return db_profile

@app.put("/api/profile", response_model=CitizenProfile)
def update_profile(updated: CitizenProfile):
    global db_profile
    db_profile = updated
    return db_profile

@app.get("/api/profile/personas")
def get_personas():
    return [
        {
            "id": k,
            "label": f"{v.full_name} ({v.occupation}, {v.state})",
            "profile": v
        }
        for k, v in PRESET_PERSONAS.items()
    ]

@app.post("/api/profile/switch-persona/{persona_id}", response_model=CitizenProfile)
def switch_persona(persona_id: str):
    global db_profile
    if persona_id not in PRESET_PERSONAS:
        raise HTTPException(status_code=404, detail="Persona not found")
    db_profile = PRESET_PERSONAS[persona_id].model_copy(deep=True)
    return db_profile

# ----------------- APPLICATIONS -----------------

@app.get("/api/applications", response_model=List[ApplicationItem])
def get_applications():
    return db_applications

@app.post("/api/applications/{app_id}/upload-document")
def upload_missing_document(app_id: str, doc_name: str = Query(...)):
    for app_item in db_applications:
        if app_item.id == app_id:
            if doc_name in app_item.missing_documents:
                app_item.missing_documents.remove(doc_name)
            if len(app_item.missing_documents) == 0 and app_item.status == "Documents Required":
                app_item.status = "Under Review"
                app_item.current_step_index = 2
                app_item.remarks = "All required documents uploaded successfully. Verification in progress."
            return {"success": True, "application": app_item}
    raise HTTPException(status_code=404, detail="Application not found")

# ----------------- NOTIFICATIONS -----------------

@app.get("/api/notifications", response_model=List[NotificationItem])
def get_notifications():
    return db_notifications

@app.put("/api/notifications/{notif_id}/read")
def mark_notification_read(notif_id: str):
    for n in db_notifications:
        if n.id == notif_id:
            n.is_read = True
            return {"success": True}
    raise HTTPException(status_code=404, detail="Notification not found")

@app.put("/api/notifications/mark-all-read")
def mark_all_notifications_read():
    for n in db_notifications:
        n.is_read = True
    return {"success": True, "marked": len(db_notifications)}

# ----------------- DOCUMENT LOCKER (CITIZEN VAULT) -----------------

@app.get("/api/locker", response_model=List[LockerDocument])
def get_locker_documents():
    return db_locker_documents

class AddLockerDocumentRequest(BaseModel):
    name: str
    category: str
    document_number: Optional[str] = None
    file_name: str
    file_size: Optional[str] = "1.2 MB"
    source: Optional[str] = "Citizen Upload"

@app.post("/api/locker/upload", response_model=LockerDocument)
def upload_locker_document(req: AddLockerDocumentRequest):
    new_doc = LockerDocument(
        id=f"doc-{abs(hash(req.name + str(len(db_locker_documents)))) % 10000}",
        name=req.name,
        category=req.category,
        document_number=req.document_number or f"REG-{len(db_locker_documents) + 100}",
        file_name=req.file_name,
        file_size=req.file_size or "1.2 MB",
        uploaded_at="2026-09-11",
        source=req.source or "Citizen Upload",
        verification_status="Verified",
        matched_schemes=[
            s.name for s in db_schemes
            if any(req.name.lower() in d.lower() or d.lower() in req.name.lower() for d in s.required_documents)
        ]
    )
    db_locker_documents.insert(0, new_doc)
    
    # Auto-synchronize with citizen profile
    if req.name not in db_profile.verified_documents:
        db_profile.verified_documents.append(req.name)
        
    return new_doc

@app.delete("/api/locker/{doc_id}")
def delete_locker_document(doc_id: str):
    target = None
    for i, d in enumerate(db_locker_documents):
        if d.id == doc_id:
            target = db_locker_documents.pop(i)
            break
    if not target:
        raise HTTPException(status_code=404, detail="Document not found")
        
    # Also remove from profile verified docs if present
    if target.name in db_profile.verified_documents:
        db_profile.verified_documents.remove(target.name)
        
    return {"success": True, "deleted_id": doc_id, "name": target.name}

@app.post("/api/locker/sync-digilocker")
def sync_digilocker():
    """Simulates 1-click sync with DigiLocker national portal."""
    synced_count = 0
    candidate_docs = [
        ("Income Certificate", "Income & Finance", "IC-2026-TS-89104", "meeseva_income_certificate.pdf", ["National Post-Matric Scholarship", "PM Awas Yojana"]),
        ("Caste / Community Certificate", "Social Category", "CC-2026-TS-11294", "caste_community_certificate.pdf", ["National Post-Matric Scholarship"]),
        ("Residential Domicile Certificate", "Identity Proof", "RC-2026-TS-39102", "domicile_residence_telangana.pdf", ["Telangana Rythu Bharosa", "PM Awas Yojana"]),
    ]
    for name, cat, num, fname, schemes in candidate_docs:
        if not any(d.name.lower() == name.lower() for d in db_locker_documents):
            new_d = LockerDocument(
                id=f"doc-digi-{abs(hash(name)) % 1000}",
                name=name,
                category=cat,
                document_number=num,
                file_name=fname,
                file_size="950 KB",
                uploaded_at="2026-09-11",
                source="DigiLocker Verified",
                verification_status="Verified",
                matched_schemes=schemes
            )
            db_locker_documents.append(new_d)
            if name not in db_profile.verified_documents:
                db_profile.verified_documents.append(name)
            synced_count += 1
            
    return {"success": True, "synced_count": synced_count, "total_documents": len(db_locker_documents)}

# ----------------- ADMIN PANEL -----------------


@app.get("/api/admin/stats")
def get_admin_stats():
    active_count = sum(1 for s in db_schemes if s.status == "Active")
    pending_reviews_count = sum(1 for r in db_admin_reviews if r.status == "Pending Review")
    return {
        "total_schemes": len(db_schemes),
        "active_schemes": active_count,
        "pending_reviews": pending_reviews_count,
        "total_applications_tracked": len(db_applications),
        "documents_analyzed_count": 142
    }

@app.get("/api/admin/reviews", response_model=List[AdminRuleReviewItem])
def get_admin_reviews():
    return db_admin_reviews

@app.post("/api/admin/reviews/{review_id}/approve")
def approve_admin_review(review_id: str):
    for r in db_admin_reviews:
        if r.id == review_id:
            r.status = "Approved"
            # Auto-create or publish the scheme
            new_scheme = GovernmentScheme(
                id=f"approved-{r.id}",
                name=r.scheme_name,
                department=r.department,
                category=r.category,
                description=f"Official scheme approved by administrator from {r.document_name}.",
                simple_summary=r.extracted_benefits,
                one_line_summary=r.extracted_benefits[:120],
                benefits=r.extracted_benefits,
                eligibility_criteria=r.extracted_criteria,
                required_documents=r.extracted_documents,
                official_url="https://india.gov.in",
                status="Active",
                review_status="Approved"
            )
            db_schemes.append(new_scheme)
            return {"success": True, "message": "Scheme published successfully", "scheme_id": new_scheme.id}
    raise HTTPException(status_code=404, detail="Review item not found")

@app.post("/api/admin/reviews/{review_id}/reject")
def reject_admin_review(review_id: str, reason: str = Query("Criteria requires further validation")):
    for r in db_admin_reviews:
        if r.id == review_id:
            r.status = "Rejected"
            r.reviewer_notes = reason
            return {"success": True, "message": "Rule rejected"}
    raise HTTPException(status_code=404, detail="Review item not found")

@app.post("/api/admin/schemes", response_model=GovernmentScheme)
def create_scheme(scheme: GovernmentScheme):
    db_schemes.append(scheme)
    return scheme

@app.put("/api/admin/schemes/{scheme_id}", response_model=GovernmentScheme)
def update_scheme(scheme_id: str, updated: GovernmentScheme):
    for i, s in enumerate(db_schemes):
        if s.id == scheme_id:
            db_schemes[i] = updated
            return updated
    raise HTTPException(status_code=404, detail="Scheme not found")

@app.delete("/api/admin/schemes/{scheme_id}")
def delete_scheme(scheme_id: str):
    for i, s in enumerate(db_schemes):
        if s.id == scheme_id:
            db_schemes.pop(i)
            return {"success": True, "deleted_id": scheme_id}
    raise HTTPException(status_code=404, detail="Scheme not found")
