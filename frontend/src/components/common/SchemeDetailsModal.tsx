import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building2,
  FileText,
  ShieldCheck,
  CheckSquare,
  Square,
  Sparkles,
  Award,
} from 'lucide-react';
import { GovernmentScheme } from '../../types';
import { useApp } from '../../context/AppContext';
import { DisclaimerBanner } from './DisclaimerBanner';

interface SchemeDetailsModalProps {
  scheme: GovernmentScheme | null;
  onClose: () => void;
  onCheckEligibility: (scheme: GovernmentScheme) => void;
}

export const SchemeDetailsModal: React.FC<SchemeDetailsModalProps> = ({
  scheme,
  onClose,
  onCheckEligibility,
}) => {
  const { t, profile } = useApp();
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  if (!scheme) return null;

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [docName]: !prev[docName],
    }));
  };

  const isProfileDoc = (docName: string) =>
    profile.verified_documents.some(
      (vd) =>
        docName.toLowerCase().includes(vd.toLowerCase()) ||
        vd.toLowerCase().includes(docName.toLowerCase())
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white border border-slate-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                {scheme.category}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200 text-slate-700">
                {scheme.level} Scheme • {scheme.state}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Updated: {scheme.last_updated}
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">{scheme.name}</h2>
            <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1 font-medium">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              {scheme.department}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Benefit Highlight Card */}
          <div className="bg-linear-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3.5">
            <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <div className="text-xs font-semibold text-emerald-900 uppercase tracking-wide">
                Key Citizen Benefit
              </div>
              <p className="text-base font-bold text-emerald-950 mt-0.5">
                {scheme.benefit_amount || scheme.benefits}
              </p>
              <p className="text-xs text-emerald-800 mt-1">{scheme.benefits}</p>
            </div>
          </div>

          {/* Simple Explanation */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              What is this scheme? (Simple Explanation)
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {scheme.simple_summary}
            </p>
          </div>

          {/* Who Can Apply & Who Cannot Apply */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4">
              <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Who Can Apply
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {scheme.who_can_apply.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4">
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                Who Cannot Apply (Exclusions)
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {scheme.who_cannot_apply.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Structured Eligibility Conditions Table */}
          {scheme.structured_conditions.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-2.5">
                Structured Eligibility Conditions
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3 w-1/4">Criterion</th>
                      <th className="p-3 w-1/3">Requirement</th>
                      <th className="p-3">Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {scheme.structured_conditions.map((sc, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60">
                        <td className="p-3 font-semibold text-slate-900">{sc.criterion}</td>
                        <td className="p-3 font-mono text-blue-900 bg-blue-50/30">
                          {sc.requirement}
                        </td>
                        <td className="p-3 text-slate-600">{sc.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Interactive Document Checklist */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Required Documents Checklist
              </h3>
              <span className="text-xs text-slate-500">Check off documents you have</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {scheme.required_documents.map((doc, idx) => {
                const isChecked = checkedDocs[doc] ?? isProfileDoc(doc);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all cursor-pointer text-xs ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <span className="flex-1 truncate">{doc}</span>
                    {isProfileDoc(doc) && (
                      <span className="text-[10px] font-semibold bg-emerald-200/80 text-emerald-900 px-1.5 py-0.5 rounded-md">
                        In Vault
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step-by-Step How to Apply */}
          {scheme.application_steps.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">
                How to Apply (Step-by-Step Timeline)
              </h3>
              <div className="space-y-2.5 border-l-2 border-blue-500 pl-4 ml-2">
                {scheme.application_steps.map((st) => (
                  <div key={st.step_number} className="relative">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                    <h5 className="text-xs font-bold text-slate-900">
                      Step {st.step_number}: {st.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5">{st.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Important Dates */}
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
            <div className="flex-1 flex flex-wrap gap-4 font-medium">
              <span>Start Date: {scheme.start_date}</span>
              <span>Deadline: {scheme.end_date}</span>
            </div>
          </div>

          {/* Official Disclaimer */}
          <DisclaimerBanner sourceDoc={scheme.source_document} sourceUrl={scheme.official_url} />
        </div>

        {/* Footer CTAs */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
          >
            Visit Official Govt Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckEligibility(scheme);
              }}
              className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              Check My Eligibility
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
