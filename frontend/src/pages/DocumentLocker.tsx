import React, { useState } from 'react';
import {
  FolderLock,
  ShieldCheck,
  Upload,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  FileText,
  Trash2,
  Eye,
  Download,
  AlertCircle,
  Plus,
  X,
  FileCheck,
  Lock,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LockerDocument } from '../types';

export const DocumentLocker: React.FC = () => {
  const { lockerDocuments, uploadLockerDoc, deleteLockerDoc, syncDigiLocker, t, setCurrentTab } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<LockerDocument | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state for new document upload
  const [formData, setFormData] = useState({
    name: '',
    category: 'Identity Proof',
    document_number: '',
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    'All',
    'Identity Proof',
    'Land & Agriculture',
    'Income & Finance',
    'Education',
    'Social Category',
    'Health & Disability',
  ];

  const filteredDocs = lockerDocuments.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (doc.document_number && doc.document_number.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const verifiedCount = lockerDocuments.filter(
    (d) => d.verification_status === 'Verified' || d.source.toLowerCase().includes('digilocker')
  ).length;

  const totalSchemesCovered = Array.from(
    new Set(lockerDocuments.flatMap((d) => d.matched_schemes || []))
  ).length;

  const handleSyncDigiLocker = async () => {
    setIsSyncing(true);
    try {
      await syncDigiLocker();
    } finally {
      setIsSyncing(false);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setIsSubmitting(true);
    try {
      const fileName = formData.file
        ? formData.file.name
        : `${formData.name.toLowerCase().replace(/\s+/g, '_')}_document.pdf`;
      const fileSize = formData.file
        ? `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`
        : '1.2 MB';

      await uploadLockerDoc({
        name: formData.name.trim(),
        category: formData.category,
        document_number: formData.document_number.trim() || undefined,
        file_name: fileName,
        file_size: fileSize,
      });

      setFormData({
        name: '',
        category: 'Identity Proof',
        document_number: '',
        file: null,
      });
      setIsUploadModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusBadge = (status: string, source: string) => {
    if (status === 'Verified' || source.includes('DigiLocker')) {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          {t.locker.verifiedBadge}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
        <Clock className="w-3.5 h-3.5 text-amber-600" />
        {t.locker.pendingBadge}
      </span>
    );
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Identity Proof':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Land & Agriculture':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Income & Finance':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Education':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Social Category':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'Health & Disability':
        return 'bg-teal-50 text-teal-700 border-teal-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Hero */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 md:p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-medium">
              <Lock className="w-3.5 h-3.5" />
              <span>{t.locker.digilockerSyncNotice}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
              <FolderLock className="w-8 h-8 text-blue-400" />
              {t.locker.title}
            </h1>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {t.locker.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleSyncDigiLocker}
              disabled={isSyncing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-900/30 disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              {isSyncing ? t.locker.syncing : t.locker.syncDigiLocker}
            </button>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-900/30 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              {t.locker.uploadDoc}
            </button>
          </div>
        </div>

        {/* Live Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-3.5 border border-slate-700/60">
            <div className="text-slate-400 text-xs font-medium">{t.locker.totalDocs}</div>
            <div className="text-2xl font-black text-white mt-1">{lockerDocuments.length}</div>
            <div className="text-[11px] text-blue-400 mt-0.5">Encrypted Vault</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-3.5 border border-slate-700/60">
            <div className="text-slate-400 text-xs font-medium">{t.locker.verifiedDocs}</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">{verifiedCount}</div>
            <div className="text-[11px] text-emerald-400/80 mt-0.5">Govt Authenticated</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-3.5 border border-slate-700/60">
            <div className="text-slate-400 text-xs font-medium">{t.locker.schemesCovered}</div>
            <div className="text-2xl font-black text-amber-400 mt-1">{totalSchemesCovered}</div>
            <div className="text-[11px] text-amber-400/80 mt-0.5">Active Eligibility Boost</div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-xs rounded-xl p-3.5 border border-slate-700/60">
            <div className="text-slate-400 text-xs font-medium">{t.locker.storageUsed}</div>
            <div className="text-2xl font-black text-white mt-1">6.6 MB</div>
            <div className="text-[11px] text-slate-400 mt-0.5">of 1 GB Free Quota</div>
          </div>
        </div>
      </div>

      {/* Cross-Scheme Benefit Info Callout */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-slate-700 shadow-xs">
        <Sparkles className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs md:text-sm space-y-1">
          <span className="font-semibold text-blue-950">
            Universal Eligibility Synergy:
          </span>{' '}
          Documents saved here automatically satisfy required criteria across all government schemes. For example, your verified <strong>Land Pattadar Passbook</strong> and <strong>Aadhaar Card</strong> instantly upgrade your eligibility for PM-KISAN, Rythu Bharosa, and Ayushman Bharat.
          <div className="mt-1">
            <button
              onClick={() => setCurrentTab('schemes')}
              className="text-blue-700 hover:text-blue-900 font-semibold underline inline-flex items-center gap-1 cursor-pointer"
            >
              View updated scheme matches <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.locker.searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'All' ? t.locker.allCategories : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Cards Grid */}
      {filteredDocs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
            <FolderLock className="w-7 h-7" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base">No documents found</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1 mb-5">
            {t.locker.emptyState}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={handleSyncDigiLocker}
              className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-semibold hover:bg-emerald-500 cursor-pointer"
            >
              {t.locker.syncDigiLocker}
            </button>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-500 cursor-pointer"
            >
              {t.locker.uploadDoc}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-blue-400/60 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header: Category & Verification */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                      doc.category
                    )}`}
                  >
                    {doc.category}
                  </span>
                  {getStatusBadge(doc.verification_status, doc.source)}
                </div>

                {/* Document Name */}
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900 text-base leading-tight truncate">
                      {doc.name}
                    </h3>
                    {doc.document_number && (
                      <p className="text-xs font-mono text-slate-500 mt-0.5">
                        ID: {doc.document_number}
                      </p>
                    )}
                  </div>
                </div>

                {/* Metadata Details */}
                <div className="space-y-1.5 my-3.5 text-xs text-slate-600 bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <div className="flex justify-between">
                    <span className="text-slate-400">File:</span>
                    <span className="font-mono text-slate-700 truncate max-w-[180px]">
                      {doc.file_name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Size & Date:</span>
                    <span className="text-slate-700">
                      {doc.file_size} • {doc.uploaded_at}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Source:</span>
                    <span className="font-medium text-slate-800">{doc.source}</span>
                  </div>
                </div>

                {/* Matched Schemes Tags */}
                {doc.matched_schemes && doc.matched_schemes.length > 0 && (
                  <div className="mb-4">
                    <span className="text-[11px] font-medium text-slate-500 block mb-1.5">
                      {t.locker.acceptedIn}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.matched_schemes.map((schemeName, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-md font-medium"
                        >
                          {schemeName}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setPreviewDoc(doc)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  {t.locker.viewDoc}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    title={t.locker.downloadDoc}
                    className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setDeleteConfirmId(doc.id)}
                    title={t.locker.deleteDoc}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Upload className="w-5 h-5 text-blue-600" />
                {t.locker.uploadModalTitle}
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.locker.docNameLabel} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Caste Certificate, Income Certificate, Driving License"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.locker.categoryLabel}
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 bg-white"
                  >
                    {categories
                      .filter((c) => c !== 'All')
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.locker.docNumberLabel}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. TS-2026-9018"
                    value={formData.document_number}
                    onChange={(e) => setFormData({ ...formData, document_number: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.locker.selectFile}
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    id="locker-file-input"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setFormData({ ...formData, file: e.target.files[0] });
                      }
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor="locker-file-input"
                    className="cursor-pointer flex flex-col items-center gap-1.5"
                  >
                    <FileCheck className="w-8 h-8 text-blue-500" />
                    <span className="text-xs font-semibold text-slate-700">
                      {formData.file ? formData.file.name : 'Click to select document file'}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {formData.file
                        ? `${(formData.file.size / 1024).toFixed(0)} KB selected`
                        : 'PDF, PNG, JPG up to 10MB'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  {t.common.close}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.name.trim()}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 cursor-pointer shadow-md shadow-blue-900/20"
                >
                  {isSubmitting ? t.common.loading : t.locker.uploadDoc}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{previewDoc.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{previewDoc.document_number}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Certificate Preview Card with Security Watermark */}
            <div className="my-5 p-6 rounded-xl border-2 border-slate-300 bg-linear-to-b from-amber-50/40 via-white to-blue-50/30 relative overflow-hidden text-center space-y-4">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <ShieldCheck className="w-64 h-64 text-slate-900" />
              </div>

              <div className="space-y-1">
                <div className="text-[11px] uppercase tracking-widest text-slate-500 font-semibold">
                  Official Citizen Record
                </div>
                <h2 className="text-xl font-bold text-slate-900">{previewDoc.name}</h2>
                <div className="text-xs text-slate-600 font-medium">
                  Issued under Government of India & State Department Guidelines
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-left text-xs bg-white/80 backdrop-blur-xs rounded-xl p-3.5 border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Certificate / ID:</span>
                  <span className="font-mono font-semibold text-slate-800">
                    {previewDoc.document_number || 'REG-AUTHENTICATED'}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Category:</span>
                  <span className="font-semibold text-slate-800">{previewDoc.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Verification Source:</span>
                  <span className="font-semibold text-emerald-700">{previewDoc.source}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status:</span>
                  <span className="font-semibold text-emerald-700">
                    {previewDoc.verification_status}
                  </span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-slate-400 font-mono">
                SHA-256 Digital Vault Hash: a7f8c92e104b...64d1
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                {previewDoc.file_name} ({previewDoc.file_size})
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 cursor-pointer"
                >
                  {t.common.close}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-center text-base">
              {t.locker.deleteDoc}
            </h3>
            <p className="text-slate-600 text-xs text-center mt-1 mb-5">
              {t.locker.deleteConfirm}
            </p>
            <div className="flex gap-2.5">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                {t.common.close}
              </button>
              <button
                onClick={async () => {
                  await deleteLockerDoc(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 text-white text-xs font-semibold hover:bg-rose-500 cursor-pointer"
              >
                {t.locker.deleteDoc}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
