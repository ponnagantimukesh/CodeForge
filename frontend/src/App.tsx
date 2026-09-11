import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { VoiceModal } from './components/voice/VoiceModal';
import { SchemeDetailsModal } from './components/common/SchemeDetailsModal';
import { EligibilityDrawer } from './components/common/EligibilityDrawer';

// Pages
import { Dashboard } from './pages/Dashboard';
import { FindSchemes } from './pages/FindSchemes';
import { SimplifyScheme } from './pages/SimplifyScheme';
import { Assistant } from './pages/Assistant';
import { Applications } from './pages/Applications';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { AdminPanel } from './pages/AdminPanel';
import { DocumentLocker } from './pages/DocumentLocker';
import { LoginPage } from './pages/LoginPage';

import { CheckCircle2, Shield, HeartHandshake, ExternalLink } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    isAuthenticated,
    currentTab,
    activeSchemeModal,
    setActiveSchemeModal,
    activeEligibilityModal,
    setActiveEligibilityModal,
    toast,
    t,
  } = useApp();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActivePage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'schemes':
        return <FindSchemes />;
      case 'simplify':
        return <SimplifyScheme />;
      case 'assistant':
        return <Assistant />;
      case 'applications':
        return <Applications />;
      case 'locker':
        return <DocumentLocker />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <LoginPage />
        {toast && (
          <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
            <div className="bg-slate-900 text-white border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{toast}</span>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col font-sans text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Main Content Area (offset by 18rem on desktop) */}
      <div className="lg:pl-72 flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onOpenSidebar={() => setIsSidebarOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>

        {/* Official Government Aesthetic Footer */}
        <footer className="border-t border-slate-200/90 bg-white py-6 px-4 lg:px-8 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
              <span className="font-semibold text-slate-700">CitizenScheme AI</span>
              <span>•</span>
              <span>National Welfare Assistance Platform</span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-500">
              <span>Universal & Gender-Neutral</span>
              <span>•</span>
              <span>Explainable Rule Engine</span>
              <span>•</span>
              <span>No Hallucinations Guarantee</span>
              <span>•</span>
              <span className="font-mono text-slate-400">EN • TE • HI</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Voice Assistant Modal Overlay */}
      <VoiceModal />

      {/* Scheme Detailed Guidelines Modal */}
      <SchemeDetailsModal
        scheme={activeSchemeModal}
        onClose={() => setActiveSchemeModal(null)}
        onCheckEligibility={(scheme) => setActiveEligibilityModal(scheme)}
      />

      {/* Explainable Eligibility Result Drawer */}
      <EligibilityDrawer
        scheme={activeEligibilityModal}
        onClose={() => setActiveEligibilityModal(null)}
      />

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
          <div className="bg-slate-950 text-white border border-slate-700 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
