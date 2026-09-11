import React, { useState } from 'react';
import {
  User,
  MapPin,
  IndianRupee,
  ShieldCheck,
  RefreshCw,
  FileCheck,
  CheckSquare,
  Square,
  Sparkles,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { CitizenProfile } from '../types';

export const Profile: React.FC = () => {
  const { profile, setProfile, refreshMatches, showToast, t } = useApp();

  const [formData, setFormData] = useState<CitizenProfile>({ ...profile });
  const [isSaving, setIsSaving] = useState(false);

  const availableDocs = [
    'Aadhaar Card',
    'Bank Account Passbook',
    'Ration Card / Food Security Card',
    'Land Pattadar Passbook',
    'College Bonafide Certificate',
    'Income Certificate',
    'Caste Certificate (SC/ST/OBC)',
    'Unique Disability ID (UDID) Card',
    'Age Proof Certificate',
    'Degree Certificate',
  ];

  const handleToggleDoc = (doc: string) => {
    setFormData((prev: CitizenProfile) => {
      const exists = prev.verified_documents.includes(doc);
      return {
        ...prev,
        verified_documents: exists
          ? prev.verified_documents.filter((d: string) => d !== doc)
          : [...prev.verified_documents, doc],
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updated = await apiService.updateProfile(formData);
      setProfile(updated);
      showToast('Citizen profile updated successfully!');
      await refreshMatches();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto pb-12">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.profile.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">{t.profile.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={refreshMatches}
            className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-blue-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            {t.profile.recalculateBtn}
          </button>
        </div>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-900">
        <Lock className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Privacy First & Data Minimalist:</span>{' '}
          {t.profile.privacyNotice}
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Personal Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-blue-600" />
            {t.profile.personalInfo}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Age (Years)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
                min={0}
                max={120}
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Gender (Open to All Citizens)
              </label>
              <select
                value={formData.gender}
                onChange={(e: any) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Transgender">Transgender</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Location & Domicile */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="w-4 h-4 text-blue-600" />
            {t.profile.locationInfo}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">State Domicile</label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value="Telangana">Telangana</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Area Type</label>
              <select
                value={formData.area_type}
                onChange={(e: any) => setFormData({ ...formData, area_type: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value="Rural">Rural</option>
                <option value="Urban">Urban</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Economic & Education */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <IndianRupee className="w-4 h-4 text-blue-600" />
            {t.profile.economicInfo}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Annual Family Income (₹ INR)
              </label>
              <input
                type="number"
                value={formData.annual_income}
                onChange={(e) =>
                  setFormData({ ...formData, annual_income: parseFloat(e.target.value) || 0 })
                }
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-mono font-bold focus:ring-1 focus:ring-blue-500"
                step="1000"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Occupation</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Social Category</label>
              <select
                value={formData.social_category}
                onChange={(e: any) => setFormData({ ...formData, social_category: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-900 font-medium focus:ring-1 focus:ring-blue-500"
              >
                <option value="General">General</option>
                <option value="OBC">OBC</option>
                <option value="SC">SC</option>
                <option value="ST">ST</option>
                <option value="EWS">EWS</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Specific Classifications */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            {t.profile.criteriaInfo}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.farmer_status}
                onChange={(e) => setFormData({ ...formData, farmer_status: e.target.checked })}
                className="rounded-sm text-blue-600"
              />
              <span className="font-semibold text-slate-800">Active Farmer</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.student_status}
                onChange={(e) => setFormData({ ...formData, student_status: e.target.checked })}
                className="rounded-sm text-blue-600"
              />
              <span className="font-semibold text-slate-800">Enrolled Student</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.senior_citizen_status || formData.age >= 60}
                onChange={(e) =>
                  setFormData({ ...formData, senior_citizen_status: e.target.checked })
                }
                className="rounded-sm text-blue-600"
              />
              <span className="font-semibold text-slate-800">Senior Citizen (60+)</span>
            </label>

            <label className="flex items-center gap-2 p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.disability_status}
                onChange={(e) =>
                  setFormData({ ...formData, disability_status: e.target.checked })
                }
                className="rounded-sm text-blue-600"
              />
              <span className="font-semibold text-slate-800">Divyangjan (40%+)</span>
            </label>
          </div>
        </div>

        {/* Section 5: Verified Documents Vault */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              {t.profile.verifiedDocs}
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              {formData.verified_documents.length} verified
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {availableDocs.map((doc, idx) => {
              const hasDoc = formData.verified_documents.includes(doc);
              return (
                <button
                  type="button"
                  key={idx}
                  onClick={() => handleToggleDoc(doc)}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                    hasDoc
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {hasDoc ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <span className="truncate">{doc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            {isSaving ? 'Saving Profile...' : t.profile.updateBtn}
          </button>
        </div>
      </form>
    </div>
  );
};
