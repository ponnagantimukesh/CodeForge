import React from 'react';
import {
  LayoutDashboard,
  Search,
  FileText,
  Bot,
  FolderCheck,
  FolderLock,
  Bell,
  UserCheck,
  Shield,
  X,
  Sparkles,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentTab, setCurrentTab, t, unreadNotificationCount, profile, logout } = useApp();

  const navItems: Array<{
    id: NavigationTab;
    label: string;
    icon: React.ElementType;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'schemes', label: t.nav.schemes, icon: Search },
    { id: 'simplify', label: t.nav.simplify, icon: FileText, badge: 'CORE', badgeColor: 'bg-amber-500 text-slate-950 font-bold' },
    { id: 'assistant', label: t.nav.assistant, icon: Bot, badge: 'AI', badgeColor: 'bg-blue-600 text-white' },
    { id: 'applications', label: t.nav.applications, icon: FolderCheck },
    { id: 'locker', label: t.nav.locker, icon: FolderLock, badge: 'VAULT', badgeColor: 'bg-emerald-600 text-white font-bold' },
    {
      id: 'notifications',
      label: t.nav.notifications,
      icon: Bell,
      badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    { id: 'profile', label: t.nav.profile, icon: UserCheck },
    { id: 'admin', label: t.nav.admin, icon: Shield },
  ];

  const handleSelect = (tab: NavigationTab) => {
    setCurrentTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* National Tiranga Accent Stripe */}
        <div className="h-1.5 w-full flex">
          <div className="h-full w-1/3 bg-amber-500" />
          <div className="h-full w-1/3 bg-white" />
          <div className="h-full w-1/3 bg-emerald-600" />
        </div>

        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-900/30 border border-blue-400/20">
              CS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-white text-base tracking-tight">CitizenScheme</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-400/30 px-1.5 py-0.5 rounded-md font-mono">AI</span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium tracking-wide">
                Universal Welfare Assistant
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.badgeColor || 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Active Citizen Pill */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-700/60 border border-emerald-400/30 text-white font-bold flex items-center justify-center text-sm">
              {profile.full_name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-100 truncate">{profile.full_name}</p>
              <p className="text-[11px] text-slate-400 truncate">
                {profile.occupation} • {profile.state}
              </p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Verified DigiLocker
            </span>
            <span className="text-slate-400">{profile.verified_documents.length} Docs</span>
          </div>

          <button
            onClick={() => {
              onClose();
              logout();
            }}
            className="w-full mt-3 py-1.5 px-3 rounded-lg bg-slate-800/80 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-700/60 hover:border-rose-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{t.auth.logoutBtn}</span>
          </button>
        </div>
      </aside>
    </>
  );
};
