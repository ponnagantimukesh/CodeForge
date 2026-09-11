import React, { useState, useEffect, useRef } from 'react';
import {
  Upload,
  FileText,
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Calendar,
  Building2,
  CheckSquare,
  Square,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { GovernmentScheme, EligibilityResult, SampleDoc } from '../types';
import { EligibilityBadge } from '../components/common/EligibilityBadge';
import { DisclaimerBanner } from '../components/common/DisclaimerBanner';

export const SimplifyScheme: React.FC = () => {
  const { t, language, profile } = useApp();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sampleDocs, setSampleDocs] = useState<SampleDoc[]>([]);
  const [selectedSampleId, setSelectedSampleId] = useState<string>('pm-kisan');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [schemeResult, setSchemeResult] = useState<GovernmentScheme | null>(null);
  const [eligibilityResult, setEligibilityResult] = useState<EligibilityResult | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});
  const [showWhy, setShowWhy] = useState<boolean>(true);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const stepsList = [
    t.simplify.steps.uploading,
    t.simplify.steps.reading,
    t.simplify.steps.rules,
    t.simplify.steps.eligibility,
    t.simplify.steps.summary,
    t.simplify.steps.ready,
  ];

  useEffect(() => {
    async function loadSamples() {
      const docs = await apiService.getSampleDocs();
      setSampleDocs(docs);
    }
    loadSamples();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const runSimulationSteps = async (onComplete: () => Promise<void>) => {
    setIsProcessing(true);
    setProcessingStep(0);
    setSchemeResult(null);
    setEligibilityResult(null);

    for (let i = 0; i < stepsList.length; i++) {
      setProcessingStep(i);
      await new Promise((r) => setTimeout(r, 450));
    }

    await onComplete();
    setIsProcessing(false);
  };

  const handleProcessSample = async () => {
    await runSimulationSteps(async () => {
      const res = await apiService.simplifySample(selectedSampleId, language);
      setSchemeResult(res.simplified_scheme);
      const elig = await apiService.calculateEligibility(res.simplified_scheme.id, profile, language);
      setEligibilityResult(elig);
    });
  };

  const handleProcessFile = async () => {
    if (!selectedFile) return;
    await runSimulationSteps(async () => {
      const res = await apiService.simplifyFile(selectedFile, language);
      setSchemeResult(res.simplified_scheme);
      const elig = await apiService.calculateEligibility(res.simplified_scheme.id, profile, language);
      setEligibilityResult(elig);
    });
  };

  const toggleDoc = (docName: string) => {
    setCheckedDocs((prev) => ({ ...prev, [docName]: !prev[docName] }));
  };

  const isProfileDoc = (docName: string) =>
    profile.verified_documents.some(
      (vd: string) =>
        docName.toLowerCase().includes(vd.toLowerCase()) ||
        vd.toLowerCase().includes(docName.toLowerCase())
    );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Title Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          Core Generative AI Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.simplify.title}
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          {t.simplify.subtitle}
        </p>
      </div>

      {/* Upload & Sample Selector Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PDF File Drag & Drop Upload */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center gap-2">
              <Upload className="w-4 h-4 text-blue-600" />
              Upload Government Gazette PDF
            </h3>
            <p className="text-xs text-slate-500 mb-4">{t.simplify.supportedFormats}</p>

            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-blue-500 bg-blue-50/50'
                  : selectedFile
                  ? 'border-emerald-400 bg-emerald-50/20'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-sm text-slate-900 truncate max-w-xs">
                    {selectedFile.name}
                  </span>
                  <span className="text-xs text-slate-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB • PDF Ready
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1 mt-1 font-semibold cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" /> Remove File
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="font-semibold text-sm text-slate-800">{t.simplify.dragDropText}</p>
                  <p className="text-xs text-slate-500">{t.simplify.browseText}</p>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={handleProcessFile}
              disabled={!selectedFile || isProcessing}
              className={`w-full py-3 px-4 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                !selectedFile || isProcessing
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              {t.simplify.generateBtn}
            </button>
          </div>
        </div>

        {/* 1-Click Pre-loaded Official Gazettes */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                1-Click Official Sample Gazettes
              </h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">
                Instant Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">{t.simplify.orSample}</p>

            <div className="space-y-3">
              {sampleDocs.map((doc) => {
                const isSelected = selectedSampleId === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => {
                      setSelectedSampleId(doc.id);
                      setSelectedFile(null);
                    }}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 ring-1 ring-blue-500'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="font-bold text-xs text-slate-900">{doc.title}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {doc.pages} pgs • {doc.size}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">{doc.department}</p>
                    <p className="text-[11px] text-slate-500 mt-1 italic line-clamp-1">
                      "{doc.preview}"
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100">
            <button
              onClick={handleProcessSample}
              disabled={isProcessing}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              ✨ Simplify Selected Gazette
            </button>
          </div>
        </div>
      </div>

      {/* AI Processing Animation Pipeline */}
      {isProcessing && (
        <div className="bg-slate-950 text-white border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl animate-fade-in max-w-3xl mx-auto">
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-400">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
              AI PIPELINE RUNNING
            </div>
            <h3 className="text-xl font-bold">{stepsList[processingStep]}</h3>
            <p className="text-xs text-slate-400">
              Transforming complex administrative jargon into explainable citizen summaries...
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {stepsList.map((stepName, idx) => {
              const isDone = idx < processingStep;
              const isCurrent = idx === processingStep;
              return (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isDone
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300'
                      : isCurrent
                      ? 'bg-blue-900/60 border-blue-500 text-blue-200 ring-2 ring-blue-400/40 animate-pulse'
                      : 'bg-slate-900/40 border-slate-800 text-slate-600'
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold mb-1">
                    0{idx + 1}
                  </div>
                  <div className="text-[11px] font-semibold line-clamp-1">{stepName}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Structured AI-Generated Scheme Summary Result */}
      {schemeResult && !isProcessing && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-md space-y-8 animate-fade-in">
          {/* Header & Department */}
          <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  {schemeResult.category}
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {schemeResult.level} Scheme • {schemeResult.state}
                </span>
                <span className="text-xs font-medium text-slate-500">
                  Source: {schemeResult.source_document}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {schemeResult.name}
              </h2>
              <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1 font-medium">
                <Building2 className="w-4 h-4 text-slate-500" />
                {schemeResult.department}
              </p>
            </div>

            {/* Benefit Pill */}
            <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4 min-w-[240px]">
              <div className="text-[11px] font-bold uppercase text-emerald-900 tracking-wider">
                Direct Citizen Benefit
              </div>
              <p className="text-lg font-extrabold text-emerald-950 mt-0.5">
                {schemeResult.benefit_amount || schemeResult.benefits}
              </p>
            </div>
          </div>

          {/* 1. One-Line Explanation & 2. What is this scheme? */}
          <div className="space-y-4">
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4">
              <span className="text-xs font-bold uppercase text-blue-900 tracking-wider">
                One-Line Summary
              </span>
              <p className="text-sm font-semibold text-blue-950 mt-1">
                {schemeResult.one_line_summary}
              </p>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                {t.simplify.sections.whatIs}
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {schemeResult.simple_summary}
              </p>
            </div>
          </div>

          {/* 3. Who Can Apply vs Who Cannot Apply */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                {t.simplify.sections.whoCan}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {schemeResult.who_can_apply.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/40 border border-rose-200/80 rounded-xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-rose-950 uppercase tracking-wider flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                {t.simplify.sections.whoCannot}
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {schemeResult.who_cannot_apply.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. Structured Conditions Table */}
          {schemeResult.structured_conditions.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                {t.simplify.sections.conditions}
              </h3>
              <div className="border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="p-3.5 w-1/4">Criterion</th>
                      <th className="p-3.5 w-1/3">Requirement</th>
                      <th className="p-3.5">Explanation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-slate-700">
                    {schemeResult.structured_conditions.map((sc: any, idx: number) => (
                      <tr key={idx} className="hover:bg-slate-50/80">
                        <td className="p-3.5 font-bold text-slate-900">{sc.criterion}</td>
                        <td className="p-3.5 font-mono text-blue-900 bg-blue-50/20 font-semibold">
                          {sc.requirement}
                        </td>
                        <td className="p-3.5 text-slate-600 leading-relaxed">{sc.explanation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. Interactive Documents Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                {t.simplify.sections.documents}
              </h3>
              <span className="text-xs text-slate-500">Check off documents you possess</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {schemeResult.required_documents.map((doc: string, idx: number) => {
                const isChecked = checkedDocs[doc] ?? isProfileDoc(doc);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleDoc(doc)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer text-xs ${
                      isChecked
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
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
                      <span className="text-[10px] font-bold bg-emerald-200 text-emerald-900 px-1.5 py-0.5 rounded-md">
                        In Vault
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Step-by-Step How to Apply */}
          {schemeResult.application_steps.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900">
                {t.simplify.sections.howToApply}
              </h3>
              <div className="space-y-3 border-l-2 border-blue-500 pl-4 ml-2">
                {schemeResult.application_steps.map((st: any) => (
                  <div key={st.step_number} className="relative">
                    <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 ring-4 ring-white" />
                    <h5 className="text-xs font-bold text-slate-900">
                      Step {st.step_number}: {st.title}
                    </h5>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Important Dates & Official Links */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>Start Date: {schemeResult.start_date}</span>
              <span>•</span>
              <span>Deadline: {schemeResult.end_date}</span>
            </div>
            <a
              href={schemeResult.official_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-700 hover:underline font-bold inline-flex items-center gap-1"
            >
              Open Official Government Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 8. PERSONALIZED ELIGIBILITY CHECK WITH ACTIVE CITIZEN PROFILE */}
          {eligibilityResult && (
            <div className="border-2 border-blue-200 bg-linear-to-b from-blue-50/40 via-white to-white rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase tracking-wide">
                    Personalized Eligibility Assessment
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                    Your Eligibility for this Scheme
                  </h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Evaluated for: <strong>{profile.full_name}</strong> ({profile.age}y, {profile.occupation}, {profile.state})
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-3xl font-black text-slate-900">
                      {eligibilityResult.match_percentage}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">
                      Match Score
                    </span>
                  </div>
                  <EligibilityBadge
                    badge={eligibilityResult.status_badge}
                    statusText={eligibilityResult.status}
                    size="lg"
                  />
                </div>
              </div>

              {/* Criterion Breakdown */}
              <div className="space-y-2">
                {eligibilityResult.satisfied_criteria.map((sc: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-950 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong>{sc.criterion}:</strong> {sc.message} ({sc.citizen_value})
                    </div>
                  </div>
                ))}

                {eligibilityResult.unmet_criteria.map((uc: any, i: number) => (
                  <div
                    key={i}
                    className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl flex items-start gap-2.5 text-xs text-rose-950 font-medium"
                  >
                    <X className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <strong>{uc.criterion}:</strong> {uc.message} (Required: {uc.required_value})
                    </div>
                  </div>
                ))}

                {/* Strictly Gender-Neutral Criterion display */}
                {eligibilityResult.neutral_criteria.map((nc: any, i: number) => (
                  <div
                    key={i}
                    className="p-2.5 bg-slate-100/70 border border-slate-200 rounded-xl flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    <span className="w-4 h-4 text-slate-400 font-bold flex items-center justify-center shrink-0">
                      —
                    </span>
                    <div className="flex-1">
                      <strong>{nc.criterion}:</strong> {nc.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Missing Documents notice */}
              {eligibilityResult.missing_documents.length > 0 && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Missing Verification Documents:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {eligibilityResult.missing_documents.map((d: string, i: number) => (
                      <span
                        key={i}
                        className="bg-white border border-amber-300 font-medium px-2 py-0.5 rounded-md"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Expandable Why section */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setShowWhy(!showWhy)}
                  className="w-full p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 text-left cursor-pointer transition-colors"
                >
                  <span>Why You Match (Detailed Explainable Engine Output)</span>
                  {showWhy ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {showWhy && (
                  <div className="p-4 text-xs text-slate-700 bg-white font-mono whitespace-pre-line leading-relaxed">
                    {eligibilityResult.why_explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Official Disclaimer */}
          <DisclaimerBanner
            sourceDoc={schemeResult.source_document}
            sourceUrl={schemeResult.official_url}
          />
        </div>
      )}
    </div>
  );
};
