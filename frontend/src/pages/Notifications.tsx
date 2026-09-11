import React, { useState } from 'react';
import {
  Bell,
  CheckCheck,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NotificationItem } from '../types';

export const Notifications: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead, setCurrentTab, t } =
    useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n: NotificationItem) => {
    if (filter === 'unread') return !n.is_read;
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'scheme_match':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'deadline':
        return <Clock className="w-5 h-5 text-rose-600" />;
      case 'document_missing':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'status_change':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      default:
        return <Bell className="w-5 h-5 text-slate-600" />;
    }
  };

  const handleAction = (item: NotificationItem) => {
    markNotificationRead(item.id);
    if (item.action_url) {
      if (item.action_url.includes('applications')) setCurrentTab('applications');
      else if (item.action_url.includes('simplify')) setCurrentTab('simplify');
      else if (item.action_url.includes('schemes')) setCurrentTab('schemes');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {t.notifications.title}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time alerts regarding scheme deadlines, profile matches, and application statuses.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.notifications.all}
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                filter === 'unread'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.notifications.unread}
            </button>
          </div>

          <button
            onClick={markAllNotificationsRead}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            {t.notifications.markAllRead}
          </button>
        </div>
      </div>

      {/* Notifications Feed */}
      <div className="space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-2">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-medium">{t.notifications.empty}</p>
          </div>
        ) : (
          filteredNotifications.map((notif: NotificationItem) => (
            <div
              key={notif.id}
              className={`p-5 rounded-2xl border transition-all flex items-start gap-4 ${
                notif.is_read
                  ? 'bg-white border-slate-200 shadow-xs'
                  : 'bg-blue-50/50 border-blue-200 shadow-sm ring-1 ring-blue-400/20'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-100 shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-900">{notif.title}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{notif.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.message}</p>

                <div className="pt-2 flex items-center justify-between">
                  {notif.action_url ? (
                    <button
                      onClick={() => handleAction(notif)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                    >
                      View Details & Respond <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : <div />}

                  {!notif.is_read && (
                    <button
                      onClick={() => markNotificationRead(notif.id)}
                      className="text-[11px] text-slate-400 hover:text-slate-700 cursor-pointer font-medium"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
