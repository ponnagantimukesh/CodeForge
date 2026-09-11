import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  CitizenProfile,
  GovernmentScheme,
  SchemeMatchItem,
  ApplicationItem,
  NotificationItem,
  NavigationTab,
  Language,
  LockerDocument,
} from '../types';
import { translations, TranslationDict } from '../i18n/translations';
import { apiService, DEFAULT_PROFILE, PRESET_PERSONAS } from '../services/api';

interface AppContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDict;
  profile: CitizenProfile;
  setProfile: (profile: CitizenProfile) => void;
  switchPersona: (personaId: string) => void;
  personas: typeof PRESET_PERSONAS;
  schemes: GovernmentScheme[];
  matches: SchemeMatchItem[];
  applications: ApplicationItem[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  uploadMissingDoc: (appId: string, docName: string) => Promise<void>;
  refreshMatches: () => Promise<void>;
  lockerDocuments: LockerDocument[];
  uploadLockerDoc: (doc: {
    name: string;
    category: string;
    document_number?: string;
    file_name?: string;
    file_size?: string;
  }) => Promise<void>;
  deleteLockerDoc: (docId: string) => Promise<void>;
  syncDigiLocker: () => Promise<void>;
  isLoading: boolean;
  isVoiceModalOpen: boolean;
  setVoiceModalOpen: (open: boolean) => void;
  activeSchemeModal: GovernmentScheme | null;
  setActiveSchemeModal: (scheme: GovernmentScheme | null) => void;
  activeEligibilityModal: GovernmentScheme | null;
  setActiveEligibilityModal: (scheme: GovernmentScheme | null) => void;
  toast: string | null;
  showToast: (msg: string) => void;
  isAuthenticated: boolean;
  login: (personaId?: string, identifier?: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('cs_authenticated') === 'true';
  });
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [language, setLanguage] = useState<Language>('en');
  const [profile, setProfile] = useState<CitizenProfile>(() => {
    const savedPersona = localStorage.getItem('cs_active_persona');
    if (savedPersona && PRESET_PERSONAS[savedPersona]) {
      return PRESET_PERSONAS[savedPersona].profile;
    }
    return DEFAULT_PROFILE;
  });
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  const [matches, setMatches] = useState<SchemeMatchItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [lockerDocuments, setLockerDocuments] = useState<LockerDocument[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVoiceModalOpen, setVoiceModalOpen] = useState<boolean>(false);
  const [activeSchemeModal, setActiveSchemeModal] = useState<GovernmentScheme | null>(null);
  const [activeEligibilityModal, setActiveEligibilityModal] = useState<GovernmentScheme | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const t = translations[language];

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Initial Data Fetch
  useEffect(() => {
    async function initData() {
      setIsLoading(true);
      try {
        const [fetchedProfile, fetchedSchemes, fetchedApps, fetchedNotifs, fetchedLocker] = await Promise.all([
          apiService.getProfile(),
          apiService.getSchemes(),
          apiService.getApplications(),
          apiService.getNotifications(),
          apiService.getLockerDocuments(),
        ]);
        setProfile(fetchedProfile);
        setSchemes(fetchedSchemes);
        setApplications(fetchedApps);
        setNotifications(fetchedNotifs);
        setLockerDocuments(fetchedLocker);

        const calculatedMatches = await apiService.getAllMatches(fetchedProfile, language);
        setMatches(calculatedMatches);
      } catch (err) {
        console.error('Initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    }
    initData();
  }, []);

  // Recalculate matches when profile or language changes
  useEffect(() => {
    async function reevaluate() {
      const updatedMatches = await apiService.getAllMatches(profile, language);
      setMatches(updatedMatches);
    }
    reevaluate();
  }, [profile, language]);

  const login = (personaId?: string, identifier?: string) => {
    let activeName = profile.full_name;
    if (personaId && PRESET_PERSONAS[personaId]) {
      const selected = { ...PRESET_PERSONAS[personaId].profile };
      setProfile(selected);
      activeName = selected.full_name;
      localStorage.setItem('cs_active_persona', personaId);
    } else if (identifier) {
      localStorage.setItem('cs_active_identifier', identifier);
    }
    setIsAuthenticated(true);
    localStorage.setItem('cs_authenticated', 'true');
    showToast(`${t.auth.welcomeBack}, ${activeName}!`);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('cs_authenticated');
    showToast(t.auth.loggedOutMsg);
  };

  const switchPersona = (personaId: string) => {
    if (PRESET_PERSONAS[personaId]) {
      const newProf = { ...PRESET_PERSONAS[personaId].profile };
      setProfile(newProf);
      localStorage.setItem('cs_active_persona', personaId);
      showToast(`Switched citizen profile to: ${newProf.full_name} (${newProf.occupation})`);
    }
  };

  const refreshMatches = async () => {
    setIsLoading(true);
    const updated = await apiService.getAllMatches(profile, language);
    setMatches(updated);
    setIsLoading(false);
    showToast(t.common.success);
  };

  const markNotificationRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    await apiService.markNotificationRead(id);
  };

  const markAllNotificationsRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await apiService.markAllNotificationsRead();
    showToast('All notifications marked as read.');
  };

  const uploadMissingDoc = async (appId: string, docName: string) => {
    await apiService.uploadMissingDoc(appId, docName);
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          const remaining = app.missing_documents.filter((d) => d !== docName);
          const isComplete = remaining.length === 0;
          return {
            ...app,
            missing_documents: remaining,
            status: isComplete && app.status === 'Documents Required' ? 'Under Review' : app.status,
            current_step_index: isComplete && app.current_step_index === 1 ? 2 : app.current_step_index,
            remarks: isComplete ? 'All documents uploaded successfully. Verification underway.' : app.remarks,
          };
        }
        return app;
      })
    );
    showToast(`Uploaded ${docName} successfully! Application status updated.`);
  };

  const uploadLockerDoc = async (doc: {
    name: string;
    category: string;
    document_number?: string;
    file_name?: string;
    file_size?: string;
  }) => {
    setIsLoading(true);
    try {
      const newDoc = await apiService.uploadLockerDocument(doc);
      setLockerDocuments((prev) => [newDoc, ...prev]);
      if (!profile.verified_documents.includes(doc.name)) {
        const updatedVerified = [...profile.verified_documents, doc.name];
        setProfile({ ...profile, verified_documents: updatedVerified });
      }
      showToast(t.locker.uploadSuccess);
    } catch (err) {
      console.error('Error uploading locker document:', err);
      showToast('Failed to upload document to locker.');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteLockerDoc = async (docId: string) => {
    const target = lockerDocuments.find((d) => d.id === docId);
    await apiService.deleteLockerDocument(docId);
    setLockerDocuments((prev) => prev.filter((d) => d.id !== docId));
    if (target && profile.verified_documents.includes(target.name)) {
      const updatedVerified = profile.verified_documents.filter((d) => d !== target.name);
      setProfile({ ...profile, verified_documents: updatedVerified });
    }
    showToast(t.locker.deleteSuccess);
  };

  const syncDigiLocker = async () => {
    setIsLoading(true);
    try {
      await apiService.syncDigiLocker();
      const updatedDocs = await apiService.getLockerDocuments();
      setLockerDocuments(updatedDocs);
      const allDocNames = Array.from(
        new Set([...profile.verified_documents, ...updatedDocs.map((d) => d.name)])
      );
      setProfile({ ...profile, verified_documents: allDocNames });
      showToast(t.locker.syncSuccess);
    } catch (err) {
      console.error('DigiLocker sync failed:', err);
      showToast('DigiLocker sync failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const unreadNotificationCount = notifications.filter((n) => !n.is_read).length;

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        language,
        setLanguage,
        t,
        profile,
        setProfile,
        switchPersona,
        personas: PRESET_PERSONAS,
        schemes,
        matches,
        applications,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        uploadMissingDoc,
        refreshMatches,
        lockerDocuments,
        uploadLockerDoc,
        deleteLockerDoc,
        syncDigiLocker,
        isLoading,
        isVoiceModalOpen,
        setVoiceModalOpen,
        activeSchemeModal,
        setActiveSchemeModal,
        activeEligibilityModal,
        setActiveEligibilityModal,
        toast,
        showToast,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

export const useLanguage = () => {
  const { language, setLanguage, t } = useApp();
  return { language, setLanguage, t };
};
