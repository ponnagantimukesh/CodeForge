import React, { useState, useEffect } from 'react';
import {
  Shield,
  FileCheck2,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Layers,
  BarChart3,
  Search,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { AdminRuleReviewItem, GovernmentScheme } from '../types';

export const AdminPanel: React.FC = () => {
  const { schemes, showToast, t } = useApp();

  const [reviews, setReviews] = useState<AdminRuleReviewItem[]>([]);
  const [stats, setStats] = useState<any>({
    total_schemes: 7,
    active_schemes: 7,
    pending_reviews: 2,
    total_applications_tracked: 3,
    documents_analyzed_count: 142,
  });
  const [localSchemes, setLocalSchemes] = useState<GovernmentScheme[]>([]);
  const [activeTab, setActiveTab] = useState<'reviews' | 'schemes' | 'analytics'>('reviews');
  const [searchFilter, setSearchFilter] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New scheme form state
  const [newScheme, setNewScheme] = useState<Partial<GovernmentScheme>>({
    name: '',
    department: '',
    level: 'Central',
    state: 'All India',
    category: 'Social Welfare',
    description: '',
    simple_summary: '',
    one_line_summary: '',
    benefits: '',
    benefit_amount: '',
    start_date: '01-09-2026',
    end_date: '31-03-2028',
    official_url: 'https://india.gov.in',
    status: 'Active',
    required_documents: ['Aadhaar Card', 'Bank Account Passbook'],
  });

  useEffect(() => {
    async function loadAdmin() {
      const [revs, st] = await Promise.all([
        apiService.getAdminReviews(),
        apiService.getAdminStats(),
      ]);
      setReviews(revs);
      setStats(st);
      setLocalSchemes(schemes);
    }
    loadAdmin();
  }, [schemes]);

  const handleApprove = async (review: AdminRuleReviewItem) => {
    await apiService.approveReview(review.id);
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: 'Approved' } : r))
    );
    setStats((prev: any) => ({
      ...prev,
      pending_reviews: Math.max(0, prev.pending_reviews - 1),
      total_schemes: prev.total_schemes + 1,
    }));
    showToast(`Rule approved! Scheme "${review.scheme_name}" is now published.`);
  };

  const handleReject = async (review: AdminRuleReviewItem) => {
    await apiService.rejectReview(review.id, 'Criteria requires manual policy revision.');
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: 'Rejected' } : r))
    );
    setStats((prev: any) => ({
      ...prev,
      pending_reviews: Math.max(0, prev.pending_reviews - 1),
    }));
    showToast(`Review item rejected for revision.`);
  };

  const handleDeleteScheme = async (id: string) => {
    if (confirm('Are you sure you want to deactivate this government scheme?')) {
      await apiService.deleteScheme(id);
      setLocalSchemes((prev) => prev.filter((s) => s.id !== id));
      showToast('Scheme deactivated from public directory.');
    }
  };

  const handleCreateSchemeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullScheme: GovernmentScheme = {
      id: `scheme-${Date.now()}`,
      name: newScheme.name || 'New Welfare Scheme',
      department: newScheme.department || 'Ministry of Social Justice',
      level: (newScheme.level as any) || 'Central',
      state: newScheme.state || 'All India',
      category: newScheme.category || 'Social Welfare',
      description: newScheme.description || '',
      simple_summary: newScheme.simple_summary || newScheme.description || '',
      one_line_summary: newScheme.one_line_summary || newScheme.name || '',
      benefits: newScheme.benefits || '',
      benefit_amount: newScheme.benefit_amount,
      eligibility_criteria: {
        age_min: 18,
        age_max: 70,
        income_max: 300000,
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
        { criterion: 'Age Limit', requirement: '18 to 70 years', explanation: 'Adult citizens.' },
      ],
      who_can_apply: ['Eligible citizens possessing required valid identification'],
      who_cannot_apply: ['Income tax paying households'],
      required_documents: newScheme.required_documents || ['Aadhaar Card', 'Bank Account Passbook'],
      application_steps: [
        { step_number: 1, title: 'Portal Registration', description: 'Apply on designated website.' },
      ],
      start_date: newScheme.start_date || '01-09-2026',
      end_date: newScheme.end_date || '31-03-2028',
      official_url: newScheme.official_url || 'https://india.gov.in',
      source_document: 'Official Department Gazette',
      last_updated: '2026-09-11',
      status: 'Active',
      review_status: 'Approved',
    };

    await apiService.createScheme(fullScheme);
    setLocalSchemes((prev) => [fullScheme, ...prev]);
    setIsAddModalOpen(false);
    showToast(`Scheme "${fullScheme.name}" added successfully.`);
  };

  const filteredSchemes = localSchemes.filter(
    (s) =>
      s.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.department.toLowerCase().includes(searchFilter.toLowerCase()) ||
      s.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-600 text-white">
              <Shield className="w-4 h-4" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight">{t.admin.title}</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">{t.admin.subtitle}</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-blue-600/30 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          {t.admin.addScheme}
        </button>
      </div>

      {/* Admin Statistics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Total Schemes</p>
          <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{stats.total_schemes}</h3>
          <span className="text-[11px] text-emerald-600 font-medium">Published & Active</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Pending AI Rule Reviews</p>
          <h3 className="text-3xl font-extrabold text-amber-600 mt-1">{stats.pending_reviews}</h3>
          <span className="text-[11px] text-amber-600 font-medium">Awaiting Officer Signoff</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Applications Tracked</p>
          <h3 className="text-3xl font-extrabold text-blue-600 mt-1">
            {stats.total_applications_tracked}
          </h3>
          <span className="text-[11px] text-blue-600 font-medium">Across all states</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
          <p className="text-xs font-semibold text-slate-500 uppercase">Documents Analyzed</p>
          <h3 className="text-3xl font-extrabold text-indigo-600 mt-1">
            {stats.documents_analyzed_count}
          </h3>
          <span className="text-[11px] text-indigo-600 font-medium">Gazettes & Circulars</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('reviews')}
          className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'reviews'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <FileCheck2 className="w-4 h-4" />
          {t.admin.reviewTitle}
          {stats.pending_reviews > 0 && (
            <span className="text-[10px] font-bold bg-amber-500 text-white px-2 py-0.2 rounded-full">
              {stats.pending_reviews}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('schemes')}
          className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'schemes'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          {t.admin.schemesList} ({localSchemes.length})
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`pb-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'border-blue-600 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Usage Analytics
        </button>
      </div>

      {/* TAB 1: AI Extracted Rules — Review Required (CRITICAL FOR GOVERNMENT AUDIT) */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Human-in-the-Loop Governance Mandate:</strong> The rules below were extracted
              from recently uploaded gazettes by Generative AI. Official department administrators
              must verify criteria thresholds before publishing them to the citizen eligibility
              engine.
            </div>
          </div>

          <div className="space-y-5">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                        {rev.document_name}
                      </span>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                          rev.status === 'Approved'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : rev.status === 'Rejected'
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : 'bg-amber-50 text-amber-800 border-amber-200'
                        }`}
                      >
                        {rev.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">{rev.scheme_name}</h3>
                    <p className="text-xs text-slate-500">{rev.department}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-semibold text-slate-400">
                        {t.admin.confidence}
                      </div>
                      <div className="text-base font-extrabold text-blue-600 font-mono">
                        {(rev.confidence_score * 100).toFixed(0)}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Raw Gazette Snippet Preview */}
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Raw Document Snippet
                  </div>
                  "{rev.raw_extracted_text_preview}"
                </div>

                {/* Extracted Structured Criteria */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl">
                    <div className="font-bold text-blue-900">Extracted Age Limit</div>
                    <div className="text-slate-700 mt-0.5">
                      {rev.extracted_criteria.age_min ?? 0} to{' '}
                      {rev.extracted_criteria.age_max ?? 'No limit'} years
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl">
                    <div className="font-bold text-blue-900">Income Cap</div>
                    <div className="text-slate-700 mt-0.5">
                      {rev.extracted_criteria.income_max
                        ? `₹${rev.extracted_criteria.income_max.toLocaleString('en-IN')}`
                        : 'No income ceiling specified'}
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50/40 border border-blue-100 rounded-xl">
                    <div className="font-bold text-blue-900">Applicable States</div>
                    <div className="text-slate-700 mt-0.5">
                      {rev.extracted_criteria.allowed_states.join(', ')}
                    </div>
                  </div>
                </div>

                {/* Extracted Benefits */}
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">Extracted Benefit Statement:</strong>{' '}
                  {rev.extracted_benefits}
                </div>

                {/* Extracted Documents */}
                <div className="text-xs text-slate-700 flex flex-wrap gap-1.5 items-center">
                  <strong className="text-slate-900">Extracted Required Documents:</strong>
                  {rev.extracted_documents.map((d, i) => (
                    <span
                      key={i}
                      className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-medium"
                    >
                      {d}
                    </span>
                  ))}
                </div>

                {/* Reviewer notes */}
                {rev.reviewer_notes && (
                  <p className="text-xs italic text-slate-500 border-l-2 border-slate-300 pl-3">
                    Notes: {rev.reviewer_notes}
                  </p>
                )}

                {/* Actions */}
                {rev.status === 'Pending Review' && (
                  <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => handleReject(rev)}
                      className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      {t.admin.rejectBtn}
                    </button>
                    <button
                      onClick={() => handleApprove(rev)}
                      className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      {t.admin.approveBtn}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Published Schemes Directory */}
      {activeTab === 'schemes' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filter schemes..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900"
              />
            </div>
            <span className="text-xs text-slate-500 font-mono">
              Total {filteredSchemes.length} records
            </span>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="p-3">Scheme Name</th>
                  <th className="p-3">Department</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filteredSchemes.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60">
                    <td className="p-3 font-bold text-slate-900">{s.name}</td>
                    <td className="p-3 text-slate-500">{s.department}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {s.category}
                      </span>
                    </td>
                    <td className="p-3">{s.level}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold">
                        {s.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteScheme(s.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Deactivate"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Usage Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Top Schemes Viewed by Citizens</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span>1. PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)</span>
                <span className="font-bold text-slate-900">1,248 queries</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[88%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>2. Ayushman Bharat — PM-JAY</span>
                <span className="font-bold text-slate-900">982 queries</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full w-[70%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>3. Telangana Rythu Bharosa</span>
                <span className="font-bold text-slate-900">654 queries</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-600 h-full w-[46%]" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900">Language Usage Breakdown</h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between items-center">
                <span>English</span>
                <span className="font-bold text-slate-900">45%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full w-[45%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Telugu (తెలుగు)</span>
                <span className="font-bold text-slate-900">35%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[35%]" />
              </div>

              <div className="flex justify-between items-center pt-2">
                <span>Hindi (हिन्दी)</span>
                <span className="font-bold text-slate-900">20%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full w-[20%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Scheme Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl p-6 shadow-2xl space-y-4 my-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Add New Government Scheme</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSchemeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Scheme Name</label>
                <input
                  type="text"
                  required
                  value={newScheme.name}
                  onChange={(e) => setNewScheme({ ...newScheme, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={newScheme.department}
                    onChange={(e) => setNewScheme({ ...newScheme, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={newScheme.category}
                    onChange={(e) => setNewScheme({ ...newScheme, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                  >
                    <option value="Agriculture">Agriculture</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Scholarships">Scholarships</option>
                    <option value="Housing">Housing</option>
                    <option value="Social Welfare">Social Welfare</option>
                    <option value="Disability Support">Disability Support</option>
                    <option value="Senior Citizens">Senior Citizens</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Benefit Statement</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Up to ₹5,000 monthly financial aid"
                  value={newScheme.benefits}
                  onChange={(e) => setNewScheme({ ...newScheme, benefits: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Simple Explanation</label>
                <textarea
                  rows={3}
                  required
                  value={newScheme.simple_summary}
                  onChange={(e) => setNewScheme({ ...newScheme, simple_summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Publish Scheme
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
