"""
Explainable Rule-Based Eligibility Engine for CitizenScheme AI.
Decoupled deterministic criteria evaluation that guarantees transparency,
prevents AI hallucinations, and provides criterion-by-criterion explanations.
"""
from typing import List, Tuple
from .models import CitizenProfile, EligibilityCriteria, GovernmentScheme, EligibilityResult, CriterionCheck

def evaluate_scheme_eligibility(scheme: GovernmentScheme, profile: CitizenProfile, language: str = "en") -> EligibilityResult:
    criteria = scheme.eligibility_criteria
    satisfied: List[CriterionCheck] = []
    unmet: List[CriterionCheck] = []
    neutral: List[CriterionCheck] = []
    
    # 1. Age Evaluation
    if criteria.age_min is not None or criteria.age_max is not None:
        min_age = criteria.age_min if criteria.age_min is not None else 0
        max_age = criteria.age_max if criteria.age_max is not None else 120
        age_satisfied = (min_age <= profile.age <= max_age)
        
        req_str = f"{min_age} to {max_age} years" if criteria.age_max else f"Minimum {min_age} years"
        check = CriterionCheck(
            criterion="Age Requirement",
            satisfied=age_satisfied,
            citizen_value=f"{profile.age} years old",
            required_value=req_str,
            message="Your age qualifies for this scheme" if age_satisfied else f"Applicant age ({profile.age}) is outside required range ({req_str})"
        )
        if age_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)
            
    # 2. Income Evaluation
    if criteria.income_max is not None and criteria.income_max > 0:
        income_satisfied = profile.annual_income <= criteria.income_max
        req_str = f"Up to ₹{int(criteria.income_max):,} per year"
        cit_str = f"₹{int(profile.annual_income):,} per year"
        check = CriterionCheck(
            criterion="Annual Family Income",
            satisfied=income_satisfied,
            citizen_value=cit_str,
            required_value=req_str,
            message="Income is within the permissible ceiling" if income_satisfied else f"Annual family income exceeds maximum limit of ₹{int(criteria.income_max):,}"
        )
        if income_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)
            
    # 3. State / Residence Evaluation
    if criteria.allowed_states and "All" not in criteria.allowed_states and "All India" not in criteria.allowed_states:
        state_satisfied = (profile.state in criteria.allowed_states)
        req_str = ", ".join(criteria.allowed_states)
        check = CriterionCheck(
            criterion="State of Residence",
            satisfied=state_satisfied,
            citizen_value=profile.state,
            required_value=req_str,
            message=f"Resident of eligible state ({profile.state})" if state_satisfied else f"Scheme is restricted to residents of {req_str}"
        )
        if state_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)
            
    # 4. Area Type (Rural / Urban) Evaluation
    if criteria.allowed_area_types and "All" not in criteria.allowed_area_types:
        area_satisfied = (profile.area_type in criteria.allowed_area_types)
        req_str = ", ".join(criteria.allowed_area_types)
        check = CriterionCheck(
            criterion="Domicile Location",
            satisfied=area_satisfied,
            citizen_value=profile.area_type,
            required_value=req_str,
            message=f"Matches required area type ({profile.area_type})" if area_satisfied else f"Scheme restricted to {req_str} households"
        )
        if area_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # 5. Gender Requirement (Strictly Gender-Neutral Engine)
    if criteria.gender_requirement and criteria.gender_requirement.lower() not in ["any", "all", "none"]:
        gender_satisfied = (profile.gender.lower() == criteria.gender_requirement.lower())
        check = CriterionCheck(
            criterion="Gender Specificity",
            satisfied=gender_satisfied,
            citizen_value=profile.gender,
            required_value=criteria.gender_requirement,
            message="Gender criterion matches" if gender_satisfied else f"Scheme specifically targeted to {criteria.gender_requirement}"
        )
        if gender_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)
    else:
        neutral.append(CriterionCheck(
            criterion="Gender Requirement",
            satisfied=True,
            is_neutral=True,
            citizen_value=profile.gender,
            required_value="Open to all genders",
            message="Gender is not a restriction for this scheme. Open to all citizens."
        ))

    # 6. Farmer Status
    if criteria.farmer_required:
        farmer_satisfied = profile.farmer_status or ("farmer" in profile.occupation.lower())
        check = CriterionCheck(
            criterion="Farmer / Agricultural Category",
            satisfied=farmer_satisfied,
            citizen_value="Farmer" if farmer_satisfied else profile.occupation,
            required_value="Farmer / Agricultural Landholder",
            message="Verified as agricultural cultivator / farmer" if farmer_satisfied else "Scheme requires applicant to be an active farmer or agricultural landholder"
        )
        if farmer_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # 7. Student Status
    if criteria.student_required:
        student_satisfied = profile.student_status or ("student" in profile.occupation.lower())
        check = CriterionCheck(
            criterion="Student Status",
            satisfied=student_satisfied,
            citizen_value="Enrolled Student" if student_satisfied else profile.occupation,
            required_value="Enrolled Student in Recognized Institution",
            message="Active student status verified" if student_satisfied else "Scheme requires current enrollment as a student"
        )
        if student_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # 8. Disability Requirement
    if criteria.disability_required:
        disability_satisfied = profile.disability_status
        check = CriterionCheck(
            criterion="Divyangjan / Disability Certificate",
            satisfied=disability_satisfied,
            citizen_value=f"Disability Verified ({profile.disability_percentage}%)" if disability_satisfied else "Not Applicable",
            required_value="Benchmark Disability (40%+)",
            message="Eligible under Divyangjan disability guidelines" if disability_satisfied else "Requires certified benchmark disability of 40% or higher"
        )
        if disability_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # 9. Senior Citizen Status
    if criteria.senior_required:
        senior_satisfied = profile.senior_citizen_status or (profile.age >= 60)
        check = CriterionCheck(
            criterion="Senior Citizen Classification",
            satisfied=senior_satisfied,
            citizen_value=f"{profile.age} years old",
            required_value="Age 60 years or above",
            message="Qualifies as senior citizen" if senior_satisfied else "Applicant is under 60 years of age"
        )
        if senior_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # 10. Social Category (OBC, SC, ST, etc.)
    if criteria.allowed_categories and "All" not in criteria.allowed_categories:
        cat_satisfied = (profile.social_category in criteria.allowed_categories)
        req_str = ", ".join(criteria.allowed_categories)
        check = CriterionCheck(
            criterion="Social Category / Quota",
            satisfied=cat_satisfied,
            citizen_value=profile.social_category,
            required_value=req_str,
            message=f"Category ({profile.social_category}) is eligible" if cat_satisfied else f"Restricted to categories: {req_str}"
        )
        if cat_satisfied:
            satisfied.append(check)
        else:
            unmet.append(check)

    # Document Cross-Verification
    available_docs: List[str] = []
    missing_docs: List[str] = []
    
    for req_doc in scheme.required_documents:
        # Check fuzzy match against verified documents
        has_doc = any(
            req_doc.lower() in d.lower() or d.lower() in req_doc.lower()
            for d in profile.verified_documents
        )
        if has_doc:
            available_docs.append(req_doc)
        else:
            missing_docs.append(req_doc)

    # Scoring Calculation
    total_hard_criteria = len(satisfied) + len(unmet)
    if total_hard_criteria == 0:
        base_match = 95
    else:
        base_match = int((len(satisfied) / total_hard_criteria) * 100)

    # Doc penalty if documents missing (max 15% reduction)
    if scheme.required_documents:
        doc_ratio = len(available_docs) / len(scheme.required_documents)
        final_score = int((base_match * 0.85) + (doc_ratio * 15))
    else:
        final_score = base_match

    # Final Classification & Badging (Aligned with Requirement 2)
    if len(unmet) > 0:
        if final_score >= 60 and len(unmet) == 1:
            status = "May Be Eligible"
            status_badge = "yellow"
            final_score = min(final_score, 68)
        else:
            status = "Not Eligible"
            status_badge = "red"
            final_score = min(final_score, 45)
    else:
        if len(missing_docs) == 0:
            status = "Likely Eligible"
            status_badge = "green"
            final_score = max(final_score, 92)
        elif len(missing_docs) <= 1:
            status = "May Be Eligible"
            status_badge = "yellow"
            final_score = max(min(final_score, 88), 75)
        else:
            status = "More Information Required"
            status_badge = "yellow"
            final_score = max(min(final_score, 80), 70)

    # Explainable Why Summary
    reasons = []
    for s in satisfied:
        reasons.append(f"✓ {s.criterion}: {s.message}")
    for u in unmet:
        reasons.append(f"✗ {u.criterion}: {u.message}")
    for n in neutral:
        reasons.append(f"— {n.criterion}: {n.message}")
    if missing_docs:
        reasons.append(f"• Needs Verification / Missing Documents: {', '.join(missing_docs)}")

    why_explanation = "\n".join(reasons)

    # Multilingual Summary text
    if language == "te":
        status_te = {
            "Likely Eligible": "అర్హత ఉండే అవకాశం ఉంది",
            "May Be Eligible": "సంభావ్యంగా అర్హులు",
            "More Information Required": "మరింత సమాచారం అవసరం",
            "Not Eligible": "అర్హులు కాదు"
        }.get(status, status)
        summary = f"మీ ప్రొఫైల్ వివరాల ఆధారంగా {final_score}% సరిపోలిక ఉంది. స్థితి: {status_te}."
    elif language == "hi":
        status_hi = {
            "Likely Eligible": "संभावित रूप से पात्र",
            "May Be Eligible": "संभावित पात्र",
            "More Information Required": "अधिक जानकारी आवश्यक",
            "Not Eligible": "पात्र नहीं"
        }.get(status, status)
        summary = f"आपके प्रोफाइल विवरण के आधार पर {final_score}% मिलान है। स्थिति: {status_hi}."
    else:
        summary = f"Based on your profile, your assessment shows a {final_score}% match. Status: {status}."

    return EligibilityResult(
        scheme_id=scheme.id,
        scheme_name=scheme.name,
        match_percentage=final_score,
        status=status,
        status_badge=status_badge,
        summary=summary,
        satisfied_criteria=satisfied,
        unmet_criteria=unmet,
        neutral_criteria=neutral,
        missing_documents=missing_docs,
        available_documents=available_docs,
        why_explanation=why_explanation,
        language=language
    )
