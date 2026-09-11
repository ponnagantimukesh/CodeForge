import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  XCircle,
  MinusCircle,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  UserCheck,
  ShieldAlert,
  FileQuestion,
  ExternalLink,
} from 'lucide-react';
import { GovernmentScheme, EligibilityResult } from '../../types';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { EligibilityBadge } from './EligibilityBadge';
import { DisclaimerBanner } from './DisclaimerBanner';

interface EligibilityDrawerProps {
  scheme: GovernmentScheme | null;
  onClose: () => void;
}

export const EligibilityDrawer: React.FC<EligibilityDrawerProps> = ({ scheme, onClose }) => {
  const { profile, language, setCurrentTab } = useApp();
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showWhy, setShowWhy] = useState<boolean>(true);

  useEffect(() => {
    if (!scheme) return;
    async function evaluate() {
      setIsLoading(true);
      try {
        const res = await apiService.calculateEligibility(scheme!.id, profile, language);
        setResult(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    evaluate();
  }, [scheme, profile, language]);

  if (!scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white border-l border-slate-200 w-full max-w-xl h-full shadow-2xl flex flex-col animate-slide-left overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
              Personalized Eligibility Analysis
            </div>
            <h2 className="text-lg font-bold text-slate-900 truncate max-w-sm mt-0.5">
              {scheme.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 space-y-3">
              <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-medium">Evaluating official rules against your profile...</p>
            </div>
          ) : result ? (
            <>
              {/* Score & Status Card */}
              <div
                className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  result.status_badge === 'green'
                    ? 'bg-emerald-50/70 border-emerald-200'
                    : result.status_badge === 'yellow'
                    ? 'bg-amber-50/70 border-amber-200'
                    : 'bg-rose-50/70 border-rose-200'
                }`}
              >
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    Assessment Status
                  </div>
                  <EligibilityBadge
                    badge={result.status_badge}
                    statusText={result.status}
                    percentage={result.match_percentage}
                    size="lg"
                  />
                  <p className="text-xs text-slate-600 mt-2 font-medium">{result.summary}</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-slate-200/80 shadow-xs min-w-[90px]">
                  <span className="text-3xl font-black text-slate-900">{result.match_percentage}%</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Match Score</span>
                </div>
              </div>

              {/* Citizen Profile Snapshot */}
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {profile.full_name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900">{profile.full_name}</span>
                    <span className="text-slate-500 ml-1.5">
                      ({profile.age}y, {profile.occupation}, {profile.state})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    setCurrentTab('profile');
                  }}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Edit Profile
                </button>
              </div>

              {/* Criterion Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Transparent Rule-by-Rule Check
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    {result.satisfied_criteria.length} Met • {result.unmet_criteria.length} Unmet
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Satisfied Criteria */}
                  {result.satisfied_criteria.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 bg-emerald-50/50 border border-emerald-200/70 rounded-xl flex items-start gap-3"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-emerald-950 flex items-center justify-between">
                          <span>{c.criterion}</span>
                          <span className="font-mono font-normal text-emerald-800 text-[11px]">
                            {c.citizen_value}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{c.message}</p>
                      </div>
                    </div>
                  ))}

                  {/* Unmet Criteria */}
                  {result.unmet_criteria.map((u, i) => (
                    <div
                      key={i}
                      className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl flex items-start gap-3"
                    >
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <div className="font-bold text-rose-950 flex items-center justify-between">
                          <span>{u.criterion}</span>
                          <span className="font-mono font-normal text-rose-800 text-[11px]">
                            Req: {u.required_value}
                          </span>
                        </div>
                        <p className="text-slate-600 mt-0.5">{u.message}</p>
                      </div>
                    </div>
                  ))}

                  {/* Neutral / Open to all */}
                  {result.neutral_criteria.map((n, i) => (
                    <div
                      key={i}
                      className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3"
                    >
                      <MinusCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <div className="flex-1 text-xs">
                        <div className="font-semibold text-slate-800">{n.criterion}</div>
                        <p className="text-slate-500 mt-0.5">{n.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Missing Documents Warning */}
              {result.missing_documents.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Missing Verification Documents ({result.missing_documents.length})
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    The following required documents are not verified in your profile vault.
                    Upload them to ensure smooth application processing:
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.missing_documents.map((doc, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-white text-amber-900 border border-amber-300 font-medium px-2 py-0.5 rounded-md"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Expandable Why Explanation */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 text-left cursor-pointer transition-colors"
                >
                  <span>Why You Match (Complete Assessment Breakdown)</span>
                  {showWhy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showWhy && (
                  <div className="p-4 text-xs text-slate-700 bg-white space-y-1.5 font-mono whitespace-pre-line leading-relaxed">
                    {result.why_explanation}
                  </div>
                )}
              </div>

              {/* Mandatory Government Disclaimer */}
              <DisclaimerBanner
                sourceDoc={scheme.source_document}
                sourceUrl={scheme.official_url}
              />
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Back
          </button>
          <a
            href={scheme.official_url}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            Apply on Official Portal <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
