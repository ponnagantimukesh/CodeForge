import React, { useState } from 'react';
import {
  FolderCheck,
  Clock,
  CheckCircle,
  AlertTriangle,
  Upload,
  ExternalLink,
  Building2,
  Calendar,
  FileText,
  Info,
  X,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApplicationItem } from '../types';

export const Applications: React.FC = () => {
  const { applications, uploadMissingDoc, t } = useApp();

  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);
  const [uploadDocModal, setUploadDocModal] = useState<{
    app: ApplicationItem;
    docName: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const timelineSteps = [
    t.applications.timeline.step1,
    t.applications.timeline.step2,
    t.applications.timeline.step3,
    t.applications.timeline.step4,
    t.applications.timeline.step5,
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Under Review':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Documents Required':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Rejected':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleUploadSubmit = async () => {
    if (!uploadDocModal) return;
    setIsUploading(true);
    await new Promise((r) => setTimeout(r, 600));
    await uploadMissingDoc(uploadDocModal.app.id, uploadDocModal.docName);
    setIsUploading(false);
    setUploadDocModal(null);
    setSelectedFile(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              {t.applications.title}
            </h1>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full uppercase">
              {t.applications.mockBadge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">{t.applications.subtitle}</p>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>Updates synced with state Direct Benefit Transfer (DBT) portals</span>
        </div>
      </div>

      {/* Applications Cards Grid */}
      <div className="space-y-5">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5 hover:shadow-md transition-all"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
                    {app.application_number}
                  </span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                      app.status
                    )}`}
                  >
                    {app.status}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-slate-900 mt-1.5">{app.scheme_name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  {app.department}
                </p>
              </div>

              <div className="text-left sm:text-right text-xs text-slate-500 space-y-0.5">
                <div>Applied: {app.applied_date}</div>
                <div>Last Updated: {app.last_update}</div>
              </div>
            </div>

            {/* 5-Stage Visual Progress Timeline */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Application Pipeline
              </div>
              <div className="grid grid-cols-5 gap-1 sm:gap-2">
                {timelineSteps.map((step, idx) => {
                  const isComplete = idx <= app.current_step_index;
                  const isCurrent = idx === app.current_step_index;
                  return (
                    <div key={idx} className="space-y-1 text-center">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          isComplete
                            ? 'bg-emerald-600'
                            : 'bg-slate-200'
                        } ${isCurrent ? 'ring-2 ring-emerald-400 animate-pulse' : ''}`}
                      />
                      <span
                        className={`block text-[10px] font-medium leading-tight line-clamp-1 ${
                          isComplete ? 'text-slate-900 font-bold' : 'text-slate-400'
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Remarks / Missing Documents Alert */}
            {app.remarks && (
              <div
                className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${
                  app.missing_documents.length > 0
                    ? 'bg-amber-50 border-amber-200 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                {app.missing_documents.length > 0 ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <strong>Official Status Remark:</strong> {app.remarks}
                </div>
              </div>
            )}

            {/* Missing Documents Action Buttons */}
            {app.missing_documents.length > 0 && (
              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-xl space-y-3">
                <div className="text-xs font-bold text-amber-900 flex items-center justify-between">
                  <span>Action Required: Upload Verification Documents</span>
                  <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-md">
                    {app.missing_documents.length} pending
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {app.missing_documents.map((docName, idx) => (
                    <button
                      key={idx}
                      onClick={() => setUploadDocModal({ app, docName })}
                      className="px-3 py-1.5 bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                    >
                      <Upload className="w-3.5 h-3.5 text-amber-700" />
                      Upload {docName}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <a
                href={app.official_portal_url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                {t.applications.openPortal} <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedApp(app)}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
                >
                  View Details & Audit Trail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Missing Document Modal */}
      {uploadDocModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Upload className="w-4 h-4 text-blue-600" />
                Upload Missing Document
              </h3>
              <button
                onClick={() => setUploadDocModal(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-slate-600">
                Uploading required document for <strong>{uploadDocModal.app.scheme_name}</strong>:
              </p>
              <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg text-xs font-bold text-blue-900">
                {uploadDocModal.docName}
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center cursor-pointer hover:border-blue-500">
              <input
                type="file"
                onChange={(e) => e.target.files && setSelectedFile(e.target.files[0])}
                className="text-xs"
              />
              {selectedFile && (
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  Ready: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setUploadDocModal(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadSubmit}
                disabled={isUploading}
                className="px-4 py-2 text-xs font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-1.5 cursor-pointer"
              >
                {isUploading ? 'Uploading...' : 'Confirm Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Audit Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-base text-slate-900">Application Audit Trail</h3>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p><strong>Application Number:</strong> {selectedApp.application_number}</p>
              <p><strong>Scheme:</strong> {selectedApp.scheme_name}</p>
              <p><strong>Department:</strong> {selectedApp.department}</p>
              <p><strong>Applied Date:</strong> {selectedApp.applied_date}</p>
              <p><strong>Last Status Update:</strong> {selectedApp.last_update}</p>
              <p><strong>Current Status:</strong> {selectedApp.status}</p>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <strong>Officer Remarks:</strong> {selectedApp.remarks || 'Under routine processing.'}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 bg-slate-800 text-white text-xs font-semibold rounded-lg cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
