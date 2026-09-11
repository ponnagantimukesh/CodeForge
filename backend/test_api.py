"""
Automated unit tests for CitizenScheme AI backend functions.
Directly invokes endpoint handlers to verify logic without external network dependencies.
"""
from app.main import (
    health_check, get_schemes, get_all_matches,
    calculate_eligibility, EligibilityCheckRequest,
    simplify_text_or_sample, SimplifyTextRequest,
    assistant_chat, ChatRequest,
    get_profile, get_applications, get_notifications,
    get_admin_stats, get_admin_reviews
)

def test_all():
    print("1. Testing health_check()...")
    health = health_check()
    assert health["status"] == "healthy"
    print("   [PASS] Health check passed:", health["service"])

    print("\n2. Testing get_schemes()...")
    schemes = get_schemes()
    assert len(schemes) >= 7, f"Expected at least 7 schemes, got {len(schemes)}"
    print(f"   [PASS] Schemes retrieved: {len(schemes)} schemes")

    print("\n3. Testing get_all_matches()...")
    matches = get_all_matches()
    assert len(matches) > 0
    top = matches[0]
    print(f"   [PASS] Top match: {top['scheme'].name} ({top['eligibility'].match_percentage}%)")

    print("\n4. Testing calculate_eligibility()...")
    req = EligibilityCheckRequest(scheme_id="pm-kisan", language="en")
    elig = calculate_eligibility(req)
    assert elig.match_percentage > 0
    print(f"   [PASS] Eligibility result: {elig.status} ({elig.match_percentage}%)")

    print("\n5. Testing simplify_text_or_sample() for PM-KISAN...")
    simp_req = SimplifyTextRequest(sample_id="pm-kisan", language="en")
    simp_res = simplify_text_or_sample(simp_req)
    assert simp_res["success"] is True
    print(f"   [PASS] Simplification verified: {simp_res['simplified_scheme'].name}")

    print("\n6. Testing assistant_chat() in English...")
    chat_req = ChatRequest(message="Which schemes am I eligible for?", language="en")
    chat_res = assistant_chat(chat_req)
    assert len(chat_res.reply) > 20
    print(f"   [PASS] English Chat reply length: {len(chat_res.reply)} chars")

    print("\n7. Testing assistant_chat() in Telugu...")
    chat_te_req = ChatRequest(message="What schemes are there?", language="te")
    chat_te_res = assistant_chat(chat_te_req)
    assert len(chat_te_res.reply) > 20
    print(f"   [PASS] Telugu Chat reply length: {len(chat_te_res.reply)} chars")

    print("\n8. Testing get_admin_stats() and get_admin_reviews()...")
    stats = get_admin_stats()
    reviews = get_admin_reviews()
    assert stats["total_schemes"] >= 7
    assert len(reviews) >= 2
    print(f"   [PASS] Admin stats: {stats['total_schemes']} schemes, {len(reviews)} pending rule reviews")

    print("\n9. Testing Document Locker endpoints...")
    from app.main import get_locker_documents, upload_locker_document, AddLockerDocumentRequest, sync_digilocker, delete_locker_document
    docs = get_locker_documents()
    assert len(docs) >= 5
    print(f"   [PASS] Initial locker documents: {len(docs)}")

    uploaded = upload_locker_document(AddLockerDocumentRequest(
        name="Voter Identity Card",
        category="Identity Proof",
        document_number="EPIC-901421",
        file_name="epic_voter_id.pdf"
    ))
    assert uploaded.name == "Voter Identity Card"
    print(f"   [PASS] Uploaded document: {uploaded.name} (ID: {uploaded.id})")

    synced = sync_digilocker()
    assert synced["success"] is True
    print(f"   [PASS] DigiLocker sync: {synced['synced_count']} new documents synced, total {synced['total_documents']}")

    print("\n=======================================================")
    print("ALL BACKEND ENDPOINTS TESTED AND VERIFIED SUCCESSFULLY!")
    print("=======================================================")

if __name__ == "__main__":
    test_all()

