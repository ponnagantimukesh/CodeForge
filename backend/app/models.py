from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class CitizenProfile(BaseModel):
    id: str = "citizen-default"
    full_name: str = "Ramesh Kumar"
    age: int = 42
    gender: str = "Male"  # Male, Female, Transgender, Prefer not to say
    state: str = "Telangana"
    district: str = "Warangal"
    area_type: str = "Rural"  # Rural, Urban
    annual_income: float = 120000.0  # INR per annum
    occupation: str = "Small / Marginal Farmer"
    education_level: str = "Secondary School (10th Pass)"
    social_category: str = "OBC"  # General, OBC, SC, ST, EWS
    disability_status: bool = False
    disability_percentage: Optional[int] = 0
    employment_status: str = "Self-Employed"  # Employed, Unemployed, Self-Employed, Student
    farmer_status: bool = True
    student_status: bool = False
    senior_citizen_status: bool = False
    marital_status: str = "Married"
    family_size: int = 4
    verified_documents: List[str] = Field(default_factory=lambda: [
        "Aadhaar Card",
        "Bank Account Passbook",
        "Ration Card / Food Security Card",
        "Land Pattadar Passbook"
    ])

class EligibilityCriteria(BaseModel):
    age_min: Optional[int] = None
    age_max: Optional[int] = None
    income_max: Optional[float] = None
    allowed_states: List[str] = Field(default_factory=lambda: ["All"])
    allowed_area_types: List[str] = Field(default_factory=lambda: ["All"])
    allowed_occupations: List[str] = Field(default_factory=lambda: ["All"])
    allowed_categories: List[str] = Field(default_factory=lambda: ["All"])
    gender_requirement: str = "Any"  # Any, Male, Female, Transgender
    disability_required: bool = False
    farmer_required: bool = False
    student_required: bool = False
    senior_required: bool = False
    other_conditions: List[str] = Field(default_factory=list)

class SchemeCondition(BaseModel):
    criterion: str
    requirement: str
    explanation: str

class ApplicationStep(BaseModel):
    step_number: int
    title: str
    description: str

class GovernmentScheme(BaseModel):
    id: str
    name: str
    department: str
    level: str = "Central"  # Central, State
    state: str = "All India"
    category: str  # Agriculture, Healthcare, Education, Housing, Social Welfare, etc.
    description: str
    simple_summary: str
    one_line_summary: str
    benefits: str
    benefit_amount: Optional[str] = None
    eligibility_criteria: EligibilityCriteria
    structured_conditions: List[SchemeCondition] = Field(default_factory=list)
    who_can_apply: List[str] = Field(default_factory=list)
    who_cannot_apply: List[str] = Field(default_factory=list)
    required_documents: List[str] = Field(default_factory=list)
    application_steps: List[ApplicationStep] = Field(default_factory=list)
    start_date: str = "Ongoing"
    end_date: str = "31-03-2027"
    official_url: str
    source_document: str = "Official Gazette / Government Circular"
    last_updated: str = "2026-08-15"
    status: str = "Active"  # Active, Draft, Archived
    review_status: str = "Approved"  # Approved, Pending Review

class CriterionCheck(BaseModel):
    criterion: str
    satisfied: bool
    is_neutral: bool = False
    message: str
    citizen_value: str
    required_value: str

class EligibilityResult(BaseModel):
    scheme_id: str
    scheme_name: str
    match_percentage: int
    status: str  # "Eligible / Strong Match", "Potentially Eligible / Needs Verification", "Not Eligible"
    status_badge: str  # "green", "yellow", "red"
    summary: str
    satisfied_criteria: List[CriterionCheck]
    unmet_criteria: List[CriterionCheck]
    neutral_criteria: List[CriterionCheck]
    missing_documents: List[str]
    available_documents: List[str]
    why_explanation: str
    language: str = "en"

class ChatMessage(BaseModel):
    role: str  # user, assistant
    content: str
    timestamp: Optional[str] = None
    language: Optional[str] = "en"

class ChatRequest(BaseModel):
    message: str
    language: str = "en"  # "en", "te", "hi"
    scheme_id: Optional[str] = None
    history: List[ChatMessage] = Field(default_factory=list)
    citizen_profile: Optional[CitizenProfile] = None

class ChatResponse(BaseModel):
    reply: str
    language: str
    suggested_questions: List[str] = Field(default_factory=list)
    related_schemes: List[Dict[str, Any]] = Field(default_factory=list)

class ApplicationStatusLog(BaseModel):
    status: str
    timestamp: str
    remarks: Optional[str] = None

class ApplicationItem(BaseModel):
    id: str
    scheme_id: str
    scheme_name: str
    department: str
    application_number: str
    applied_date: str
    status: str  # Draft, Submitted, Under Review, Documents Required, Approved, Rejected, Completed
    current_step_index: int  # 0 to 4
    last_update: str
    missing_documents: List[str] = Field(default_factory=list)
    official_portal_url: str
    remarks: Optional[str] = None
    user_id: Optional[str] = "farmer_ramesh"
    applicant_name: Optional[str] = "Ramesh Kumar"
    submission_type: str = "Prototype Submission"  # Prototype Submission or Official Portal
    status_history: List[ApplicationStatusLog] = Field(default_factory=list)

class CreateApplicationRequest(BaseModel):
    scheme_id: str
    applicant_name: str
    applicant_phone: Optional[str] = None
    applicant_aadhaar: Optional[str] = None
    user_notes: Optional[str] = None

class NotificationItem(BaseModel):
    id: str
    title: str
    message: str
    type: str  # scheme_match, deadline, document_missing, status_change, rule_update
    date: str
    is_read: bool = False
    action_url: Optional[str] = None

class AdminRuleReviewItem(BaseModel):
    id: str
    document_name: str
    uploaded_at: str
    scheme_name: str
    department: str
    category: str
    raw_extracted_text_preview: str
    extracted_criteria: EligibilityCriteria
    extracted_benefits: str
    extracted_documents: List[str]
    confidence_score: float
    status: str = "Pending Review"  # Pending Review, Approved, Rejected
    reviewer_notes: Optional[str] = ""

class LockerDocument(BaseModel):
    id: str
    name: str
    category: str  # Identity Proof, Land & Agriculture, Income & Finance, Education, Social Category, Health & Disability
    document_number: Optional[str] = None
    file_name: str
    file_size: str = "1.4 MB"
    uploaded_at: str
    source: str = "DigiLocker Verified"  # DigiLocker Verified, Citizen Upload, Department Issued
    verification_status: str = "Verified"  # Verified, Pending Verification, Rejected
    matched_schemes: List[str] = Field(default_factory=list)
    preview_url: Optional[str] = None

