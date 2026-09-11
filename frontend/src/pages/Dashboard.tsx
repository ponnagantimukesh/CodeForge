import React from 'react';
import {
  FileText,
  Search,
  FolderLock,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck,
  Award,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Building2,
  Calendar,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EligibilityBadge } from '../components/common/EligibilityBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { SchemeMatchItem } from '../types';

export const Dashboard: React.FC = () => {
  const {
    t,
    matches,
    applications,
    setCurrentTab,
    setActiveSchemeModal,
    setActiveEligibilityModal,
    profile,
  } = useApp();

  // Statistics calculation
  const totalMatched = matches.length;
  const highlyEligible = matches.filter((m: SchemeMatchItem) => m.eligibility.match_percentage >= 80).length;
  const activeApps = applications.filter((a: any) => a.status !== 'Approved' && a.status !== 'Completed').length;
  const missingDocsCount = matches.reduce(
    (acc: number, m: SchemeMatchItem) => acc + (m.eligibility.missing_documents?.length || 0),
    0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero Banner with Government Emblem Accent */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            AI-Powered Citizen Scheme Intelligence
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {t.dashboard.heroTitle}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
            {t.dashboard.heroSubtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3.5">
            <button
              onClick={() => setCurrentTab('schemes')}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              {t.dashboard.findSchemesBtn}
            </button>

            <button
              onClick={() => setCurrentTab('simplify')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              {t.dashboard.uploadDocBtn}
            </button>

            <button
              onClick={() => setCurrentTab('locker')}
              className="px-5 py-3 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <FolderLock className="w-4 h-4 text-emerald-200" />
              {t.nav.locker}
            </button>
          </div>
        </div>

        {/* Current Citizen Persona Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Viewing recommendations for:</span>
            <span className="font-bold text-white bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-md">
              {profile.full_name} ({profile.age}y, {profile.occupation})
            </span>
          </div>
          <button
            onClick={() => setCurrentTab('profile')}
            className="text-blue-400 hover:text-blue-300 font-semibold underline cursor-pointer"
          >
            Switch Profile Details →
          </button>
        </div>
      </div>

      {/* Dashboard Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t.dashboard.matchedCount}
            </p>
            <h3 className="text-3xl font-extrabold text-slate-900 mt-1">{totalMatched}</h3>
            <span className="text-[11px] text-emerald-600 font-medium">Verified criteria</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <FileCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t.dashboard.eligibleCount}
            </p>
            <h3 className="text-3xl font-extrabold text-emerald-700 mt-1">{highlyEligible}</h3>
            <span className="text-[11px] text-emerald-600 font-medium">≥80% match score</span>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t.dashboard.activeAppsCount}
            </p>
            <h3 className="text-3xl font-extrabold text-blue-700 mt-1">{activeApps}</h3>
            <span className="text-[11px] text-blue-600 font-medium">Under review</span>
          </div>
          <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {t.dashboard.missingDocsCount}
            </p>
            <h3 className="text-3xl font-extrabold text-amber-700 mt-1">{missingDocsCount}</h3>
            <span className="text-[11px] text-amber-600 font-medium">Pending upload</span>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 text-amber-600">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Top Matches Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              {t.dashboard.topMatchesTitle}
            </h2>
            <p className="text-xs text-slate-500">{t.dashboard.topMatchesSubtitle}</p>
          </div>
          <button
            onClick={() => setCurrentTab('schemes')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 inline-flex items-center gap-1 cursor-pointer"
          >
            View All ({matches.length}) Schemes <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scheme Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {matches.slice(0, 6).map(({ scheme, eligibility }: SchemeMatchItem) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                {/* Header Tag & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                    {scheme.category}
                  </span>
                  <EligibilityBadge
                    badge={eligibility.status_badge}
                    percentage={eligibility.match_percentage}
                    size="sm"
                  />
                </div>

                {/* Scheme Title & Dept */}
                <div>
                  <h3
                    onClick={() => setActiveSchemeModal(scheme)}
                    className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {scheme.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 line-clamp-1">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                    {scheme.department}
                  </p>
                </div>

                {/* AI Summary */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {scheme.one_line_summary || scheme.simple_summary}
                </p>

                {/* Benefit Highlight */}
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase text-emerald-900 tracking-wider">
                    Main Benefit
                  </span>
                  <p className="text-xs font-bold text-emerald-950 mt-0.5">
                    {scheme.benefit_amount || scheme.benefits}
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    {scheme.required_documents.length} Docs required
                  </span>
                  {scheme.end_date && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {scheme.end_date}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveSchemeModal(scheme)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
                >
                  {t.dashboard.viewDetails}
                </button>
                <button
                  onClick={() => setActiveEligibilityModal(scheme)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Check Why
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
