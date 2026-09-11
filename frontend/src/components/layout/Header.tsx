import React from 'react';
import {
  Menu,
  Globe,
  Mic,
  Bell,
  User,
  Users,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Language } from '../../types';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const {
    currentTab,
    setCurrentTab,
    language,
    setLanguage,
    t,
    profile,
    switchPersona,
    personas,
    unreadNotificationCount,
    setVoiceModalOpen,
    logout,
  } = useApp();

  const getTabTitle = () => {
    switch (currentTab) {
      case 'dashboard':
        return t.nav.dashboard;
      case 'schemes':
        return t.nav.schemes;
      case 'simplify':
        return t.nav.simplify;
      case 'assistant':
        return t.nav.assistant;
      case 'applications':
        return t.nav.applications;
      case 'locker':
        return t.nav.locker;
      case 'notifications':
        return t.nav.notifications;
      case 'profile':
        return t.nav.profile;
      case 'admin':
        return t.nav.admin;
      default:
        return 'CitizenScheme AI';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-xs">
      {/* Left Title & Mobile Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg lg:text-xl font-bold text-slate-900 tracking-tight">
              {getTabTitle()}
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Verified Govt Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 hidden md:block">
            {t.brandTagline}
          </p>
        </div>
      </div>

      {/* Right Controls: Persona Switcher, Voice Assistant, Language Switcher, Notifications */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Hackathon Demo Persona Switcher */}
        <div className="relative hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-lg p-1">
          <Users className="w-4 h-4 text-slate-500 ml-1.5 mr-1" />
          <span className="text-xs font-semibold text-slate-600 mr-1.5">Persona:</span>
          <select
            value={profile.id}
            onChange={(e) => switchPersona(e.target.value)}
            className="text-xs font-medium text-slate-800 bg-white border border-slate-200 rounded-md px-2 py-1 focus:outline-hidden focus:ring-1 focus:ring-blue-500 cursor-pointer shadow-xs"
          >
            {Object.entries(personas).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Voice Assistant Trigger */}
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white text-xs font-semibold shadow-xs hover:from-blue-700 hover:to-indigo-700 transition-all cursor-pointer"
          title="Open Voice Assistant"
        >
          <Mic className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">Voice Assistant</span>
        </button>

        {/* Language Switcher */}
        <div className="flex items-center bg-slate-100 border border-slate-200 rounded-lg p-0.5">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-1.5 mr-1" />
          {(['en', 'te', 'hi'] as Language[]).map((lang) => {
            const labels: Record<Language, string> = {
              en: 'EN',
              te: 'తెలుగు',
              hi: 'हिन्दी',
            };
            const isSelected = language === lang;
            return (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-xs font-medium px-2 py-1 rounded-md transition-all ${
                  isSelected
                    ? 'bg-white text-blue-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labels[lang]}
              </button>
            );
          })}
        </div>

        {/* Notification Bell */}
        <button
          onClick={() => setCurrentTab('notifications')}
          className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-bounce">
              {unreadNotificationCount}
            </span>
          )}
        </button>

        {/* Profile Pill */}
        <button
          onClick={() => setCurrentTab('profile')}
          className="flex items-center gap-2 pl-2 pr-2.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
            {profile.full_name.charAt(0)}
          </div>
          <span className="text-xs font-semibold text-slate-800 hidden xl:inline">
            {profile.full_name.split(' ')[0]}
          </span>
        </button>

        {/* Logout Button */}
        <button
          onClick={logout}
          title={t.auth.logoutBtn}
          className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
          aria-label={t.auth.logoutBtn}
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
