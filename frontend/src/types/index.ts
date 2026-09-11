export type Language = 'en' | 'te' | 'hi';

export type NavigationTab =
  | 'dashboard'
  | 'schemes'
  | 'simplify'
  | 'assistant'
  | 'applications'
  | 'notifications'
  | 'locker'
  | 'profile'
  | 'admin';

export interface CitizenProfile {
  id: string;
  full_name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Transgender' | 'Prefer not to say';
  state: string;
  district: string;
  area_type: 'Rural' | 'Urban';
  annual_income: number;
  occupation: string;
  education_level: string;
  social_category: 'General' | 'OBC' | 'SC' | 'ST' | 'EWS';
  disability_status: boolean;
  disability_percentage?: number;
  employment_status: 'Employed' | 'Unemployed' | 'Self-Employed' | 'Student';
  farmer_status: boolean;
  student_status: boolean;
  senior_citizen_status: boolean;
  marital_status: string;
  family_size: number;
  verified_documents: string[];
}

export interface EligibilityCriteria {
  age_min?: number | null;
  age_max?: number | null;
  income_max?: number | null;
  allowed_states: string[];
  allowed_area_types: string[];
  allowed_occupations: string[];
  allowed_categories: string[];
  gender_requirement: string;
  disability_required: boolean;
  farmer_required: boolean;
  student_required: boolean;
  senior_required: boolean;
  other_conditions?: string[];
}

export interface SchemeCondition {
  criterion: string;
  requirement: string;
  explanation: string;
}

export interface ApplicationStep {
  step_number: number;
  title: string;
  description: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  department: string;
  level: 'Central' | 'State';
  state: string;
  category: string;
  description: string;
  simple_summary: string;
  one_line_summary: string;
  benefits: string;
  benefit_amount?: string;
  eligibility_criteria: EligibilityCriteria;
  structured_conditions: SchemeCondition[];
  who_can_apply: string[];
  who_cannot_apply: string[];
  required_documents: string[];
  application_steps: ApplicationStep[];
  start_date: string;
  end_date: string;
  official_url: string;
  source_document: string;
  last_updated: string;
  status: 'Active' | 'Draft' | 'Archived';
  review_status: 'Approved' | 'Pending Review';
}

export interface CriterionCheck {
  criterion: string;
  satisfied: boolean;
  is_neutral?: boolean;
  message: string;
  citizen_value: string;
  required_value: string;
}

export interface EligibilityResult {
  scheme_id: string;
  scheme_name: string;
  match_percentage: number;
  status: string;
  status_badge: 'green' | 'yellow' | 'red';
  summary: string;
  satisfied_criteria: CriterionCheck[];
  unmet_criteria: CriterionCheck[];
  neutral_criteria: CriterionCheck[];
  missing_documents: string[];
  available_documents: string[];
  why_explanation: string;
  language?: string;
}

export interface SchemeMatchItem {
  scheme: GovernmentScheme;
  eligibility: EligibilityResult;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  language?: Language;
  related_schemes?: Array<{ id: string; name: string; category: string }>;
}

export interface ApplicationItem {
  id: string;
  scheme_id: string;
  scheme_name: string;
  department: string;
  application_number: string;
  applied_date: string;
  status:
    | 'Draft'
    | 'Submitted'
    | 'Under Review'
    | 'Documents Required'
    | 'Approved'
    | 'Rejected'
    | 'Completed';
  current_step_index: number;
  last_update: string;
  missing_documents: string[];
  official_portal_url: string;
  remarks?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'scheme_match' | 'deadline' | 'document_missing' | 'status_change' | 'rule_update';
  date: string;
  is_read: boolean;
  action_url?: string;
}

export interface AdminRuleReviewItem {
  id: string;
  document_name: string;
  uploaded_at: string;
  scheme_name: string;
  department: string;
  category: string;
  raw_extracted_text_preview: string;
  extracted_criteria: EligibilityCriteria;
  extracted_benefits: string;
  extracted_documents: string[];
  confidence_score: number;
  status: 'Pending Review' | 'Approved' | 'Rejected';
  reviewer_notes?: string;
}

export interface SampleDoc {
  id: string;
  title: string;
  department: string;
  pages: number;
  size: string;
  preview: string;
}

export interface LockerDocument {
  id: string;
  name: string;
  category: string;
  document_number?: string;
  file_name: string;
  file_size: string;
  uploaded_at: string;
  source: string;
  verification_status: string;
  matched_schemes: string[];
  preview_url?: string;
}

