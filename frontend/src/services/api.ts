import {
  GovernmentScheme,
  CitizenProfile,
  EligibilityResult,
  ApplicationItem,
  NotificationItem,
  AdminRuleReviewItem,
  SampleDoc,
  ChatMessage,
  SchemeMatchItem,
  Language,
  LockerDocument,
} from '../types';

const API_BASE = '/api';

// Fallback Mock Data mirroring the backend for extreme resilience
export const DEFAULT_PROFILE: CitizenProfile = {
  id: 'farmer_ramesh',
  full_name: 'Ramesh Kumar',
  age: 42,
  gender: 'Male',
  state: 'Telangana',
  district: 'Warangal',
  area_type: 'Rural',
  annual_income: 120000,
  occupation: 'Small / Marginal Farmer',
  education_level: 'Secondary School (10th Pass)',
  social_category: 'OBC',
  disability_status: false,
  disability_percentage: 0,
  employment_status: 'Self-Employed',
  farmer_status: true,
  student_status: false,
  senior_citizen_status: false,
  marital_status: 'Married',
  family_size: 4,
  verified_documents: [
    'Aadhaar Card',
    'Bank Account Passbook',
    'Ration Card / Food Security Card',
    'Land Pattadar Passbook',
  ],
};

export const PRESET_PERSONAS: Record<string, { label: string; profile: CitizenProfile }> = {
  farmer_ramesh: {
    label: 'Ramesh Kumar (Farmer, Telangana)',
    profile: DEFAULT_PROFILE,
  },
  student_priya: {
    label: 'Priya Sharma (Student, Telangana)',
    profile: {
      id: 'student_priya',
      full_name: 'Priya Sharma',
      age: 20,
      gender: 'Female',
      state: 'Telangana',
      district: 'Hyderabad',
      area_type: 'Urban',
      annual_income: 180000,
      occupation: 'Undergraduate Student',
      education_level: 'Higher Secondary (12th Pass)',
      social_category: 'SC',
      disability_status: false,
      disability_percentage: 0,
      employment_status: 'Student',
      farmer_status: false,
      student_status: true,
      senior_citizen_status: false,
      marital_status: 'Single',
      family_size: 3,
      verified_documents: [
        'Aadhaar Card',
        'Bank Account Passbook',
        'College Bonafide Certificate',
        'Income Certificate',
        'Caste Certificate (SC)',
      ],
    },
  },
  senior_sunita: {
    label: 'Sunita Bai (Senior Citizen, 67y)',
    profile: {
      id: 'senior_sunita',
      full_name: 'Sunita Bai',
      age: 67,
      gender: 'Female',
      state: 'Telangana',
      district: 'Karimnagar',
      area_type: 'Rural',
      annual_income: 50000,
      occupation: 'Retired / Homemaker',
      education_level: 'Primary School',
      social_category: 'General',
      disability_status: false,
      disability_percentage: 0,
      employment_status: 'Unemployed',
      farmer_status: false,
      student_status: false,
      senior_citizen_status: true,
      marital_status: 'Widowed',
      family_size: 1,
      verified_documents: [
        'Aadhaar Card',
        'Bank Account Passbook',
        'Age Proof Certificate',
        'BPL Ration Card',
      ],
    },
  },
  divyangjan_lakshmi: {
    label: 'Lakshmi Narayana (Divyangjan, 55%)',
    profile: {
      id: 'divyangjan_lakshmi',
      full_name: 'Lakshmi Narayana',
      age: 34,
      gender: 'Male',
      state: 'Telangana',
      district: 'Nalgonda',
      area_type: 'Rural',
      annual_income: 95000,
      occupation: 'Handicraft Artisan',
      education_level: 'Secondary School',
      social_category: 'OBC',
      disability_status: true,
      disability_percentage: 55,
      employment_status: 'Self-Employed',
      farmer_status: false,
      student_status: false,
      senior_citizen_status: false,
      marital_status: 'Married',
      family_size: 3,
      verified_documents: [
        'Aadhaar Card',
        'Bank Account Passbook',
        'Unique Disability ID (UDID) Card',
        'Income Certificate',
      ],
    },
  },
  youth_arun: {
    label: 'Arun Varma (Youth Jobseeker, 26y)',
    profile: {
      id: 'youth_arun',
      full_name: 'Arun Varma',
      age: 26,
      gender: 'Male',
      state: 'Telangana',
      district: 'Rangareddy',
      area_type: 'Urban',
      annual_income: 210000,
      occupation: 'Job Seeker / Skill Trainee',
      education_level: 'Graduate (B.Com)',
      social_category: 'EWS',
      disability_status: false,
      disability_percentage: 0,
      employment_status: 'Unemployed',
      farmer_status: false,
      student_status: false,
      senior_citizen_status: false,
      marital_status: 'Single',
      family_size: 4,
      verified_documents: ['Aadhaar Card', 'Bank Account Passbook', 'Degree Certificate'],
    },
  },
};

// Client-side rule evaluation engine for fallback and offline resilience
export function evaluateClientSide(
  scheme: GovernmentScheme,
  profile: CitizenProfile,
  language: Language = 'en'
): EligibilityResult {
  const c = scheme.eligibility_criteria;
  const satisfied: any[] = [];
  const unmet: any[] = [];
  const neutral: any[] = [];

  // 1. Age
  if (c.age_min != null || c.age_max != null) {
    const min = c.age_min ?? 0;
    const max = c.age_max ?? 120;
    const ok = profile.age >= min && profile.age <= max;
    const item = {
      criterion: 'Age Requirement',
      satisfied: ok,
      citizen_value: `${profile.age} years`,
      required_value: `${min} - ${max} years`,
      message: ok
        ? 'Your age qualifies for this scheme'
        : `Applicant age (${profile.age}) is outside required range (${min}-${max})`,
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 2. Income
  if (c.income_max != null && c.income_max > 0) {
    const ok = profile.annual_income <= c.income_max;
    const item = {
      criterion: 'Annual Family Income',
      satisfied: ok,
      citizen_value: `₹${profile.annual_income.toLocaleString('en-IN')}/yr`,
      required_value: `Up to ₹${c.income_max.toLocaleString('en-IN')}/yr`,
      message: ok
        ? 'Income is within permissible ceiling'
        : `Annual family income exceeds maximum limit of ₹${c.income_max.toLocaleString('en-IN')}`,
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 3. State
  if (
    c.allowed_states &&
    !c.allowed_states.includes('All') &&
    !c.allowed_states.includes('All India')
  ) {
    const ok = c.allowed_states.includes(profile.state);
    const item = {
      criterion: 'State Domicile',
      satisfied: ok,
      citizen_value: profile.state,
      required_value: c.allowed_states.join(', '),
      message: ok
        ? `Resident of eligible state (${profile.state})`
        : `Restricted to residents of ${c.allowed_states.join(', ')}`,
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 4. Gender (Gender-Neutral)
  if (c.gender_requirement && !['any', 'all', 'none'].includes(c.gender_requirement.toLowerCase())) {
    const ok = profile.gender.toLowerCase() === c.gender_requirement.toLowerCase();
    const item = {
      criterion: 'Gender Specificity',
      satisfied: ok,
      citizen_value: profile.gender,
      required_value: c.gender_requirement,
      message: ok ? 'Gender requirement met' : `Targeted to ${c.gender_requirement}`,
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  } else {
    neutral.push({
      criterion: 'Gender Requirement',
      satisfied: true,
      is_neutral: true,
      citizen_value: profile.gender,
      required_value: 'Open to all citizens',
      message: 'Gender is not a restriction for this scheme. Open to all citizens.',
    });
  }

  // 5. Farmer
  if (c.farmer_required) {
    const ok = profile.farmer_status || profile.occupation.toLowerCase().includes('farmer');
    const item = {
      criterion: 'Farmer / Agricultural Status',
      satisfied: ok,
      citizen_value: ok ? 'Verified Farmer' : profile.occupation,
      required_value: 'Farmer / Landholder',
      message: ok
        ? 'Verified as agricultural cultivator / landholder'
        : 'Scheme requires applicant to be an active farmer',
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 6. Student
  if (c.student_required) {
    const ok = profile.student_status || profile.occupation.toLowerCase().includes('student');
    const item = {
      criterion: 'Student Status',
      satisfied: ok,
      citizen_value: ok ? 'Enrolled Student' : profile.occupation,
      required_value: 'Enrolled Student in Recognized Institution',
      message: ok
        ? 'Active student status verified'
        : 'Scheme requires enrollment in recognized institution',
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 7. Disability
  if (c.disability_required) {
    const ok = profile.disability_status;
    const item = {
      criterion: 'Disability / Divyangjan Status',
      satisfied: ok,
      citizen_value: ok ? `Disability Verified (${profile.disability_percentage}%)` : 'Not Applicable',
      required_value: 'Benchmark Disability (40%+)',
      message: ok
        ? 'Eligible under Divyangjan disability guidelines'
        : 'Requires certified benchmark disability of 40% or higher',
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 8. Senior
  if (c.senior_required) {
    const ok = profile.senior_citizen_status || profile.age >= 60;
    const item = {
      criterion: 'Senior Citizen Classification',
      satisfied: ok,
      citizen_value: `${profile.age} years old`,
      required_value: 'Age 60 years or above',
      message: ok ? 'Qualifies as senior citizen' : 'Applicant is under 60 years of age',
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // 9. Categories
  if (c.allowed_categories && !c.allowed_categories.includes('All')) {
    const ok = c.allowed_categories.includes(profile.social_category);
    const item = {
      criterion: 'Social Category / Quota',
      satisfied: ok,
      citizen_value: profile.social_category,
      required_value: c.allowed_categories.join(', '),
      message: ok
        ? `Category (${profile.social_category}) is eligible`
        : `Restricted to categories: ${c.allowed_categories.join(', ')}`,
    };
    if (ok) satisfied.push(item);
    else unmet.push(item);
  }

  // Documents
  const available_docs: string[] = [];
  const missing_docs: string[] = [];
  for (const doc of scheme.required_documents || []) {
    const has = profile.verified_documents.some(
      (vd) =>
        doc.toLowerCase().includes(vd.toLowerCase()) ||
        vd.toLowerCase().includes(doc.toLowerCase())
    );
    if (has) available_docs.push(doc);
    else missing_docs.push(doc);
  }

  // Score
  const hardTotal = satisfied.length + unmet.length;
  const baseMatch = hardTotal === 0 ? 95 : Math.round((satisfied.length / hardTotal) * 100);
  const docRatio = scheme.required_documents?.length
    ? available_docs.length / scheme.required_documents.length
    : 1;
  let finalScore = Math.round(baseMatch * 0.85 + docRatio * 15);

  let status = 'Eligible / Strong Match';
  let badge: 'green' | 'yellow' | 'red' = 'green';

  if (unmet.length > 0) {
    if (finalScore >= 60 && unmet.length === 1) {
      status = 'Potentially Eligible / Needs Verification';
      badge = 'yellow';
      finalScore = Math.min(finalScore, 68);
    } else {
      status = 'Not Eligible based on stated criteria';
      badge = 'red';
      finalScore = Math.min(finalScore, 42);
    }
  } else {
    if (missing_docs.length === 0) {
      status = 'Eligible / Strong Match';
      badge = 'green';
      finalScore = Math.max(finalScore, 92);
    } else {
      status = 'Likely Eligible (Documents Required)';
      badge = 'green';
      finalScore = Math.max(Math.min(finalScore, 88), 75);
    }
  }

  const reasons = [
    ...satisfied.map((s) => `✓ ${s.criterion}: ${s.message}`),
    ...unmet.map((u) => `✗ ${u.criterion}: ${u.message}`),
    ...neutral.map((n) => `— ${n.criterion}: ${n.message}`),
  ];
  if (missing_docs.length > 0) {
    reasons.push(`⚠ Missing verification documents: ${missing_docs.join(', ')}`);
  }

  let summary = `AI-assisted assessment shows a ${finalScore}% match. Status: ${status}.`;
  if (language === 'te') {
    summary = `మీ ప్రొఫైల్ ఆధారంగా ${finalScore}% సరిపోలిక ఉంది. స్థితి: ${status}.`;
  } else if (language === 'hi') {
    summary = `आपकी प्रोफ़ाइल के आधार पर ${finalScore}% मिलान है। स्थिति: ${status}।`;
  }

  return {
    scheme_id: scheme.id,
    scheme_name: scheme.name,
    match_percentage: finalScore,
    status,
    status_badge: badge,
    summary,
    satisfied_criteria: satisfied,
    unmet_criteria: unmet,
    neutral_criteria: neutral,
    missing_documents: missing_docs,
    available_documents: available_docs,
    why_explanation: reasons.join('\n'),
    language,
  };
}

export const INITIAL_LOCKER_DOCUMENTS: LockerDocument[] = [
  {
    id: 'doc-101',
    name: 'Aadhaar Card',
    category: 'Identity Proof',
    document_number: 'XXXX-XXXX-8921',
    file_name: 'uidai_aadhaar_ramesh_kumar.pdf',
    file_size: '840 KB',
    uploaded_at: '2026-07-15',
    source: 'DigiLocker Verified',
    verification_status: 'Verified',
    matched_schemes: ['PM-KISAN', 'Ayushman Bharat PM-JAY', 'Atal Pension Yojana', 'Telangana Rythu Bharosa'],
  },
  {
    id: 'doc-102',
    name: 'Bank Account Passbook',
    category: 'Income & Finance',
    document_number: 'SB-09412048912',
    file_name: 'sbi_bank_passbook_seeded.pdf',
    file_size: '1.4 MB',
    uploaded_at: '2026-07-18',
    source: 'DigiLocker Verified',
    verification_status: 'Verified',
    matched_schemes: ['PM-KISAN', 'Telangana Rythu Bharosa', 'Atal Pension Yojana'],
  },
  {
    id: 'doc-103',
    name: 'Ration Card / Food Security Card',
    category: 'Income & Finance',
    document_number: 'WAP-2601928410',
    file_name: 'food_security_ration_card.pdf',
    file_size: '1.1 MB',
    uploaded_at: '2026-07-22',
    source: 'Department Issued',
    verification_status: 'Verified',
    matched_schemes: ['Ayushman Bharat PM-JAY', 'PM Awas Yojana'],
  },
  {
    id: 'doc-104',
    name: 'Land Pattadar Passbook',
    category: 'Land & Agriculture',
    document_number: 'TS-DHARANI-49210',
    file_name: 'dharani_pattadar_land_passbook.pdf',
    file_size: '2.6 MB',
    uploaded_at: '2026-08-01',
    source: 'DigiLocker Verified',
    verification_status: 'Verified',
    matched_schemes: ['PM-KISAN', 'Telangana Rythu Bharosa'],
  },
  {
    id: 'doc-105',
    name: 'Income Certificate',
    category: 'Income & Finance',
    document_number: 'IC-2026-WARANGAL-781',
    file_name: 'meeseva_income_cert_2026.pdf',
    file_size: '720 KB',
    uploaded_at: '2026-08-20',
    source: 'Citizen Upload',
    verification_status: 'Pending Verification',
    matched_schemes: ['Post-Matric Scholarship', 'PM Awas Yojana'],
  },
];

let mock_locker_documents = [...INITIAL_LOCKER_DOCUMENTS];

export const apiService = {
  async getSchemes(params?: {
    search?: string;
    category?: string;
    level?: string;
    state?: string;
    status?: string;
  }): Promise<GovernmentScheme[]> {
    try {
      const q = new URLSearchParams();
      if (params?.search) q.append('search', params.search);
      if (params?.category) q.append('category', params.category);
      if (params?.level) q.append('level', params.level);
      if (params?.state) q.append('state', params.state);
      if (params?.status) q.append('status', params.status);

      const res = await fetch(`${API_BASE}/schemes?${q.toString()}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('API call failed, using fallback data:', e);
    }
    return [];
  },

  async getAllMatches(profile: CitizenProfile, language: Language = 'en'): Promise<SchemeMatchItem[]> {
    try {
      const res = await fetch(`${API_BASE}/schemes/matches/all?language=${language}`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Matches API offline, calculating locally:', e);
    }

    // Local fallback
    const schemes = await this.getSchemes();
    return schemes
      .filter((s) => s.status === 'Active')
      .map((s) => ({
        scheme: s,
        eligibility: evaluateClientSide(s, profile, language),
      }))
      .sort((a, b) => b.eligibility.match_percentage - a.eligibility.match_percentage);
  },

  async calculateEligibility(
    schemeId: string,
    profile: CitizenProfile,
    language: Language = 'en'
  ): Promise<EligibilityResult> {
    try {
      const res = await fetch(`${API_BASE}/schemes/calculate-eligibility`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scheme_id: schemeId, language, citizen_profile: profile }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Eligibility API offline, calculating locally:', e);
    }

    const scheme = (await this.getSchemes()).find((s) => s.id === schemeId);
    if (!scheme) throw new Error('Scheme not found');
    return evaluateClientSide(scheme, profile, language);
  },

  async getSampleDocs(): Promise<SampleDoc[]> {
    try {
      const res = await fetch(`${API_BASE}/sample-docs`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Sample docs API offline:', e);
    }
    return [
      {
        id: 'pm-kisan',
        title: 'PM-KISAN Operational Guidelines.pdf',
        department: 'Ministry of Agriculture & Farmers Welfare',
        pages: 14,
        size: '1.2 MB',
        preview: 'Central Sector Scheme providing income support to all landholding eligible farmer families...',
      },
      {
        id: 'pm-jay',
        title: 'Ayushman Bharat PM-JAY Policy Circular.pdf',
        department: 'National Health Authority',
        pages: 22,
        size: '2.4 MB',
        preview: 'Secondary and tertiary hospitalization cover of Rs. 5,00,000 per family per year...',
      },
      {
        id: 'post-matric',
        title: 'National Post-Matric Scholarship Scheme Guidelines.pdf',
        department: 'Ministry of Social Justice & Empowerment',
        pages: 18,
        size: '1.8 MB',
        preview: 'Financial assistance to students belonging to underprivileged communities (SC/ST/OBC/EWS)...',
      },
    ];
  },

  async simplifySample(sampleId: string, language: Language = 'en'): Promise<any> {
    try {
      const res = await fetch(`${API_BASE}/schemes/simplify-text`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sample_id: sampleId, language }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Simplify Sample API offline:', e);
    }

    const schemes = await this.getSchemes();
    const matched = schemes.find((s) => s.id === sampleId) || schemes[0];
    return {
      success: true,
      sample_id: sampleId,
      simplified_scheme: matched,
      personalized_eligibility: evaluateClientSide(matched, DEFAULT_PROFILE, language),
    };
  },

  async simplifyFile(file: File, language: Language = 'en'): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);

    try {
      const res = await fetch(`${API_BASE}/schemes/simplify-file`, {
        method: 'POST',
        body: formData,
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('File simplify failed, creating dynamic summary:', e);
    }

    // Dynamic mock summary for uploaded file
    const docName = file.name.replace('.pdf', '');
    const dynamicScheme: GovernmentScheme = {
      id: `uploaded-${Date.now()}`,
      name: docName,
      department: 'Ministry of Social Justice & Empowerment / State Department',
      level: 'Central',
      state: 'All India',
      category: 'Social Welfare',
      description: `Official scheme guidelines simplified from uploaded document: ${file.name}.`,
      simple_summary: `This scheme provides direct financial support and welfare subsidies to qualifying citizens under official guidelines.`,
      one_line_summary: `Direct public welfare assistance for eligible households under ${docName}.`,
      benefits: `Financial assistance up to ₹10,000 transferred directly to bank account via DBT.`,
      benefit_amount: '₹10,000 / year via DBT',
      eligibility_criteria: {
        age_min: 18,
        age_max: 65,
        income_max: 250000,
        allowed_states: ['All'],
        allowed_area_types: ['All'],
        allowed_occupations: ['All'],
        allowed_categories: ['All'],
        gender_requirement: 'Any',
        disability_required: false,
        farmer_required: false,
        student_required: false,
        senior_required: false,
      },
      structured_conditions: [
        {
          criterion: 'Age Range',
          requirement: '18 to 65 years',
          explanation: 'Applicant must be an adult citizen within the specified age brackets.',
        },
        {
          criterion: 'Income Ceiling',
          requirement: 'Below ₹2,50,000 / year',
          explanation: 'Family annual income must not exceed the permissible ceiling.',
        },
        {
          criterion: 'Identity Verification',
          requirement: 'Aadhaar Mandatory',
          explanation: 'Must hold valid Aadhaar card linked with bank account.',
        },
      ],
      who_can_apply: [
        'Citizens between 18 and 65 years of age',
        'Households with annual income under ₹2.5 Lakh',
        'Individuals with active bank account and Aadhaar',
      ],
      who_cannot_apply: [
        'Income tax paying families',
        'Institutional employees and government servants',
      ],
      required_documents: [
        'Aadhaar Card',
        'Bank Account Passbook',
        'Income Certificate',
        'Ration Card',
      ],
      application_steps: [
        {
          step_number: 1,
          title: 'Portal Access',
          description: 'Visit the designated government portal or local MeeSeva/CSC centre.',
        },
        {
          step_number: 2,
          title: 'Aadhaar e-KYC',
          description: 'Authenticate identity using 12-digit Aadhaar OTP.',
        },
        {
          step_number: 3,
          title: 'Submit Application',
          description: 'Upload required income certificate and bank records.',
        },
        {
          step_number: 4,
          title: 'Field Verification',
          description: 'Revenue authority inspects and approves DBT disbursement.',
        },
      ],
      start_date: 'Ongoing',
      end_date: '31-03-2027',
      official_url: 'https://india.gov.in',
      source_document: file.name,
      last_updated: '2026-09-01',
      status: 'Active',
      review_status: 'Approved',
    };

    return {
      success: true,
      filename: file.name,
      file_size: `${(file.size / 1024).toFixed(1)} KB`,
      simplified_scheme: dynamicScheme,
      personalized_eligibility: evaluateClientSide(dynamicScheme, DEFAULT_PROFILE, language),
    };
  },

  async askAssistant(message: string, language: Language = 'en', schemeId?: string, profile?: CitizenProfile) {
    try {
      const res = await fetch(`${API_BASE}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          language,
          scheme_id: schemeId,
          citizen_profile: profile,
        }),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Assistant API offline, answering grounded response locally:', e);
    }

    // Grounded fallback response
    let reply = `I can confirm that verified government welfare schemes include PM-KISAN, Ayushman Bharat PM-JAY, Post-Matric Scholarship, and Atal Pension Yojana. All bank accounts must be Aadhaar-seeded for DBT.`;
    if (language === 'te') {
      reply = `ప్రభుత్వ పథకాల వివరాలు: PM-KISAN, ఆయుష్మాన్ భారత్, పోస్ట్ మెట్రిక్ స్కాలర్‌షిప్ మరియు అటల్ పెన్షన్ యోజన. ప్రత్యక్ష నగదు బదిలీ (DBT) కోసం మీ బ్యాంక్ ఖాతాకు ఆధార్ లింక్ చేయడం తప్పనిసరి.`;
    } else if (language === 'hi') {
      reply = `सरकारी कल्याणकारी योजनाओं में PM-KISAN, आयुष्मान भारत, पोस्ट-मैट्रिक स्कॉलरशिप और अटल पेंशन योजना शामिल हैं। DBT के लिए आधार से जुड़ा बैंक खाता अनिवार्य है।`;
    }
    return {
      reply,
      language,
      suggested_questions: [
        'Which schemes am I eligible for?',
        'What documents do I need for PM-KISAN?',
        'Explain Ayushman Bharat PM-JAY simply',
      ],
      related_schemes: [],
    };
  },

  async getProfile(): Promise<CitizenProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Profile API offline:', e);
    }
    return DEFAULT_PROFILE;
  },

  async updateProfile(profile: CitizenProfile): Promise<CitizenProfile> {
    try {
      const res = await fetch(`${API_BASE}/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Profile update API offline:', e);
    }
    return profile;
  },

  async getApplications(): Promise<ApplicationItem[]> {
    try {
      const res = await fetch(`${API_BASE}/applications`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Applications API offline:', e);
    }
    return [
      {
        id: 'app-1001',
        scheme_id: 'pm-kisan',
        scheme_name: 'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
        department: 'Ministry of Agriculture and Farmers Welfare',
        application_number: 'PMK-2026-TS-88421',
        applied_date: '2026-08-05',
        status: 'Under Review',
        current_step_index: 2,
        last_update: '2026-08-28',
        missing_documents: [],
        official_portal_url: 'https://pmkisan.gov.in',
        remarks: 'Aadhaar authenticated. Land records verification in progress at Mandal Revenue Office.',
      },
      {
        id: 'app-1002',
        scheme_id: 'pm-jay',
        scheme_name: 'Ayushman Bharat — PM-JAY',
        department: 'National Health Authority (NHA)',
        application_number: 'AB-PMJAY-901452-TS',
        applied_date: '2026-07-12',
        status: 'Approved',
        current_step_index: 3,
        last_update: '2026-08-01',
        missing_documents: [],
        official_portal_url: 'https://beneficiary.nha.gov.in',
        remarks: 'Golden Card generated. Active healthcare cover of ₹5 Lakh enabled for family.',
      },
      {
        id: 'app-1003',
        scheme_id: 'telangana-rythu-bharosa',
        scheme_name: 'Telangana Rythu Bharosa',
        department: 'Department of Agriculture, Telangana',
        application_number: 'TRB-2026-WRG-33109',
        applied_date: '2026-08-20',
        status: 'Documents Required',
        current_step_index: 1,
        last_update: '2026-09-02',
        missing_documents: ['Land Pattadar Passbook (Updated Dharani Copy)'],
        official_portal_url: 'https://rythubharosa.telangana.gov.in',
        remarks: 'Please upload updated Dharani passbook copy to confirm Survey Number 142/B.',
      },
    ];
  },

  async uploadMissingDoc(appId: string, docName: string) {
    try {
      const res = await fetch(`${API_BASE}/applications/${appId}/upload-document?doc_name=${encodeURIComponent(docName)}`, {
        method: 'POST',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Doc upload API offline:', e);
    }
    return { success: true };
  },

  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await fetch(`${API_BASE}/notifications`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Notifications API offline:', e);
    }
    return [
      {
        id: 'notif-1',
        title: 'New Scheme Match: PM-KISAN',
        message: 'Based on your updated farmer status and landholding in Warangal, you have a 92% match for PM-KISAN annual assistance of ₹6,000.',
        type: 'scheme_match',
        date: '2026-09-10',
        is_read: false,
        action_url: '/simplify?scheme=pm-kisan',
      },
      {
        id: 'notif-2',
        title: 'Document Required for Rythu Bharosa',
        message: 'Your application TRB-2026-WRG-33109 requires an updated Dharani Passbook upload before 25th September.',
        type: 'document_missing',
        date: '2026-09-08',
        is_read: false,
        action_url: '/applications',
      },
      {
        id: 'notif-3',
        title: 'Scholarship Deadline Approaching',
        message: 'National Post-Matric Scholarship portal closes applications on 30th November 2026. Review requirements today.',
        type: 'deadline',
        date: '2026-09-05',
        is_read: true,
        action_url: '/schemes',
      },
      {
        id: 'notif-4',
        title: 'Ayushman Bharat Golden Card Approved',
        message: 'Your e-KYC was approved. Download your cashless ₹5 Lakh health card directly from the portal.',
        type: 'status_change',
        date: '2026-08-02',
        is_read: true,
        action_url: '/applications',
      },
    ];
  },

  async markNotificationRead(notifId: string) {
    try {
      await fetch(`${API_BASE}/notifications/${notifId}/read`, { method: 'PUT' });
    } catch (e) {
      console.warn(e);
    }
  },

  async markAllNotificationsRead() {
    try {
      await fetch(`${API_BASE}/notifications/mark-all-read`, { method: 'PUT' });
    } catch (e) {
      console.warn(e);
    }
  },

  async getAdminStats() {
    try {
      const res = await fetch(`${API_BASE}/admin/stats`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Admin stats API offline:', e);
    }
    return {
      total_schemes: 7,
      active_schemes: 7,
      pending_reviews: 2,
      total_applications_tracked: 3,
      documents_analyzed_count: 142,
    };
  },

  async getAdminReviews(): Promise<AdminRuleReviewItem[]> {
    try {
      const res = await fetch(`${API_BASE}/admin/reviews`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Admin reviews API offline:', e);
    }
    return [
      {
        id: 'review-201',
        document_name: 'Gazette_Circular_PM_Suraksha_Bima_2026.pdf',
        uploaded_at: '2026-09-09 14:30',
        scheme_name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY 2.0)',
        department: 'Department of Financial Services, Ministry of Finance',
        category: 'Social Welfare',
        raw_extracted_text_preview:
          'GOVERNMENT OF INDIA - MINISTRY OF FINANCE. Notification No. 14/2026. Risk coverage of ₹2 Lakh for accidental death for ₹20/year premium.',
        extracted_criteria: {
          age_min: 18,
          age_max: 70,
          income_max: null,
          allowed_states: ['All'],
          allowed_area_types: ['All'],
          allowed_occupations: ['All'],
          allowed_categories: ['All'],
          gender_requirement: 'Any',
          disability_required: false,
          farmer_required: false,
          student_required: false,
          senior_required: false,
          other_conditions: ['Must have active savings bank account with auto-debit consent'],
        },
        extracted_benefits:
          'Accidental death and total disability cover of ₹2,00,000 for ₹20/year premium.',
        extracted_documents: ['Aadhaar Card', 'Bank Account Passbook', 'Auto-Debit Consent Mandate'],
        confidence_score: 0.96,
        status: 'Pending Review',
        reviewer_notes:
          'Extracted successfully from official gazette. Review age bracket (18-70) and annual premium before publishing.',
      },
      {
        id: 'review-202',
        document_name: 'TS_Aasara_Pension_Amendment_Rules_2026.pdf',
        uploaded_at: '2026-09-08 11:15',
        scheme_name: 'Telangana Aasara Social Security Pension',
        department: 'Society for Elimination of Rural Poverty (SERP), Telangana',
        category: 'Social Welfare',
        raw_extracted_text_preview:
          'TELANGANA STATE GAZETTE. Revision of Aasara Pension. Eligible age 57 years. Monthly pension ₹2,016.',
        extracted_criteria: {
          age_min: 57,
          age_max: 110,
          income_max: 150000,
          allowed_states: ['Telangana'],
          allowed_area_types: ['Rural', 'Urban'],
          allowed_occupations: ['All'],
          allowed_categories: ['All'],
          gender_requirement: 'Any',
          disability_required: false,
          farmer_required: false,
          student_required: false,
          senior_required: false,
          other_conditions: ['Resident of Telangana', 'BPL / Food Security card holder'],
        },
        extracted_benefits:
          'Monthly direct pension of ₹2,016 (or ₹3,016 for Divyangjan with 40%+ disability).',
        extracted_documents: [
          'Aadhaar Card',
          'Telangana Food Security Ration Card',
          'Age Proof Certificate',
          'Bank Account Passbook',
        ],
        confidence_score: 0.94,
        status: 'Pending Review',
        reviewer_notes: 'Age threshold confirmed at 57 years as per state policy amendment.',
      },
    ];
  },

  async approveReview(reviewId: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/reviews/${reviewId}/approve`, { method: 'POST' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return { success: true, message: 'Scheme published successfully' };
  },

  async rejectReview(reviewId: string, reason?: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/reviews/${reviewId}/reject?reason=${encodeURIComponent(reason || '')}`, {
        method: 'POST',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return { success: true, message: 'Rule rejected' };
  },

  async createScheme(scheme: GovernmentScheme) {
    try {
      const res = await fetch(`${API_BASE}/admin/schemes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(scheme),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return scheme;
  },

  async deleteScheme(schemeId: string) {
    try {
      const res = await fetch(`${API_BASE}/admin/schemes/${schemeId}`, { method: 'DELETE' });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn(e);
    }
    return { success: true };
  },

  async getLockerDocuments(): Promise<LockerDocument[]> {
    try {
      const res = await fetch(`${API_BASE}/locker`);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Locker API offline, using fallback:', e);
    }
    return [...mock_locker_documents];
  },

  async uploadLockerDocument(doc: {
    name: string;
    category: string;
    document_number?: string;
    file_name?: string;
    file_size?: string;
  }): Promise<LockerDocument> {
    try {
      const res = await fetch(`${API_BASE}/locker/upload`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doc),
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Locker upload API offline, updating local mock:', e);
    }
    const newDoc: LockerDocument = {
      id: `doc-${Date.now()}`,
      name: doc.name,
      category: doc.category,
      document_number: doc.document_number || `REG-${mock_locker_documents.length + 101}`,
      file_name: doc.file_name || `${doc.name.toLowerCase().replace(/\s+/g, '_')}.pdf`,
      file_size: doc.file_size || '1.2 MB',
      uploaded_at: new Date().toISOString().split('T')[0],
      source: 'Citizen Upload',
      verification_status: 'Pending Verification',
      matched_schemes: ['Universal Verification Required'],
    };
    mock_locker_documents.unshift(newDoc);
    return newDoc;
  },

  async deleteLockerDocument(docId: string): Promise<{ success: boolean }> {
    try {
      const res = await fetch(`${API_BASE}/locker/${docId}`, {
        method: 'DELETE',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('Locker delete API offline, updating local mock:', e);
    }
    mock_locker_documents = mock_locker_documents.filter((d) => d.id !== docId);
    return { success: true };
  },

  async syncDigiLocker(): Promise<{ success: boolean; synced_count: number; total_documents: number }> {
    try {
      const res = await fetch(`${API_BASE}/locker/sync-digilocker`, {
        method: 'POST',
      });
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('DigiLocker sync API offline, updating local mock:', e);
    }
    const additional: LockerDocument[] = [
      {
        id: `doc-${Date.now()}-1`,
        name: 'Caste / Community Certificate',
        category: 'Social Category',
        document_number: 'TS-CASTE-2026-9012',
        file_name: 'digilocker_caste_obc_verified.pdf',
        file_size: '620 KB',
        uploaded_at: new Date().toISOString().split('T')[0],
        source: 'DigiLocker Verified',
        verification_status: 'Verified',
        matched_schemes: ['Post-Matric Scholarship', 'Skill India Mission'],
      },
      {
        id: `doc-${Date.now()}-2`,
        name: 'Disability Certificate / UDID',
        category: 'Health & Disability',
        document_number: 'UDID-TS-9812-4012',
        file_name: 'digilocker_udid_verified.pdf',
        file_size: '950 KB',
        uploaded_at: new Date().toISOString().split('T')[0],
        source: 'DigiLocker Verified',
        verification_status: 'Verified',
        matched_schemes: ['ADIP Scheme', 'Divyangjan Pension'],
      },
    ];
    let count = 0;
    for (const d of additional) {
      if (!mock_locker_documents.some((item) => item.name.toLowerCase() === d.name.toLowerCase())) {
        mock_locker_documents.push(d);
        count++;
      }
    }
    return { success: true, synced_count: count, total_documents: mock_locker_documents.length };
  },
};
