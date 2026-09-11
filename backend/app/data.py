"""
Seed Data & Knowledge Base for CitizenScheme AI.
Realistic Indian Central & State schemes with full criteria, documents,
timelines, official portals, and sample citizen profiles.
"""
from typing import List, Dict, Any
from .models import (
    GovernmentScheme, EligibilityCriteria, SchemeCondition,
    ApplicationStep, CitizenProfile, ApplicationItem, NotificationItem,
    AdminRuleReviewItem, LockerDocument, ApplicationStatusLog
)

# Preset Citizen Personas for instant demo switching
PRESET_PERSONAS: Dict[str, CitizenProfile] = {
    "farmer_ramesh": CitizenProfile(
        id="farmer_ramesh",
        full_name="Ramesh Kumar",
        age=42,
        gender="Male",
        state="Telangana",
        district="Warangal",
        area_type="Rural",
        annual_income=120000.0,
        occupation="Small / Marginal Farmer",
        education_level="Secondary School (10th Pass)",
        social_category="OBC",
        disability_status=False,
        disability_percentage=0,
        employment_status="Self-Employed",
        farmer_status=True,
        student_status=False,
        senior_citizen_status=False,
        marital_status="Married",
        family_size=4,
        verified_documents=[
            "Aadhaar Card",
            "Bank Account Passbook",
            "Ration Card / Food Security Card",
            "Land Pattadar Passbook"
        ]
    ),
    "student_priya": CitizenProfile(
        id="student_priya",
        full_name="Priya Sharma",
        age=20,
        gender="Female",
        state="Telangana",
        district="Hyderabad",
        area_type="Urban",
        annual_income=180000.0,
        occupation="Undergraduate Student",
        education_level="Higher Secondary (12th Pass)",
        social_category="SC",
        disability_status=False,
        disability_percentage=0,
        employment_status="Student",
        farmer_status=False,
        student_status=True,
        senior_citizen_status=False,
        marital_status="Single",
        family_size=3,
        verified_documents=[
            "Aadhaar Card",
            "Bank Account Passbook",
            "College Bonafide Certificate",
            "Income Certificate",
            "Caste Certificate (SC)"
        ]
    ),
    "senior_sunita": CitizenProfile(
        id="senior_sunita",
        full_name="Sunita Bai",
        age=67,
        gender="Female",
        state="Telangana",
        district="Karimnagar",
        area_type="Rural",
        annual_income=50000.0,
        occupation="Retired / Homemaker",
        education_level="Primary School",
        social_category="General",
        disability_status=False,
        disability_percentage=0,
        employment_status="Unemployed",
        farmer_status=False,
        student_status=False,
        senior_citizen_status=True,
        marital_status="Widowed",
        family_size=1,
        verified_documents=[
            "Aadhaar Card",
            "Bank Account Passbook",
            "Age Proof Certificate",
            "BPL Ration Card"
        ]
    ),
    "divyangjan_lakshmi": CitizenProfile(
        id="divyangjan_lakshmi",
        full_name="Lakshmi Narayana",
        age=34,
        gender="Male",
        state="Telangana",
        district="Nalgonda",
        area_type="Rural",
        annual_income=95000.0,
        occupation="Handicraft Artisan",
        education_level="Secondary School",
        social_category="OBC",
        disability_status=True,
        disability_percentage=55,
        employment_status="Self-Employed",
        farmer_status=False,
        student_status=False,
        senior_citizen_status=False,
        marital_status="Married",
        family_size=3,
        verified_documents=[
            "Aadhaar Card",
            "Bank Account Passbook",
            "Unique Disability ID (UDID) Card",
            "Income Certificate"
        ]
    ),
    "youth_arun": CitizenProfile(
        id="youth_arun",
        full_name="Arun Varma",
        age=26,
        gender="Male",
        state="Telangana",
        district="Rangareddy",
        area_type="Urban",
        annual_income=210000.0,
        occupation="Job Seeker / Skill Trainee",
        education_level="Graduate (B.Com)",
        social_category="EWS",
        disability_status=False,
        disability_percentage=0,
        employment_status="Unemployed",
        farmer_status=False,
        student_status=False,
        senior_citizen_status=False,
        marital_status="Single",
        family_size=4,
        verified_documents=[
            "Aadhaar Card",
            "Bank Account Passbook",
            "Degree Certificate"
        ]
    )
}

INITIAL_SCHEMES: List[GovernmentScheme] = [
    GovernmentScheme(
        id="pm-kisan",
        name="PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        department="Ministry of Agriculture and Farmers Welfare",
        level="Central",
        state="All India",
        category="Agriculture",
        description="Central Sector Scheme providing income support to all landholding farmers' families in the country to cultivate agricultural land and meet domestic needs.",
        simple_summary="If you own cultivable agricultural land, the government gives you ₹6,000 every year directly into your bank account in 3 equal installments of ₹2,000 each.",
        one_line_summary="Direct annual financial assistance of ₹6,000 for landholding farming families.",
        benefits="Direct financial benefit of ₹6,000 per year transferred directly to Aadhaar-linked bank accounts in three four-monthly installments of ₹2,000.",
        benefit_amount="₹6,000 / year (in 3 installments)",
        eligibility_criteria=EligibilityCriteria(
            age_min=18,
            age_max=85,
            income_max=300000.0,
            allowed_states=["All"],
            allowed_area_types=["Rural", "Urban"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=True,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Must hold cultivable land in applicant's or family's name",
                "Institutional landholders and income tax payers are excluded"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Occupation / Landholding", requirement="Small & Marginal Farmer", explanation="Must own cultivable agricultural land registered in land records."),
            SchemeCondition(criterion="Age Range", requirement="18 to 85 years", explanation="Adult landholders heading or part of the farming family."),
            SchemeCondition(criterion="Tax Exclusion", requirement="Non-Income Tax Payer", explanation="Family members must not have paid income tax in the previous assessment year."),
            SchemeCondition(criterion="Bank & Aadhaar", requirement="Aadhaar-seeded Bank Account", explanation="Bank account must be active and linked with NPCI/Aadhaar.")
        ],
        who_can_apply=[
            "All landholder farmer families who possess cultivable landholding in their names",
            "Small and marginal farmers across all States and Union Territories",
            "Both rural and semi-urban agricultural landowners"
        ],
        who_cannot_apply=[
            "All institutional landholders",
            "Farmer families with any member holding or previously held constitutional posts",
            "Former and present Ministers, MPs, MLAs, MLCs, Mayors, District Panchayat Chairpersons",
            "Serving or retired government officers and employees",
            "Persons who paid income tax in the last assessment year",
            "Professionals like Doctors, Engineers, Lawyers, Chartered Accountants"
        ],
        required_documents=[
            "Aadhaar Card",
            "Land Pattadar Passbook / Land Ownership Document",
            "Bank Account Passbook (Aadhaar Seeded)",
            "Ration Card / Food Security Card",
            "Active Mobile Number (for OTP)"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Portal Visit", description="Visit the official PM-KISAN portal (pmkisan.gov.in) or visit your nearest Common Service Centre (CSC)."),
            ApplicationStep(step_number=2, title="New Farmer Registration", description="Click on 'Farmers Corner' and select 'New Farmer Registration'. Enter Aadhaar and State."),
            ApplicationStep(step_number=3, title="Details Entry", description="Fill personal details, bank account (IFSC code), and land ownership details (Survey/Khata number)."),
            ApplicationStep(step_number=4, title="Document Upload", description="Upload soft copies of your Land Record (Passbook/RoR) and Aadhaar card."),
            ApplicationStep(step_number=5, title="Submit & Verify", description="Submit form and save Registration ID. District Revenue and Agriculture officials verify details."),
            ApplicationStep(step_number=6, title="Benefit Transfer", description="Installment of ₹2,000 credited automatically every 4 months via Direct Benefit Transfer (DBT).")
        ],
        start_date="01-12-2018",
        end_date="Ongoing",
        official_url="https://pmkisan.gov.in",
        source_document="PM-KISAN Operational Guidelines - Ministry of Agriculture & Farmers Welfare, GoI",
        last_updated="2026-07-20",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="pm-jay",
        name="Ayushman Bharat — PM-JAY (Pradhan Mantri Jan Arogya Yojana)",
        department="National Health Authority (NHA), Ministry of Health & Family Welfare",
        level="Central",
        state="All India",
        category="Healthcare",
        description="The world's largest government-funded health assurance scheme, providing secondary and tertiary care hospitalization coverage to bottom 40% vulnerable citizens.",
        simple_summary="Get up to ₹5,00,000 worth of free medical treatment and hospitalization per family every year at empanelled public and private hospitals across India.",
        one_line_summary="Free cashless hospital healthcare cover up to ₹5 Lakh per year per family.",
        benefits="Cashless and paperless inpatient medical treatment up to ₹5 Lakh per family per year covering 1,949 medical procedures, diagnostics, and medicines.",
        benefit_amount="₹5,00,000 / year per family (Cashless Health Cover)",
        eligibility_criteria=EligibilityCriteria(
            age_min=0,
            age_max=120,
            income_max=250000.0,
            allowed_states=["All"],
            allowed_area_types=["Rural", "Urban"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Identified under SECC 2011 deprivation criteria or designated BPL / Food Security cardholders",
                "Senior citizens aged 70+ now eligible regardless of income under Ayushman Bharat Vay Vandana expansion"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Socio-Economic Status", requirement="Low Income / SECC Deprivation", explanation="Belonging to deprivation categories (D1 to D7) or NFSA ration cardholder."),
            SchemeCondition(criterion="Family Size Cap", requirement="No restriction", explanation="Covers all family members with no cap on family size or age."),
            SchemeCondition(criterion="Pre-existing Conditions", requirement="Covered from Day 1", explanation="All pre-existing diseases are covered without any waiting period.")
        ],
        who_can_apply=[
            "Families registered under National Food Security Act (NFSA) / BPL Ration Card",
            "Households identified under rural deprivation categories or urban occupational criteria",
            "All senior citizens aged 70 and above under expanded coverage"
        ],
        who_cannot_apply=[
            "Families possessing 4-wheelers, motorized fishing boats or heavy agricultural machinery",
            "Households with government employees or income tax paying members",
            "Families owning mechanized 3-4 room concrete houses with high land ceilings"
        ],
        required_documents=[
            "Aadhaar Card of all family members",
            "Ration Card / Food Security Card",
            "Active Mobile Number",
            "Income Certificate or BPL Proof"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Check Am I Eligible", description="Visit 'beneficiary.nha.gov.in' or visit any government hospital Ayushman Mitra desk."),
            ApplicationStep(step_number=2, title="Search Family", description="Search using Aadhaar Number, Ration Card Number, or Mobile Number."),
            ApplicationStep(step_number=3, title="e-KYC Verification", description="Complete instant Aadhaar OTP or Biometric authentication at the hospital/CSC."),
            ApplicationStep(step_number=4, title="Card Generation", description="Instant verification issues your Ayushman Bharat Golden Card with PM-JAY ID."),
            ApplicationStep(step_number=5, title="Cashless Admission", description="Present card at any empanelled hospital for 100% cashless hospitalization up to ₹5 Lakh.")
        ],
        start_date="23-09-2018",
        end_date="Ongoing",
        official_url="https://beneficiary.nha.gov.in",
        source_document="NHA Guidelines for Ayushman Bharat PM-JAY - Ministry of Health & Family Welfare",
        last_updated="2026-08-01",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="post-matric-scholarship",
        name="National Post-Matric Scholarship for SC/ST/OBC Students",
        department="Ministry of Social Justice and Empowerment",
        level="Central",
        state="All India",
        category="Scholarships",
        description="Centrally sponsored scheme providing financial assistance to students belonging to underprivileged categories pursuing post-matriculation or post-secondary education.",
        simple_summary="Full tuition fee reimbursement plus a monthly maintenance allowance for students pursuing Intermediate, Diploma, Degree, or PG courses.",
        one_line_summary="Full tuition reimbursement + monthly maintenance allowance for college students.",
        benefits="100% non-refundable compulsory fees reimbursement plus maintenance allowance up to ₹13,500 per year credited directly to student's Aadhaar-seeded bank account.",
        benefit_amount="Full Tuition Fees + up to ₹13,500/year allowance",
        eligibility_criteria=EligibilityCriteria(
            age_min=15,
            age_max=35,
            income_max=250000.0,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["SC", "ST", "OBC", "EWS"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=True,
            senior_required=False,
            other_conditions=[
                "Must have passed Class 10 (Matriculation) from a recognized Board",
                "Must be enrolled in a recognized Post-Matric / Higher Education institution"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Student Enrollment", requirement="Post-Matric Course (Class 11 to PG)", explanation="Enrolled in recognized college, university, polytechnic or ITI."),
            SchemeCondition(criterion="Annual Family Income", requirement="Below ₹2,50,000 / year", explanation="Total family income from all sources must not exceed ₹2.5 Lakh."),
            SchemeCondition(criterion="Category", requirement="SC / ST / OBC / EWS", explanation="Applicant must belong to recognized disadvantaged category."),
            SchemeCondition(criterion="Academic Record", requirement="Passed previous qualifying exam", explanation="Must have successfully passed the qualifying class without backlogs.")
        ],
        who_can_apply=[
            "Students who passed Class 10 and pursuing Class 11, 12, ITI, Polytechnic, UG, or PG",
            "Belonging to SC, ST, OBC, or EWS categories with family income under ₹2.5 Lakh",
            "Day scholars and hostellers studying in government or accredited private institutions"
        ],
        who_cannot_apply=[
            "Students whose parental annual income exceeds ₹2,50,000",
            "Students already availing benefits of any other parallel government scholarship scheme",
            "Students pursuing same stage of education in a different subject (e.g. B.Com after B.A.)"
        ],
        required_documents=[
            "Aadhaar Card",
            "Previous Class Marksheet / Passing Certificate",
            "Income Certificate issued by Revenue Authority (Tahsildar)",
            "Caste / Community Certificate",
            "College Bonafide / Admission Fee Receipt",
            "Bank Account Passbook (Linked to Aadhaar)",
            "Passport Size Photograph"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="NSP Registration", description="Visit National Scholarship Portal (scholarships.gov.in) and register with Aadhaar OTP."),
            ApplicationStep(step_number=2, title="Fill Form", description="Complete academic details, Institute AISHE code, and select Post-Matric Scholarship Scheme."),
            ApplicationStep(step_number=3, title="Upload Documents", description="Upload Income Certificate, Caste Certificate, Fee Receipt, and Marksheet."),
            ApplicationStep(step_number=4, title="Institute Verification", description="College Nodal Officer verifies your enrollment and academic status on NSP portal."),
            ApplicationStep(step_number=5, title="District Officer Sanction", description="District Social Welfare officer sanctions scholarship after Aadhaar DBT validation.")
        ],
        start_date="01-07-2026",
        end_date="30-11-2026",
        official_url="https://scholarships.gov.in",
        source_document="Post-Matric Scholarship Scheme Guidelines - Ministry of Social Justice & Empowerment",
        last_updated="2026-07-15",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="pm-awas-yojana",
        name="Pradhan Mantri Awas Yojana — Urban & Gramin (PMAY)",
        department="Ministry of Housing and Urban Affairs & Ministry of Rural Development",
        level="Central",
        state="All India",
        category="Housing",
        description="Flagship housing mission ensuring a pucca house with basic amenities (water, sanitation, electricity) to all eligible urban and rural homeless and kuccha house dwellers.",
        simple_summary="Get direct financial assistance of up to ₹2.67 Lakh subsidy or ₹1.20 Lakh grant to construct or purchase your own permanent pucca house.",
        one_line_summary="Financial subsidy up to ₹2.67 Lakh for building or buying a permanent home.",
        benefits="Interest subsidy up to ₹2.67 Lakh on home loans for EWS/LIG families or direct construction grant of ₹1.20 Lakh to ₹1.30 Lakh for rural houseless families.",
        benefit_amount="Up to ₹2,67,000 subsidy / grant",
        eligibility_criteria=EligibilityCriteria(
            age_min=21,
            age_max=70,
            income_max=300000.0,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Applicant family must not own a pucca house anywhere in India",
                "EWS annual family income up to ₹3 Lakh (or LIG up to ₹6 Lakh)"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Housing Status", requirement="No existing pucca house", explanation="Family should not own a permanent pucca house in their name anywhere in India."),
            SchemeCondition(criterion="Income Limit (EWS)", requirement="Up to ₹3,00,000 / year", explanation="Economically Weaker Section households with annual income below ₹3 Lakh."),
            SchemeCondition(criterion="Female Ownership", requirement="Preferred / Co-ownership", explanation="Female head of household preferred as primary or co-owner of the property.")
        ],
        who_can_apply=[
            "Houseless families living in kutcha or dilapidated homes",
            "Economically Weaker Section (EWS) families earning under ₹3 Lakh per annum",
            "Low Income Group (LIG) families earning between ₹3 Lakh to ₹6 Lakh per annum"
        ],
        who_cannot_apply=[
            "Families already owning a pucca house in any part of India",
            "Families who have previously availed central assistance under any housing scheme",
            "Households earning above ₹6 Lakh without eligibility under specific MIG slabs"
        ],
        required_documents=[
            "Aadhaar Card of all family members",
            "Income Certificate / Salary Certificate / BPL Card",
            "Proof of Land / House site or Kutcha house photo",
            "Bank Account Details (Aadhaar linked)",
            "Affidavit stating no pucca house ownership in India"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Portal Registration", description="Visit pmaymis.gov.in or apply at local Municipal / Gram Panchayat office."),
            ApplicationStep(step_number=2, title="Select Benefit Component", description="Choose 'Beneficiary Led Construction (BLC)' or 'Credit Linked Subsidy (CLSS)'."),
            ApplicationStep(step_number=3, title="Aadhaar Verification", description="Enter Aadhaar number and verify name exactly as printed on Aadhaar."),
            ApplicationStep(step_number=4, title="Geo-tagging & Survey", description="Municipal engineer or Gram Sevak conducts geo-tagged inspection of existing kutcha site."),
            ApplicationStep(step_number=5, title="Funds Disbursal", description="Subsidy or construction assistance released in installments based on construction stage.")
        ],
        start_date="25-06-2015",
        end_date="31-12-2028",
        official_url="https://pmaymis.gov.in",
        source_document="PMAY Urban & Gramin Revised Framework - MoHUA & MoRD, Government of India",
        last_updated="2026-06-10",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="atal-pension-yojana",
        name="Atal Pension Yojana (APY)",
        department="Pension Fund Regulatory and Development Authority (PFRDA)",
        level="Central",
        state="All India",
        category="Social Welfare",
        description="Government-backed pension scheme aimed at creating a universal social security system for all citizens, especially the unorganized sector workers.",
        simple_summary="Save a small amount every month now to get a guaranteed monthly pension of ₹1,000 to ₹5,000 for life once you turn 60.",
        one_line_summary="Guaranteed lifetime monthly pension of ₹1,000 to ₹5,000 from age 60.",
        benefits="Guaranteed minimum monthly pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000 or ₹5,000 per month after reaching 60 years of age, with spouse continuation and return of corpus to nominee.",
        benefit_amount="₹1,000 to ₹5,000 monthly pension for life",
        eligibility_criteria=EligibilityCriteria(
            age_min=18,
            age_max=40,
            income_max=None,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Applicant must be between 18 and 40 years of age at the time of joining",
                "Must hold a savings bank account",
                "Non-income tax payer (w.e.f. October 2022 rules)"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Age Entry Window", requirement="18 to 40 years", explanation="Subscriber must join before turning 40 to ensure minimum 20 years contribution period."),
            SchemeCondition(criterion="Bank Account", requirement="Savings Bank / Post Office Account", explanation="Required for auto-debit of small monthly/quarterly contributions."),
            SchemeCondition(criterion="Tax Status", requirement="Non-Tax Payer", explanation="Citizen must not be an income taxpayer.")
        ],
        who_can_apply=[
            "All Indian citizens between 18 and 40 years of age",
            "Workers in unorganized sectors (daily wagers, drivers, domestic workers, shop helpers)",
            "Self-employed individuals and small artisans"
        ],
        who_cannot_apply=[
            "Citizens aged above 40 years or below 18 years",
            "Citizens who are or have been income tax payers as of current rules",
            "Persons covered under statutory social security schemes (EPF/EPS) where exempt"
        ],
        required_documents=[
            "Aadhaar Card",
            "Bank Account Passbook (with Auto-Debit facility)",
            "Mobile Number linked to Bank",
            "Nominee Details (Aadhaar & relationship)"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Visit Bank Branch or NetBanking", description="Visit your savings bank branch or log in to your mobile/internet banking portal."),
            ApplicationStep(step_number=2, title="Select Pension Slab", description="Choose desired pension amount (₹1,000 to ₹5,000/month) based on monthly contribution."),
            ApplicationStep(step_number=3, title="Fill APY Form", description="Provide Aadhaar, nominee information, and authorization for monthly auto-debit."),
            ApplicationStep(step_number=4, title="PRAN Generation", description="Receive Permanent Retirement Account Number (PRAN) acknowledgment on SMS."),
            ApplicationStep(step_number=5, title="Pension Starts at 60", description="Monthly pension credited directly to your bank account every month after age 60.")
        ],
        start_date="09-05-2015",
        end_date="Ongoing",
        official_url="https://www.npscra.nsdl.co.in",
        source_document="PFRDA Atal Pension Yojana Operational Guidelines",
        last_updated="2026-05-18",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="divyangjan-swavalamban",
        name="Divyangjan Swavalamban Yojana (Concessional Loan & Assistive Devices)",
        department="Department of Empowerment of Persons with Disabilities, MoSJE",
        level="Central",
        state="All India",
        category="Disability Support",
        description="Comprehensive national initiative providing concessional loans, assistive devices, and vocational assistance for persons with disabilities for economic empowerment.",
        simple_summary="Concessional low-interest loans up to ₹5,00,000 and free assistive devices for citizens with 40%+ benchmark disability to start self-employment or pursue higher education.",
        one_line_summary="Low-interest business loans up to ₹5 Lakh + free assistive equipment for Divyangjan.",
        benefits="Concessional loans up to ₹5 Lakh at subsidized interest rates (5-7% p.a.) with rebate, plus 100% grant for modern assistive devices (wheelchairs, hearing aids, braille kits).",
        benefit_amount="Up to ₹5,00,000 loan + free assistive aids",
        eligibility_criteria=EligibilityCriteria(
            age_min=18,
            age_max=65,
            income_max=350000.0,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=True,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Minimum 40% benchmark disability certified by Competent Medical Authority / UDID Card",
                "Indian citizen of age 18 years and above"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Disability Benchmark", requirement="40% or above", explanation="Possessing valid Disability Certificate / Unique Disability ID (UDID)."),
            SchemeCondition(criterion="Age Range", requirement="18 to 65 years", explanation="Working age citizens seeking self-reliance or skill training."),
            SchemeCondition(criterion="Income Ceiling", requirement="Below ₹3,50,000 / year", explanation="Priority given to low-income families and rural applicants.")
        ],
        who_can_apply=[
            "Persons with 40% or higher benchmark disability (locomotor, visual, hearing, intellectual, etc.)",
            "Divyang citizens seeking self-employment, micro-enterprise, or equipment support",
            "Parents / legal guardians applying on behalf of severe intellectual disability beneficiaries"
        ],
        who_cannot_apply=[
            "Persons with disability percentage below 40% without medical board certification",
            "Defaulters of any public financial institution or bank"
        ],
        required_documents=[
            "Aadhaar Card",
            "Unique Disability ID (UDID) Card / Medical Disability Certificate",
            "Income Certificate",
            "Age Proof / School Certificate",
            "Bank Account Passbook",
            "Project Proposal / Activity Plan (for loan applicants)"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Portal Application", description="Apply via State Channelizing Agency (SCA) or online on nhfdc.nic.in portal."),
            ApplicationStep(step_number=2, title="Document Verification", description="Upload UDID card, Aadhaar, and income credentials."),
            ApplicationStep(step_number=3, title="Medical & Project Vetting", description="Committee evaluates equipment need or self-employment activity feasibility."),
            ApplicationStep(step_number=4, title="Disbursement", description="Loan disbursed at concessional 5% interest with a 6-month moratorium period.")
        ],
        start_date="01-01-2016",
        end_date="Ongoing",
        official_url="http://www.nhfdc.nic.in",
        source_document="National Handicapped Finance and Development Corporation (NHFDC) Guidelines",
        last_updated="2026-06-25",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="ignoa-pension",
        name="Indira Gandhi National Old Age Pension Scheme (IGNOAPS)",
        department="Ministry of Rural Development / State Social Welfare",
        level="Central",
        state="All India",
        category="Senior Citizens",
        description="National social assistance programme providing monthly non-contributory pensions to destitute elderly citizens living below the poverty line.",
        simple_summary="Monthly direct cash pension of ₹1,000 to ₹2,500 (combined central + state share) deposited into the bank account of elderly citizens aged 60+ from BPL families.",
        one_line_summary="Monthly cash pension for elderly citizens aged 60 and above living below poverty line.",
        benefits="Monthly cash assistance deposited directly into bank or post office accounts for life. (Basic central amount supplemented by state government contribution).",
        benefit_amount="₹1,000 to ₹2,500 / month for life",
        eligibility_criteria=EligibilityCriteria(
            age_min=60,
            age_max=120,
            income_max=150000.0,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=True,
            other_conditions=[
                "Applicant must belong to a household living Below Poverty Line (BPL)",
                "Age 60 years or above (higher rate for 80+ years)"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="Age Criterion", requirement="60 years and above", explanation="Must have attained age 60; higher pension bracket triggers at age 80."),
            SchemeCondition(criterion="Economic Criterion", requirement="BPL Status", explanation="Must belong to Below Poverty Line (BPL) listed household.")
        ],
        who_can_apply=[
            "Senior citizens aged 60 years and above",
            "Citizens belonging to BPL families or holding white / Antyodaya ration cards",
            "Elderly destitute individuals without family support"
        ],
        who_cannot_apply=[
            "Senior citizens with family members employed in regular government service",
            "Households holding more than standard dry land limits",
            "Persons already receiving government retirement pensions"
        ],
        required_documents=[
            "Aadhaar Card",
            "Age Proof Certificate / Voter ID / Birth Record",
            "BPL Ration Card / Food Security Card",
            "Bank Account Passbook (Single Account)",
            "Passport Size Photograph"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Submit Form", description="Apply online via NSAP portal (nsap.nic.in) or submit form at local Mandal / Tahsildar / Municipal office."),
            ApplicationStep(step_number=2, title="Field Verification", description="Village Revenue Officer (VRO) or Municipal Inspector verifies age and economic condition."),
            ApplicationStep(step_number=3, title="Sanction Order", description="District Collector / Sanctioning Authority issues pension sanction letter."),
            ApplicationStep(step_number=4, title="Monthly DBT", description="Pension credited by 1st week of every month directly to Aadhaar-seeded bank account.")
        ],
        start_date="15-08-1995",
        end_date="Ongoing",
        official_url="https://nsap.nic.in",
        source_document="National Social Assistance Programme (NSAP) Guidelines - MoRD, GoI",
        last_updated="2026-07-10",
        status="Active",
        review_status="Approved"
    ),
    GovernmentScheme(
        id="telangana-rythu-bharosa",
        name="Telangana Rythu Bharosa / Investment Support Scheme",
        department="Department of Agriculture, Government of Telangana",
        level="State",
        state="Telangana",
        category="Agriculture",
        description="State government investment support initiative providing financial assistance to farmers and tenant agricultural labourers at the start of each cropping season.",
        simple_summary="Telangana state farmers receive ₹15,000 per acre every year (₹7,500 per crop season for Kharif and Rabi) directly to buy seeds, fertilizers, and farm inputs.",
        one_line_summary="₹15,000 per acre per year agricultural investment support for Telangana farmers.",
        benefits="Direct financial grant of ₹15,000 per acre per year (₹7,500 in Kharif + ₹7,500 in Rabi) deposited directly into bank accounts to eliminate farm debt and purchase inputs.",
        benefit_amount="₹15,000 / acre / year (in 2 crop seasons)",
        eligibility_criteria=EligibilityCriteria(
            age_min=18,
            age_max=85,
            income_max=400000.0,
            allowed_states=["Telangana"],
            allowed_area_types=["Rural"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=True,
            student_required=False,
            senior_required=False,
            other_conditions=[
                "Must be a resident farmer in the State of Telangana",
                "Must possess land recorded in Dharani / CCLA revenue land records portal"
            ]
        ),
        structured_conditions=[
            SchemeCondition(criterion="State Domicile", requirement="Telangana State", explanation="Applicant must reside and hold agricultural land within Telangana."),
            SchemeCondition(criterion="Land Record Record", requirement="Dharani Pattadar Passbook", explanation="Land title must be digitally updated in Telangana Dharani portal."),
            SchemeCondition(criterion="Agricultural Occupation", requirement="Active Cultivator", explanation="Engaged in cultivation during Kharif or Rabi seasons.")
        ],
        who_can_apply=[
            "All Telangana resident landholding farmers with digital Pattadar passbooks",
            "Small and marginal farmers holding cultivable agricultural plots",
            "Registered tenant farmers under verified cultivation guidelines"
        ],
        who_cannot_apply=[
            "Non-agricultural commercial real-estate plot owners",
            "Lands converted for non-agricultural layout or industrial purposes",
            "Farmers residing permanently outside Telangana without state land title"
        ],
        required_documents=[
            "Aadhaar Card",
            "Telangana Pattadar Passbook (Dharani Portal copy)",
            "Bank Account Passbook (Aadhaar linked)",
            "Active Mobile Number registered in Dharani"
        ],
        application_steps=[
            ApplicationStep(step_number=1, title="Land Digital Check", description="Verify your land survey number on Dharani Portal (dharani.telangana.gov.in)."),
            ApplicationStep(step_number=2, title="AEO Submission", description="Meet your local Agriculture Extension Officer (AEO) or Rythu Vedika representative."),
            ApplicationStep(step_number=3, title="Bank Seeding", description="Ensure your Pattadar bank account is active and linked with NPCI Aadhaar bridge."),
            ApplicationStep(step_number=4, title="Season Release", description="Funds deposited automatically before onset of monsoon and winter cropping seasons.")
        ],
        start_date="10-05-2018",
        end_date="Ongoing",
        official_url="https://rythubharosa.telangana.gov.in",
        source_document="Government of Telangana Agriculture & Cooperation Department G.O. Ms. No. 43",
        last_updated="2026-08-10",
        status="Active",
        review_status="Approved"
    )
]

INITIAL_APPLICATIONS: List[ApplicationItem] = [
    ApplicationItem(
        id="app-1001",
        scheme_id="pm-kisan",
        scheme_name="PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        department="Ministry of Agriculture and Farmers Welfare",
        application_number="PMK-2026-TS-88421",
        applied_date="2026-08-05",
        status="Under Review",
        current_step_index=2,  # 0: Submitted, 1: Docs Verified, 2: Under Review, 3: Decision, 4: Benefit Released
        last_update="2026-08-28",
        missing_documents=[],
        official_portal_url="https://pmkisan.gov.in",
        remarks="Aadhaar authenticated. Land records verification in progress at Mandal Revenue Office.",
        user_id="farmer_ramesh",
        applicant_name="Ramesh Kumar",
        submission_type="Prototype Submission",
        status_history=[
            ApplicationStatusLog(status="Submitted", timestamp="2026-08-05 10:20", remarks="Online prototype application registered successfully."),
            ApplicationStatusLog(status="Documents Verified", timestamp="2026-08-12 14:15", remarks="Aadhaar and Bank details authenticated via e-KYC."),
            ApplicationStatusLog(status="Under Review", timestamp="2026-08-28 16:40", remarks="Land record verification pending at Mandal level.")
        ]
    ),
    ApplicationItem(
        id="app-1002",
        scheme_id="pm-jay",
        scheme_name="Ayushman Bharat — PM-JAY",
        department="National Health Authority (NHA)",
        application_number="AB-PMJAY-901452-TS",
        applied_date="2026-07-12",
        status="Approved",
        current_step_index=3,
        last_update="2026-08-01",
        missing_documents=[],
        official_portal_url="https://beneficiary.nha.gov.in",
        remarks="Golden Card generated. Active healthcare cover of ₹5 Lakh enabled for family.",
        user_id="farmer_ramesh",
        applicant_name="Ramesh Kumar",
        submission_type="Prototype Submission",
        status_history=[
            ApplicationStatusLog(status="Submitted", timestamp="2026-07-12 09:10", remarks="Application submitted via e-KYC."),
            ApplicationStatusLog(status="Documents Verified", timestamp="2026-07-18 11:30", remarks="Ration card & Aadhaar cross-matched."),
            ApplicationStatusLog(status="Under Review", timestamp="2026-07-25 15:00", remarks="State Health Authority eligibility audit cleared."),
            ApplicationStatusLog(status="Approved", timestamp="2026-08-01 10:00", remarks="Ayushman Bharat PM-JAY Card issued.")
        ]
    ),
    ApplicationItem(
        id="app-1003",
        scheme_id="telangana-rythu-bharosa",
        scheme_name="Telangana Rythu Bharosa",
        department="Department of Agriculture, Telangana",
        application_number="TRB-2026-WRG-33109",
        applied_date="2026-08-20",
        status="Documents Required",
        current_step_index=1,
        last_update="2026-09-02",
        missing_documents=["Land Pattadar Passbook (Updated Dharani Copy)"],
        official_portal_url="https://rythubharosa.telangana.gov.in",
        remarks="Please upload updated Dharani passbook copy to confirm Survey Number 142/B.",
        user_id="farmer_ramesh",
        applicant_name="Ramesh Kumar",
        submission_type="Prototype Submission",
        status_history=[
            ApplicationStatusLog(status="Submitted", timestamp="2026-08-20 12:45", remarks="Form submitted online."),
            ApplicationStatusLog(status="Documents Required", timestamp="2026-09-02 09:30", remarks="Discrepancy in survey number. Updated Dharani copy requested.")
        ]
    )
]

INITIAL_NOTIFICATIONS: List[NotificationItem] = [
    NotificationItem(
        id="notif-1",
        title="New Scheme Match: PM-KISAN",
        message="Based on your updated farmer status and landholding in Warangal, you have a 92% match for PM-KISAN annual assistance of ₹6,000.",
        type="scheme_match",
        date="2026-09-10",
        is_read=False,
        action_url="/simplify?scheme=pm-kisan"
    ),
    NotificationItem(
        id="notif-2",
        title="Document Required for Rythu Bharosa",
        message="Your application TRB-2026-WRG-33109 requires an updated Dharani Passbook upload before 25th September.",
        type="document_missing",
        date="2026-09-08",
        is_read=False,
        action_url="/applications"
    ),
    NotificationItem(
        id="notif-3",
        title="Scholarship Deadline Approaching",
        message="National Post-Matric Scholarship portal closes applications on 30th November 2026. Review requirements today.",
        type="deadline",
        date="2026-09-05",
        is_read=True,
        action_url="/schemes"
    ),
    NotificationItem(
        id="notif-4",
        title="Ayushman Bharat Golden Card Approved",
        message="Your e-KYC was approved. Download your cashless ₹5 Lakh health card directly from the portal.",
        type="status_change",
        date="2026-08-02",
        is_read=True,
        action_url="/applications"
    )
]

INITIAL_ADMIN_REVIEWS: List[AdminRuleReviewItem] = [
    AdminRuleReviewItem(
        id="review-201",
        document_name="Gazette_Circular_PM_Suraksha_Bima_2026.pdf",
        uploaded_at="2026-09-09 14:30",
        scheme_name="Pradhan Mantri Suraksha Bima Yojana (PMSBY 2.0)",
        department="Department of Financial Services, Ministry of Finance",
        category="Social Welfare",
        raw_extracted_text_preview="GOVERNMENT OF INDIA - MINISTRY OF FINANCE. Notification No. 14/2026. The Pradhan Mantri Suraksha Bima Yojana is open to individuals aged 18 to 70 years holding a bank account. Annual premium of ₹20 auto-debited. Risk coverage of ₹2 Lakh for accidental death and permanent total disability, and ₹1 Lakh for permanent partial disability. Income cap is not applicable. Aadhaar is primary KYC document.",
        extracted_criteria=EligibilityCriteria(
            age_min=18,
            age_max=70,
            income_max=None,
            allowed_states=["All"],
            allowed_area_types=["All"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=["Must have active savings bank account with auto-debit consent"]
        ),
        extracted_benefits="Accidental death and total disability cover of ₹2,00,000 and partial disability cover of ₹1,00,000 for ₹20/year premium.",
        extracted_documents=["Aadhaar Card", "Bank Account Passbook", "Auto-Debit Consent Mandate"],
        confidence_score=0.96,
        status="Pending Review",
        reviewer_notes="Extracted successfully from official gazette. Review age bracket (18-70) and annual premium before publishing."
    ),
    AdminRuleReviewItem(
        id="review-202",
        document_name="TS_Aasara_Pension_Amendment_Rules_2026.pdf",
        uploaded_at="2026-09-08 11:15",
        scheme_name="Telangana Aasara Social Security Pension",
        department="Society for Elimination of Rural Poverty (SERP), Telangana",
        category="Social Welfare",
        raw_extracted_text_preview="TELANGANA STATE GAZETTE EXTRAORDINARY. SERP Amendment G.O. Ms 29. Revision of Aasara Pension disbursement. Eligible age for Old Age Pension fixed at 57 years. Monthly pension amount ₹2,016 for elderly, widows, weavers, and toddy tappers; ₹3,016 for persons with disability (40%+). Annual family income ceiling ₹1.5 Lakh in rural areas, ₹2.0 Lakh in urban areas. Domicile in Telangana mandatory.",
        extracted_criteria=EligibilityCriteria(
            age_min=57,
            age_max=110,
            income_max=150000.0,
            allowed_states=["Telangana"],
            allowed_area_types=["Rural", "Urban"],
            allowed_occupations=["All"],
            allowed_categories=["All"],
            gender_requirement="Any",
            disability_required=False,
            farmer_required=False,
            student_required=False,
            senior_required=False,
            other_conditions=["Resident of Telangana", "BPL / Food Security card holder"]
        ),
        extracted_benefits="Monthly direct pension of ₹2,016 (or ₹3,016 for Divyangjan with 40%+ disability).",
        extracted_documents=["Aadhaar Card", "Telangana Food Security Ration Card", "Age Proof Certificate", "Bank Account Passbook"],
        confidence_score=0.94,
        status="Pending Review",
        reviewer_notes="Age threshold confirmed at 57 years as per state policy amendment."
    )
]

# Sample Government Scheme Documents (raw text used for PDF generation and 1-click test)
SAMPLE_DOCUMENT_CORPUS = {
    "pm-kisan": """
    GOVERNMENT OF INDIA
    MINISTRY OF AGRICULTURE & FARMERS WELFARE
    DEPARTMENT OF AGRICULTURE, COOPERATION & FARMERS WELFARE
    OPERATIONAL GUIDELINES FOR PRADHAN MANTRI KISAN SAMMAN NIDHI (PM-KISAN)
    
    1. INTRODUCTION AND OBJECTIVES:
    The PM-KISAN scheme is a Central Sector Scheme with 100% funding from Government of India.
    It has become operational from 1st December, 2018.
    The primary aim of the Scheme is to provide income support to all landholding eligible farmer families 
    to supplement their financial needs for procuring various inputs related to agriculture and allied activities as well as domestic needs.

    2. DEFINITION OF BENEFICIARY:
    A landholder farmer family is defined as "a family comprising of husband, wife and minor children who own cultivable land as per the land records of the concerned State/UT".

    3. BENEFIT CONFERRED:
    Under the Scheme, financial benefit of Rs. 6000/- per annum is provided to eligible beneficiary farmer families.
    The amount is credited directly to the Aadhaar-seeded bank accounts of beneficiaries in three four-monthly installments of Rs. 2000/- each.

    4. ELIGIBILITY CRITERIA & EXCLUSION CATEGORIES:
    All landholding farmer families who have cultivable landholding in their names are eligible.
    The following categories of beneficiaries of higher economic status shall NOT be eligible for benefit under the scheme:
    (a) All Institutional Landholders.
    (b) Former and present holders of constitutional posts.
    (c) Former and present Ministers/ State Ministers and former/present Members of Lok Sabha/ Rajya Sabha/ State Legislative Assemblies/ State Legislative Councils, former and present Mayors of Municipal Corporations, former and present Chairpersons of District Panchayats.
    (d) All serving or retired officers and employees of Central/ State Government Ministries /Offices/Departments and its field units.
    (e) All Persons who paid Income Tax in last assessment year.
    (f) Professionals like Doctors, Engineers, Lawyers, Chartered Accountants, and Architects registered with Professional bodies and carrying out practice.

    5. DOCUMENTATION MANDATE:
    1. Aadhaar Card (mandatory for identity authentication via UIDAI).
    2. Land Record Passbook / RoR / Record of Rights proving valid title.
    3. Bank Account details linked to Aadhaar (NPCI mapped).
    4. Active Mobile number for Aadhaar OTP verification.

    6. APPLICATION AND VERIFICATION MECHANISM:
    Farmers can register through the online portal pmkisan.gov.in under 'Farmers Corner' or through local Common Service Centres (CSCs).
    State and District nodal officers shall verify land title documents against land records (e.g. Dharani, Bhulekh).
    Payment shall be processed via Aadhaar Payment Bridge (APB).
    """,

    "pm-jay": """
    NATIONAL HEALTH AUTHORITY
    MINISTRY OF HEALTH AND FAMILY WELFARE, GOVERNMENT OF INDIA
    AYUSHMAN BHARAT — PRADHAN MANTRI JAN AROGYA YOJANA (AB PM-JAY)
    
    1. SCHEME OVERVIEW:
    Ayushman Bharat PM-JAY is the flagship public health assurance scheme of the Government of India.
    It provides health cover of Rs. 5,00,000 (Rupees Five Lakh only) per family per year for secondary and tertiary care hospitalization.
    It covers over 12 crore poor and vulnerable families (approximately 55 crore beneficiaries) that form the bottom 40% of the Indian population.

    2. KEY BENEFITS & SCOPE OF COVERAGE:
    - Cashless and paperless access to healthcare services at the point of care in empanelled public and private hospitals across the country.
    - Up to Rs. 5 Lakh coverage per family per year on a family floater basis.
    - No restriction on family size, age, or gender.
    - All pre-existing medical conditions are covered from Day 1 of enrollment.
    - Covers 3 days of pre-hospitalization (diagnostics) and 15 days of post-hospitalization expenses including medicines.

    3. TARGET BENEFICIARY IDENTIFICATION:
    Households identified based on deprivation and occupational criteria of Socio-Economic Caste Census 2011 (SECC 2011) for rural and urban areas respectively.
    State-specific Antyodaya Anna Yojana (AAY) and Priority Household (PHH) ration cardholders as notified by State Governments.
    All senior citizens aged 70 years and above (Ayushman Bharat Vay Vandana expansion).

    4. EXCLUSION CRITERIA:
    - Households owning motorized 2/3/4 wheelers or fishing boats.
    - Households having mechanized 3-4 room pucca houses with landholdings above designated ceiling.
    - Any member in the household serving as regular government employee or paying income tax.

    5. REQUIRED DOCUMENTS:
    - Aadhaar Card / UIDAI confirmation.
    - Ration Card / Food Security Card / SECC Household Letter.
    - Active Mobile Number for OTP authentication.

    6. HOW TO ACCESS CARE:
    Citizens can verify eligibility on beneficiary.nha.gov.in.
    Beneficiaries receive an Ayushman Card (Golden Card).
    Treatment is cashless across more than 27,000 empanelled hospitals nationwide.
    """,

    "post-matric": """
    MINISTRY OF SOCIAL JUSTICE AND EMPOWERMENT
    GOVERNMENT OF INDIA
    SCHEME GUIDELINES: CENTRALLY SPONSORED POST-MATRIC SCHOLARSHIP SCHEME
    
    1. OBJECTIVE:
    The objective of the Scheme is to provide financial assistance to students belonging to underprivileged communities (SC, ST, OBC, EWS)
    studying at post-matriculation or post-secondary stage to enable them to complete their higher education.

    2. CONDITIONS OF ELIGIBILITY:
    (i) The scholarships are open to nationals of India belonging to Scheduled Castes, Scheduled Tribes, Other Backward Classes, or Economically Weaker Sections.
    (ii) These scholarships are given for study of all recognized post-matriculation or post-secondary courses pursued in recognized institutions.
    (iii) Candidates who have passed the Matriculation or Higher Secondary or any higher examination of a recognized University or Board of Secondary Education.
    (iv) Annual family income ceiling: Total family income from all sources should not exceed Rs. 2,50,000/- (Rupees Two Lakh Fifty Thousand only) per annum.
    (v) All children of the same parents/guardian are eligible.

    3. VALUE OF SCHOLARSHIP:
    The scholarship includes:
    (a) Full non-refundable compulsory tuition and registration fees payable to the institution.
    (b) Annual maintenance allowance ranging from Rs. 4,000/- to Rs. 13,500/- depending upon the course grouping and hostel status (Day Scholar vs Hosteller).
    (c) Additional allowance for students with disabilities (reader allowance, escort allowance, etc.).

    4. SELECTION AND DISBURSEMENT:
    Applications must be submitted online on the National Scholarship Portal (scholarships.gov.in).
    Institute Nodal Officer (INO) and District Nodal Officer (DNO) conduct digital verification of student enrollment.
    Scholarship amount is directly credited to the student's Aadhaar-seeded bank account through Public Financial Management System (PFMS).

    5. MANDATORY DOCUMENTS:
    - Aadhaar Card.
    - Previous year qualifying marksheet / certificate.
    - Current Income Certificate issued by competent revenue authority (Tahsildar / MRO).
    - Community / Caste Certificate.
    - College Bonafide Certificate & Fee Receipt.
    - Active Bank Account Passbook seeded with Aadhaar.
    """
}

INITIAL_LOCKER_DOCUMENTS: List[LockerDocument] = [
    LockerDocument(
        id="doc-101",
        name="Aadhaar Card",
        category="Identity Proof",
        document_number="XXXX-XXXX-8921",
        file_name="uidai_aadhaar_ramesh_kumar.pdf",
        file_size="840 KB",
        uploaded_at="2026-07-15",
        source="DigiLocker Verified",
        verification_status="Verified",
        matched_schemes=["PM-KISAN", "Ayushman Bharat PM-JAY", "Atal Pension Yojana", "Telangana Rythu Bharosa"]
    ),
    LockerDocument(
        id="doc-102",
        name="Bank Account Passbook",
        category="Income & Finance",
        document_number="SB-09412048912",
        file_name="sbi_bank_passbook_seeded.pdf",
        file_size="1.4 MB",
        uploaded_at="2026-07-18",
        source="DigiLocker Verified",
        verification_status="Verified",
        matched_schemes=["PM-KISAN", "Telangana Rythu Bharosa", "Atal Pension Yojana"]
    ),
    LockerDocument(
        id="doc-103",
        name="Ration Card / Food Security Card",
        category="Income & Finance",
        document_number="WAP-2601928410",
        file_name="food_security_ration_card.pdf",
        file_size="1.1 MB",
        uploaded_at="2026-07-22",
        source="Department Issued",
        verification_status="Verified",
        matched_schemes=["Ayushman Bharat PM-JAY", "PM Awas Yojana"]
    ),
    LockerDocument(
        id="doc-104",
        name="Land Pattadar Passbook",
        category="Land & Agriculture",
        document_number="TS-DHARANI-49210",
        file_name="dharani_pattadar_land_passbook.pdf",
        file_size="2.6 MB",
        uploaded_at="2026-08-01",
        source="DigiLocker Verified",
        verification_status="Verified",
        matched_schemes=["PM-KISAN", "Telangana Rythu Bharosa"]
    ),
    LockerDocument(
        id="doc-105",
        name="Income Certificate",
        category="Income & Finance",
        document_number="IC-2026-WARANGAL-781",
        file_name="meeseva_income_cert_2026.pdf",
        file_size="720 KB",
        uploaded_at="2026-08-20",
        source="Citizen Upload",
        verification_status="Pending Verification",
        matched_schemes=["Post-Matric Scholarship", "PM Awas Yojana"]
    )
]

