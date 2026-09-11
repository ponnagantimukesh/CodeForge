import React, { useState, useMemo } from 'react';
import {
  Search,
  Building2,
  Calendar,
  FileText,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EligibilityBadge } from '../components/common/EligibilityBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';
import { SchemeMatchItem } from '../types';

export const FindSchemes: React.FC = () => {
  const { matches, t, setActiveSchemeModal, setActiveEligibilityModal } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCitizenGroup, setSelectedCitizenGroup] = useState('All');
  const [sortBy, setSortBy] = useState<'best_match' | 'deadline' | 'benefit' | 'updated'>('best_match');

  const categories = [
    'All',
    'Agriculture',
    'Healthcare',
    'Scholarships',
    'Housing',
    'Social Welfare',
    'Disability Support',
    'Senior Citizens',
  ];

  const levels = ['All', 'Central', 'State'];
  const states = ['All', 'All India', 'Telangana'];
  const citizenGroups = ['All', 'Farmer', 'Student', 'Senior Citizen', 'Disability / Divyangjan'];

  const filteredMatches = useMemo(() => {
    return matches.filter(({ scheme }: SchemeMatchItem) => {
      const q = searchTerm.toLowerCase();
      const matchesQuery =
        !searchTerm ||
        scheme.name.toLowerCase().includes(q) ||
        scheme.department.toLowerCase().includes(q) ||
        scheme.description.toLowerCase().includes(q) ||
        scheme.category.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'All' || scheme.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesLevel = selectedLevel === 'All' || scheme.level.toLowerCase() === selectedLevel.toLowerCase();
      const matchesState = selectedState === 'All' || scheme.state === 'All India' || scheme.state.toLowerCase() === selectedState.toLowerCase();

      let matchesCitizenGroup = true;
      if (selectedCitizenGroup === 'Farmer') matchesCitizenGroup = scheme.eligibility_criteria.farmer_required;
      if (selectedCitizenGroup === 'Student') matchesCitizenGroup = scheme.eligibility_criteria.student_required;
      if (selectedCitizenGroup === 'Senior Citizen') matchesCitizenGroup = scheme.eligibility_criteria.senior_required;
      if (selectedCitizenGroup === 'Disability / Divyangjan') matchesCitizenGroup = scheme.eligibility_criteria.disability_required;

      return matchesQuery && matchesCat && matchesLevel && matchesState && matchesCitizenGroup;
    }).sort((a: SchemeMatchItem, b: SchemeMatchItem) => {
      if (sortBy === 'best_match') {
        return b.eligibility.match_percentage - a.eligibility.match_percentage;
      }
      if (sortBy === 'updated') {
        return b.scheme.last_updated.localeCompare(a.scheme.last_updated);
      }
      if (sortBy === 'deadline') {
        return a.scheme.end_date.localeCompare(b.scheme.end_date);
      }
      if (sortBy === 'benefit') {
        return (b.scheme.benefit_amount || '').localeCompare(a.scheme.benefit_amount || '');
      }
      return 0;
    });
  }, [matches, searchTerm, selectedCategory, selectedLevel, selectedState, selectedCitizenGroup, sortBy]);

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSelectedState('All');
    setSelectedCitizenGroup('All');
    setSortBy('best_match');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Explore Government Schemes
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Discover active Central and State government welfare opportunities matched to your profile.
          </p>
        </div>

        {/* Big Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.findSchemes.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
        </div>

        {/* Filter Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 pt-1">
          {/* Category */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Govt Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-blue-500"
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              State Domicile
            </label>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-blue-500"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Citizen Group */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Citizen Type
            </label>
            <select
              value={selectedCitizenGroup}
              onChange={(e) => setSelectedCitizenGroup(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-blue-500"
            >
              {citizenGroups.map((cg) => (
                <option key={cg} value={cg}>
                  {cg}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-medium text-slate-800 focus:ring-1 focus:ring-blue-500 font-semibold text-blue-900"
            >
              <option value="best_match">Best Match Score</option>
              <option value="updated">Recently Updated</option>
              <option value="deadline">Deadline Soon</option>
              <option value="benefit">Highest Benefit</option>
            </select>
          </div>
        </div>

        {/* Results count & reset */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Showing <strong className="text-slate-900">{filteredMatches.length}</strong> of{' '}
            {matches.length} schemes
          </span>
          <button
            onClick={resetFilters}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" /> Reset Filters
          </button>
        </div>
      </div>

      {/* Scheme Cards Grid */}
      {filteredMatches.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
          <FileText className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">No schemes match your filters</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search query, state, or category selections to find available schemes.
          </p>
          <button
            onClick={resetFilters}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMatches.map(({ scheme, eligibility }: SchemeMatchItem) => (
            <div
              key={scheme.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Category & Badge */}
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

                {/* Title & Dept */}
                <div>
                  <h3
                    onClick={() => setActiveSchemeModal(scheme)}
                    className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {scheme.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 line-clamp-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {scheme.department}
                  </p>
                </div>

                {/* Simple Description */}
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {scheme.one_line_summary || scheme.simple_summary}
                </p>

                {/* Benefit Box */}
                <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                  <span className="text-[10px] font-bold uppercase text-emerald-900 tracking-wider">
                    Official Benefit
                  </span>
                  <p className="text-xs font-bold text-emerald-950 mt-0.5">
                    {scheme.benefit_amount || scheme.benefits}
                  </p>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    {scheme.required_documents.length} Docs
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {scheme.end_date}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 mt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveSchemeModal(scheme)}
                  className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors text-center cursor-pointer"
                >
                  View Details
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
      )}

      {/* Mandatory Disclaimer */}
      <DisclaimerBanner />
    </div>
  );
};
