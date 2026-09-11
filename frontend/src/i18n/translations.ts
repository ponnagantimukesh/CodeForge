import { Language } from '../types';

export interface TranslationDict {
  brandTitle: string;
  brandTagline: string;
  govBadge: string;
  nav: {
    dashboard: string;
    schemes: string;
    simplify: string;
    assistant: string;
    applications: string;
    notifications: string;
    profile: string;
    admin: string;
    locker: string;
  };
  dashboard: {
    heroTitle: string;
    heroSubtitle: string;
    findSchemesBtn: string;
    uploadDocBtn: string;
    matchedCount: string;
    eligibleCount: string;
    activeAppsCount: string;
    missingDocsCount: string;
    topMatchesTitle: string;
    topMatchesSubtitle: string;
    disclaimer: string;
    viewDetails: string;
    applyNow: string;
    checkEligibility: string;
    whyYouMatch: string;
    satisfiedCriteria: string;
    missingDocsNotice: string;
  };
  simplify: {
    title: string;
    subtitle: string;
    dragDropText: string;
    browseText: string;
    supportedFormats: string;
    orSample: string;
    selectSample: string;
    generateBtn: string;
    processing: string;
    steps: {
      uploading: string;
      reading: string;
      rules: string;
      eligibility: string;
      summary: string;
      ready: string;
    };
    sections: {
      whatIs: string;
      benefit: string;
      whoCan: string;
      whoCannot: string;
      conditions: string;
      documents: string;
      howToApply: string;
      importantDates: string;
      officialSource: string;
      checkMyEligibility: string;
    };
  };
  findSchemes: {
    searchPlaceholder: string;
    filtersTitle: string;
    category: string;
    level: string;
    state: string;
    citizenType: string;
    sortBy: string;
    resultsFound: string;
    allCategories: string;
    allStates: string;
    central: string;
    stateGovt: string;
  };
  assistant: {
    title: string;
    greeting: string;
    placeholder: string;
    send: string;
    listening: string;
    speakPrompt: string;
    clearChat: string;
    suggestedQuestions: string;
    copyTooltip: string;
    readAloud: string;
  };
  applications: {
    title: string;
    subtitle: string;
    trackApp: string;
    uploadMissingDoc: string;
    openPortal: string;
    mockBadge: string;
    timeline: {
      step1: string;
      step2: string;
      step3: string;
      step4: string;
      step5: string;
    };
  };
  notifications: {
    title: string;
    all: string;
    unread: string;
    markAllRead: string;
    empty: string;
  };
  profile: {
    title: string;
    subtitle: string;
    personalInfo: string;
    locationInfo: string;
    economicInfo: string;
    criteriaInfo: string;
    verifiedDocs: string;
    updateBtn: string;
    recalculateBtn: string;
    privacyNotice: string;
  };
  admin: {
    title: string;
    subtitle: string;
    reviewTitle: string;
    reviewSubtitle: string;
    approveBtn: string;
    rejectBtn: string;
    confidence: string;
    schemesList: string;
    addScheme: string;
  };
  locker: {
    title: string;
    subtitle: string;
    totalDocs: string;
    verifiedDocs: string;
    schemesCovered: string;
    storageUsed: string;
    syncDigiLocker: string;
    syncing: string;
    uploadDoc: string;
    searchPlaceholder: string;
    filterCategory: string;
    allCategories: string;
    verifiedBadge: string;
    pendingBadge: string;
    selfUploadedBadge: string;
    matchedSchemesCount: string;
    viewDoc: string;
    downloadDoc: string;
    deleteDoc: string;
    deleteConfirm: string;
    uploadModalTitle: string;
    docNameLabel: string;
    categoryLabel: string;
    docNumberLabel: string;
    selectFile: string;
    uploadSuccess: string;
    syncSuccess: string;
    deleteSuccess: string;
    digilockerSyncNotice: string;
    acceptedIn: string;
    emptyState: string;
  };
  auth: {
    portalTitle: string;
    portalSubtitle: string;
    loginTitle: string;
    loginSubtitle: string;
    tabOtp: string;
    tabDemo: string;
    tabSso: string;
    mobileOrAadhaar: string;
    mobilePlaceholder: string;
    getOtp: string;
    sendingOtp: string;
    otpSentTo: string;
    otpLabel: string;
    otpPlaceholder: string;
    autoFillDemoOtp: string;
    verifyAndLogin: string;
    verifying: string;
    resendOtp: string;
    resendIn: string;
    demoPersonaTitle: string;
    demoPersonaSubtitle: string;
    ssoTitle: string;
    ssoSubtitle: string;
    ssoBtn: string;
    securityNotice: string;
    privacyPledge: string;
    logoutBtn: string;
    welcomeBack: string;
    loggedOutMsg: string;
  };
  common: {
    eligible: string;
    potential: string;
    notEligible: string;
    genderNeutralNotice: string;
    close: string;
    loading: string;
    back: string;
    success: string;
    save: string;
  };
}

export const translations: Record<Language, TranslationDict> = {
  en: {
    brandTitle: 'CitizenScheme AI',
    brandTagline: 'National Public Welfare Scheme Intelligence',
    govBadge: 'Government of India • Universal Citizen Access',
    nav: {
      dashboard: 'Dashboard',
      schemes: 'Find Schemes',
      simplify: 'Simplify Scheme',
      assistant: 'AI Scheme Assistant',
      applications: 'My Applications',
      notifications: 'Notifications',
      profile: 'My Profile',
      admin: 'Admin Panel',
      locker: 'Document Locker',
    },
    dashboard: {
      heroTitle: 'Government Schemes, Made Simple.',
      heroSubtitle: 'Understand schemes, check your eligibility and apply with confidence.',
      findSchemesBtn: 'Find Schemes For Me',
      uploadDocBtn: 'Upload Scheme Document',
      matchedCount: 'Schemes Matched',
      eligibleCount: 'Highly Eligible Schemes',
      activeAppsCount: 'Applications In Progress',
      missingDocsCount: 'Missing Documents',
      topMatchesTitle: 'Top Matches For You',
      topMatchesSubtitle: 'Calculated instantly using explainable rule evaluation from your profile.',
      disclaimer: 'Eligibility shown is an AI-assisted assessment based on the information provided. Final eligibility is determined by the concerned government authority.',
      viewDetails: 'View Details',
      applyNow: 'Apply Now',
      checkEligibility: 'Check My Eligibility',
      whyYouMatch: 'Why You Match',
      satisfiedCriteria: 'Requirements Satisfied',
      missingDocsNotice: 'Documents pending verification',
    },
    simplify: {
      title: 'Turn Government Documents Into Simple Answers',
      subtitle: 'Upload a government scheme PDF and AI will explain it in simple language.',
      dragDropText: 'Drag and drop government gazette or notification PDF here',
      browseText: 'Browse PDF File',
      supportedFormats: 'PDF documents up to 25 MB supported',
      orSample: 'Or test instantly with pre-loaded official gazettes:',
      selectSample: 'Load Sample Gazette',
      generateBtn: '✨ Generate Simple Summary',
      processing: 'AI Analyzing Document...',
      steps: {
        uploading: 'Uploading Document',
        reading: 'Reading digital text & tables',
        rules: 'Identifying scheme rules & limits',
        eligibility: 'Extracting eligibility criteria',
        summary: 'Creating plain-language summary',
        ready: 'Analysis Complete!',
      },
      sections: {
        whatIs: 'What is this scheme?',
        benefit: 'What benefit will I receive?',
        whoCan: 'Who can apply?',
        whoCannot: 'Who cannot apply?',
        conditions: 'Eligibility Conditions',
        documents: 'Required Documents Checklist',
        howToApply: 'How to Apply (Step-by-Step)',
        importantDates: 'Important Dates & Deadlines',
        officialSource: 'Official Source & Gazette Link',
        checkMyEligibility: 'Check My Eligibility for this Scheme',
      },
    },
    findSchemes: {
      searchPlaceholder: 'Search government schemes by name, department, or keyword...',
      filtersTitle: 'Refine Schemes',
      category: 'Category',
      level: 'Government Level',
      state: 'State',
      citizenType: 'Citizen Group',
      sortBy: 'Sort By',
      resultsFound: 'schemes available',
      allCategories: 'All Categories',
      allStates: 'All States',
      central: 'Central Government',
      stateGovt: 'State Government',
    },
    assistant: {
      title: 'AI Scheme Assistant',
      greeting: 'Hello! I can help you understand government schemes and eligibility. Ask me anything in English, Telugu, or Hindi.',
      placeholder: 'Ask a question about government schemes, eligibility, or documents...',
      send: 'Send',
      listening: 'Listening to your voice...',
      speakPrompt: 'Voice Assistant Active. Speak your question clearly.',
      clearChat: 'Clear Chat',
      suggestedQuestions: 'Suggested Questions',
      copyTooltip: 'Copy response',
      readAloud: 'Read aloud',
    },
    applications: {
      title: 'My Applications',
      subtitle: 'Track your government welfare submissions across departments in real time.',
      trackApp: 'Track Status',
      uploadMissingDoc: 'Upload Missing Document',
      openPortal: 'Open Official Portal',
      mockBadge: 'Demo Tracking Mode',
      timeline: {
        step1: 'Application Submitted',
        step2: 'Documents Verified',
        step3: 'Under Review',
        step4: 'Decision',
        step5: 'Benefit Released',
      },
    },
    notifications: {
      title: 'Citizen Notification Center',
      all: 'All Notifications',
      unread: 'Unread Only',
      markAllRead: 'Mark all as read',
      empty: 'No notifications at this time.',
    },
    profile: {
      title: 'My Citizen Profile',
      subtitle: 'Keep your details accurate to get the most precise scheme recommendations.',
      personalInfo: 'Personal Information',
      locationInfo: 'Location & Domicile',
      economicInfo: 'Economic & Employment',
      criteriaInfo: 'Specific Classifications',
      verifiedDocs: 'Verified Documents in DigiLocker / Local Vault',
      updateBtn: 'Update Profile',
      recalculateBtn: 'Recalculate Scheme Matches',
      privacyNotice: 'Your information is used only to personalize scheme recommendations and eligibility explanations. We never share your data.',
    },
    admin: {
      title: 'Government Scheme Administration',
      subtitle: 'Manage official schemes, monitor citizen reach, and verify AI-extracted rules.',
      reviewTitle: 'AI Extracted Rules — Review Required',
      reviewSubtitle: 'Human-in-the-loop verification before automated gazette rules go live.',
      approveBtn: 'Approve & Publish',
      rejectBtn: 'Reject / Flag',
      confidence: 'AI Confidence Score',
      schemesList: 'Published Schemes Directory',
      addScheme: 'Add New Scheme',
    },
    locker: {
      title: 'Citizen Document Locker',
      subtitle: 'Secure digital vault for your verified welfare documents, certificates, and identity cards.',
      totalDocs: 'Total Vault Documents',
      verifiedDocs: 'DigiLocker Verified',
      schemesCovered: 'Scheme Requirements Satisfied',
      storageUsed: 'Secure Vault Storage',
      syncDigiLocker: 'Sync with DigiLocker',
      syncing: 'Syncing with DigiLocker...',
      uploadDoc: 'Upload New Document',
      searchPlaceholder: 'Search documents by name, category, or document ID...',
      filterCategory: 'Category',
      allCategories: 'All Categories',
      verifiedBadge: 'DigiLocker Verified',
      pendingBadge: 'Pending Verification',
      selfUploadedBadge: 'Citizen Uploaded',
      matchedSchemesCount: 'Accepted in',
      viewDoc: 'Preview',
      downloadDoc: 'Download',
      deleteDoc: 'Remove',
      deleteConfirm: 'Are you sure you want to remove this document from your vault?',
      uploadModalTitle: 'Add Document to Locker',
      docNameLabel: 'Document Name',
      categoryLabel: 'Document Category',
      docNumberLabel: 'Document / Certificate Number',
      selectFile: 'Select File (PDF, JPG, PNG up to 10MB)',
      uploadSuccess: 'Document successfully secured in vault and linked to scheme eligibility!',
      syncSuccess: 'DigiLocker sync complete! New certificates added to your locker.',
      deleteSuccess: 'Document removed from locker.',
      digilockerSyncNotice: 'Connected with DigiLocker National Vault • Encrypted with 256-bit AES',
      acceptedIn: 'Satisfies requirements for:',
      emptyState: 'No documents found matching your criteria. Upload a document or sync with DigiLocker.',
    },
    auth: {
      portalTitle: 'CitizenScheme AI Portal',
      portalSubtitle: 'National Public Welfare & Eligibility Intelligence System',
      loginTitle: 'Sign In to Your Citizen Account',
      loginSubtitle: 'Authenticate securely using Aadhaar / Mobile OTP or select a demo citizen persona.',
      tabOtp: 'Mobile / Aadhaar OTP',
      tabDemo: 'Demo Persona (Judges)',
      tabSso: 'DigiLocker / MeriPehchan SSO',
      mobileOrAadhaar: 'Mobile Number or Aadhaar Number',
      mobilePlaceholder: 'Enter 10-digit mobile or 12-digit Aadhaar number',
      getOtp: 'Request Secure OTP',
      sendingOtp: 'Generating OTP...',
      otpSentTo: 'Simulated 6-digit OTP sent to registered mobile linked with',
      otpLabel: 'Enter 6-digit OTP',
      otpPlaceholder: '• • • • • •',
      autoFillDemoOtp: 'Auto-fill Demo OTP',
      verifyAndLogin: 'Verify & Enter Dashboard',
      verifying: 'Authenticating...',
      resendOtp: 'Resend OTP',
      resendIn: 'Resend in',
      demoPersonaTitle: 'Instant Persona Access for Hackathon Judges',
      demoPersonaSubtitle: 'Click any citizen profile below to immediately explore personalized eligibility recommendations with zero data entry.',
      ssoTitle: 'National Single Sign-On (MeriPehchan / DigiLocker)',
      ssoSubtitle: 'Connect seamlessly with your official Government of India digital identity.',
      ssoBtn: 'Sign in with MeriPehchan / DigiLocker',
      securityNotice: '256-Bit SSL Encrypted • Government of India Digital Standards Compliant',
      privacyPledge: 'We strictly protect citizen privacy under the Digital Personal Data Protection (DPDP) Act 2023. Zero commercial usage.',
      logoutBtn: 'Sign Out',
      welcomeBack: 'Welcome back',
      loggedOutMsg: 'You have been successfully signed out.',
    },
    common: {
      eligible: 'Eligible / Strong Match',
      potential: 'Potentially Eligible / Needs Verification',
      notEligible: 'Not Eligible',
      genderNeutralNotice: 'Gender is not a restriction. This scheme is open to all citizens.',
      close: 'Close',
      loading: 'Loading...',
      back: 'Back',
      success: 'Operation completed successfully',
      save: 'Save Changes',
    },
  },

  te: {
    brandTitle: 'సిటిజెన్‌స్కీమ్ AI',
    brandTagline: 'జాతీయ పౌర సంక్షేమ పథకాల సహాయక వ్యవస్థ',
    govBadge: 'భారత ప్రభుత్వం • సార్వత్రిక పౌర సేవ',
    nav: {
      dashboard: 'డ్యాష్‌బోర్డ్',
      schemes: 'పథకాలు వెతకండి',
      simplify: 'పథకం సరళీకరణ',
      assistant: 'AI పథక సహాయకుడు',
      applications: 'నా దరఖాస్తులు',
      notifications: 'నోటిఫికేషన్లు',
      profile: 'నా ప్రొఫైల్',
      admin: 'అడ్మిన్ ప్యానెల్',
      locker: 'డాక్యుమెంట్ లాకర్',
    },
    dashboard: {
      heroTitle: 'ప్రభుత్వ పథకాలు, సులభంగా అర్థం చేసుకోండి.',
      heroSubtitle: 'పథకాలను అర్థం చేసుకోండి, మీ అర్హతను తనిఖీ చేయండి మరియు ఆత్మవిశ్వాసంతో దరఖాస్తు చేసుకోండి.',
      findSchemesBtn: 'నాకు సరిపోయే పథకాలు',
      uploadDocBtn: 'పథకం పత్రాన్ని అప్‌లోడ్ చేయండి',
      matchedCount: 'సరిపోలిన పథకాలు',
      eligibleCount: 'అధిక అర్హత పథకాలు',
      activeAppsCount: 'పురోగతిలో ఉన్న దరఖాస్తులు',
      missingDocsCount: 'కావలసిన పత్రాలు',
      topMatchesTitle: 'మీ కోసం అగ్ర పథకాలు',
      topMatchesSubtitle: 'మీ ప్రొఫైల్ ఆధారంగా నియమాల ప్రకారం లెక్కించబడింది.',
      disclaimer: 'ఇక్కడ చూపబడిన అర్హత AI ఆధారిత ప్రాథమిక అంచనా మాత్రమే. తుది అర్హతను సంబంధిత ప్రభుత్వ శాఖ నిర్ణయిస్తుంది.',
      viewDetails: 'వివరాలు చూడండి',
      applyNow: 'ఇప్పుడే దరఖాస్తు చేయండి',
      checkEligibility: 'నా అర్హత తనిఖీ చేసుకోండి',
      whyYouMatch: 'మీరు ఎందుకు సరిపోలారు',
      satisfiedCriteria: 'సంతృప్తి చెందిన నిబంధనలు',
      missingDocsNotice: 'ధృవీకరణ కొరకు పెండింగ్‌లో ఉన్న పత్రాలు',
    },
    simplify: {
      title: 'ప్రభుత్వ పత్రాలను సులభ సమాధానాలుగా మార్చండి',
      subtitle: 'ప్రభుత్వ పథకం PDF అప్‌లోడ్ చేయండి, AI దానిని సరళమైన తెలుగులో వివరిస్తుంది.',
      dragDropText: 'ప్రభుత్వ గెజిట్ లేదా నోటిఫికేషన్ PDF ఇక్కడ డ్రాప్ చేయండి',
      browseText: 'PDF ఫైల్ ఎంచుకోండి',
      supportedFormats: 'గరిష్టంగా 25 MB వరకు గల PDF పత్రాలు అనుమతించబడతాయి',
      orSample: 'లేదా సిద్ధంగా ఉన్న అధికారిక గెజిట్‌లతో పరీక్షించండి:',
      selectSample: 'నమూనా గెజిట్ ఎంచుకోండి',
      generateBtn: '✨ సరళమైన సారాంశాన్ని పొందండి',
      processing: 'AI పత్రాన్ని విశ్లేషిస్తోంది...',
      steps: {
        uploading: 'పత్రం అప్‌లోడ్ అవుతోంది',
        reading: 'డిజిటల్ సమాచారాన్ని చదువుతోంది',
        rules: 'పథక నిబంధనలను గుర్తిస్తోంది',
        eligibility: 'అర్హత ప్రమాణాలను సేకరిస్తోంది',
        summary: 'సరళమైన సారాంశాన్ని రూపొందిస్తోంది',
        ready: 'విశ్లేషణ పూర్తయింది!',
      },
      sections: {
        whatIs: 'ఈ పథకం ఏమిటి?',
        benefit: 'నాకు లభించే ప్రయోజనం ఏమిటి?',
        whoCan: 'ఎవరు దరఖాస్తు చేసుకోవచ్చు?',
        whoCannot: 'ఎవరు దరఖాస్తు చేసుకోలేరు?',
        conditions: 'అర్హత నిబంధనల పట్టిక',
        documents: 'అవసరమైన పత్రాల జాబితా',
        howToApply: 'దరఖాస్తు ఎలా చేయాలి (దశలవారీగా)',
        importantDates: 'ముఖ్యమైన తేదీలు & గడువులు',
        officialSource: 'అధికారిక మూలం & వెబ్‌సైట్',
        checkMyEligibility: 'నా అర్హతను పరిశీలించండి',
      },
    },
    findSchemes: {
      searchPlaceholder: 'పథకం పేరు, శాఖ లేదా కీలకపదం ద్వారా వెతకండి...',
      filtersTitle: 'ఫిల్టర్లు',
      category: 'విభాగం',
      level: 'ప్రభుత్వ స్థాయి',
      state: 'రాష్ట్రం',
      citizenType: 'పౌర విభాగం',
      sortBy: 'క్రమబద్ధీకరణ',
      resultsFound: 'పథకాలు అందుబాటులో ఉన్నాయి',
      allCategories: 'అన్ని విభాగాలు',
      allStates: 'అన్ని రాష్ట్రాలు',
      central: 'కేంద్ర ప్రభుత్వం',
      stateGovt: 'రాష్ట్ర ప్రభుత్వం',
    },
    assistant: {
      title: 'AI పథక సహాయకుడు',
      greeting: 'నమస్కారం! ప్రభుత్వ పథకాలు మరియు అర్హతలను అర్థం చేసుకోవడంలో నేను మీకు సహాయపడగలను. నన్ను ఏదైనా అడగండి.',
      placeholder: 'ప్రభుత్వ పథకాలు, అర్హత లేదా పత్రాల గురించి ప్రశ్న అడగండి...',
      send: 'పంపండి',
      listening: 'మీ స్వరాన్ని వింటున్నాను...',
      speakPrompt: 'వాయిస్ అసిస్టెంట్ ఆన్‌లో ఉంది. స్పష్టంగా మాట్లాడండి.',
      clearChat: 'చాట్ క్లియర్ చేయండి',
      suggestedQuestions: 'సూచించిన ప్రశ్నలు',
      copyTooltip: 'కాపీ చేయండి',
      readAloud: 'చదివి వినిపించు',
    },
    applications: {
      title: 'నా దరఖాస్తులు',
      subtitle: 'వివిధ ప్రభుత్వ శాఖలలో మీ దరఖాస్తుల స్థితిని ప్రత్యక్షంగా ట్రాక్ చేయండి.',
      trackApp: 'స్థితి ట్రాక్ చేయండి',
      uploadMissingDoc: 'మిగిలిన పత్రాన్ని అప్‌లోడ్ చేయండి',
      openPortal: 'అధికారిక పోర్టల్ తెరవండి',
      mockBadge: 'డెమో ట్రాకింగ్ మోడ్',
      timeline: {
        step1: 'దరఖాస్తు సమర్పించబడింది',
        step2: 'పత్రాలు ధృవీకరించబడ్డాయి',
        step3: 'పరిశీలనలో ఉంది',
        step4: 'తుది నిర్ణయం',
        step5: 'లబ్ధి విడుదల చేయబడింది',
      },
    },
    notifications: {
      title: 'పౌర సమాచార కేంద్రం',
      all: 'అన్ని నోటిఫికేషన్లు',
      unread: 'చదవనివి మాత్రమే',
      markAllRead: 'అన్నీ చదివినట్లు గుర్తించు',
      empty: 'ఎలాంటి కొత్త నోటిఫికేషన్లు లేవు.',
    },
    profile: {
      title: 'నా పౌర ప్రొఫైల్',
      subtitle: 'సరైన పథక సిఫార్సుల కోసం మీ వివరాలను సరిచూసుకోండి.',
      personalInfo: 'వ్యక్తిగత సమాచారం',
      locationInfo: 'నివాస వివరాలు',
      economicInfo: 'ఆర్థిక & ఉపాధి సమాచారం',
      criteriaInfo: 'ప్రత్యేక వర్గీకరణలు',
      verifiedDocs: 'ధృవీకరించబడిన పత్రాలు (డిజిలాకర్)',
      updateBtn: 'ప్రొఫైల్ అప్‌డేట్ చేయండి',
      recalculateBtn: 'అర్హతలను తిరిగి లెక్కించండి',
      privacyNotice: 'మీ సమాచారం పథకాల సిఫార్సులకు మాత్రమే ఉపయోగించబడుతుంది. గోప్యతకు భరోసా.',
    },
    admin: {
      title: 'ప్రభుత్వ పథకాల నిర్వహణ',
      subtitle: 'పథకాలను నిర్వహించండి మరియు AI సేకరించిన నిబంధనలను ధృవీకరించండి.',
      reviewTitle: 'AI సేకరించిన నిబంధనలు — సమీక్ష అవసరం',
      reviewSubtitle: 'అధికారికంగా ప్రచురించే ముందు అధికారుల పరిశీలన.',
      approveBtn: 'ఆమోదించి ప్రచురించు',
      rejectBtn: 'తిరస్కరించు',
      confidence: 'AI ఖచ్చితత్వ స్కోరు',
      schemesList: 'ప్రచురించిన పథకాలు',
      addScheme: 'కొత్త పథకాన్ని జోడించండి',
    },
    locker: {
      title: 'పౌర డాక్యుమెంట్ లాకర్',
      subtitle: 'మీ ధృవీకరించబడిన సంక్షేమ పత్రాలు, సర్టిఫికెట్లు మరియు గుర్తింపు కార్డుల కోసం సురక్షిత డిజిటల్ ఖజానా.',
      totalDocs: 'మొత్తం పత్రాలు',
      verifiedDocs: 'డిజిలాకర్ ధృవీకరించినవి',
      schemesCovered: 'సంతృప్తి చెందిన పథక అర్హతలు',
      storageUsed: 'సురక్షిత వాల్ట్ నిల్వ',
      syncDigiLocker: 'డిజిలాకర్‌తో అనుసంధానించండి',
      syncing: 'డిజిలాకర్‌తో లింక్ అవుతోంది...',
      uploadDoc: 'కొత్త పత్రాన్ని అప్‌లోడ్ చేయండి',
      searchPlaceholder: 'పేరు, వర్గం లేదా ఐడీ ద్వారా పత్రాలను వెతకండి...',
      filterCategory: 'వర్గం',
      allCategories: 'అన్ని వర్గాలు',
      verifiedBadge: 'డిజిలాకర్ ధృవీకరించబడింది',
      pendingBadge: 'ధృవీకరణ పెండింగ్‌లో ఉంది',
      selfUploadedBadge: 'పౌరుడు అప్‌లోడ్ చేసినది',
      matchedSchemesCount: 'ఈ పథకాలకు ఆమోదయోగ్యం',
      viewDoc: 'ప్రివ్యూ',
      downloadDoc: 'డౌన్‌లోడ్',
      deleteDoc: 'తొలగించు',
      deleteConfirm: 'మీరు ఖచ్చితంగా ఈ పత్రాన్ని లాకర్ నుండి తొలగించాలనుకుంటున్నారా?',
      uploadModalTitle: 'లాకర్‌కు పత్రాన్ని జోడించండి',
      docNameLabel: 'పత్రం పేరు',
      categoryLabel: 'పత్ర వర్గం',
      docNumberLabel: 'పత్రం / సర్టిఫికేట్ సంఖ్య',
      selectFile: 'ఫైల్ ఎంచుకోండి (PDF, JPG, PNG 10MB వరకు)',
      uploadSuccess: 'పత్రం లాకర్‌లో భద్రపరచబడింది మరియు పథక అర్హతకు లింక్ చేయబడింది!',
      syncSuccess: 'డిజిలాకర్ సమకాలీకరణ పూర్తయింది! కొత్త సర్టిఫికెట్లు జోడించబడ్డాయి.',
      deleteSuccess: 'పత్రం లాకర్ నుండి తొలగించబడింది.',
      digilockerSyncNotice: 'డిజిలాకర్ జాతీయ ఖజానాతో అనుసంధానించబడింది • 256-బిట్ AES ఎన్‌క్రిప్షన్',
      acceptedIn: 'ఈ పథకాల నిబంధనలను పూర్తి చేస్తుంది:',
      emptyState: 'పత్రాలు ఏవీ కనుగొనబడలేదు. కొత్త పత్రాన్ని అప్‌లోడ్ చేయండి లేదా డిజిలాకర్‌తో లింక్ చేయండి.',
    },
    auth: {
      portalTitle: 'సిటిజెన్‌స్కీమ్ AI పోర్టల్',
      portalSubtitle: 'జాతీయ పౌర సంక్షేమ మరియు అర్హత విశ్లేషణ వ్యవస్థ',
      loginTitle: 'మీ పౌర ఖాతాలోకి ప్రవేశించండి',
      loginSubtitle: 'ఆధార్ లేదా మొబైల్ ఓటీపీతో సురక్షితంగా లాగిన్ అవ్వండి లేదా ప్రదర్శన ప్రొఫైల్‌ను ఎంచుకోండి.',
      tabOtp: 'మొబైల్ / ఆధార్ ఓటీపీ',
      tabDemo: 'డెమో ప్రొఫైల్ (జడ్జీల కొరకు)',
      tabSso: 'డిజిలాకర్ / మేరీపెహచాన్ SSO',
      mobileOrAadhaar: 'మొబైల్ నంబర్ లేదా ఆధార్ నంబర్',
      mobilePlaceholder: '10 అంకెల మొబైల్ లేదా 12 అంకెల ఆధార్ సంఖ్యను నమోదు చేయండి',
      getOtp: 'ఓటీపీ పొందండి',
      sendingOtp: 'ఓటీపీ ఉత్పత్తి అవుతోంది...',
      otpSentTo: 'లింక్ చేయబడిన రిజిస్టర్డ్ మొబైల్‌కు 6 అంకెల ఓటీపీ పంపబడింది:',
      otpLabel: '6 అంకెల ఓటీపీ నమోదు చేయండి',
      otpPlaceholder: '• • • • • •',
      autoFillDemoOtp: 'డెమో ఓటీపీని స్వయంచాలకంగా పూరించండి',
      verifyAndLogin: 'ధృవీకరించి ప్రవేశించండి',
      verifying: 'ధృవీకరిస్తోంది...',
      resendOtp: 'ఓటీపీ మళ్ళీ పంపండి',
      resendIn: 'తిరిగి పంపుటకు సమయం',
      demoPersonaTitle: 'హాకథాన్ జడ్జీల కొరకు తక్షణ పౌర ప్రొఫైల్స్',
      demoPersonaSubtitle: 'ఎలాంటి సమాచారం టైప్ చేయకుండా, దిగువ పౌర ప్రొఫైల్‌లలో ఒకదానిపై క్లిక్ చేసి వ్యక్తిగతీకరించిన పథకాలను చూడండి.',
      ssoTitle: 'జాతీయ సింగిల్ సైన్-ఆన్ (మేరీపెహచాన్ / డిజిలాకర్)',
      ssoSubtitle: 'భారత ప్రభుత్వ అధికారిక డిజిటల్ గుర్తింపుతో సులభంగా అనుసంధానం అవ్వండి.',
      ssoBtn: 'మేరీపెహచాన్ / డిజిలాకర్‌తో లాగిన్ అవ్వండి',
      securityNotice: '256-బిట్ SSL ఎన్‌క్రిప్షన్ • భారత ప్రభుత్వ డిజిటల్ ప్రమాణాల ప్రకారం సురక్షితం',
      privacyPledge: 'డిజిటల్ వ్యక్తిగత డేటా రక్షణ (DPDP) చట్టం 2023 ప్రకారం పౌరుల గోప్యత పూర్తిగా రక్షించబడుతుంది.',
      logoutBtn: 'లాగౌట్',
      welcomeBack: 'స్వాగతం',
      loggedOutMsg: 'మీరు విజయవంతంగా లాగౌట్ అయ్యారు.',
    },
    common: {
      eligible: 'అర్హులు / బలమైన సరిపోలిక',
      potential: 'సంభావ్యంగా అర్హులు / ధృవీకరణ అవసరం',
      notEligible: 'అర్హులు కాదు',
      genderNeutralNotice: 'లింగ వివక్ష లేదు. ఈ పథకం పౌరులందరికీ అందుబాటులో ఉంటుంది.',
      close: 'మూసివేయి',
      loading: 'లోడ్ అవుతోంది...',
      back: 'వెనుకకు',
      success: 'విజయవంతంగా పూర్తయింది',
      save: 'మార్పులను సేవ్ చేయండి',
    },
  },

  hi: {
    brandTitle: 'सिटीजनस्कीम AI',
    brandTagline: 'राष्ट्रीय जन कल्याण योजना बुद्धिमत्ता मंच',
    govBadge: 'भारत सरकार • सार्वभौमिक नागरिक पहुंच',
    nav: {
      dashboard: 'डैशबोर्ड',
      schemes: 'योजनाएं खोजें',
      simplify: 'योजना सरलीकरण',
      assistant: 'AI योजना सहायक',
      applications: 'मेरे आवेदन',
      notifications: 'सूचनाएं',
      profile: 'मेरी प्रोफ़ाइल',
      admin: 'व्यवस्थापक पैनल',
      locker: 'दस्तावेज़ लॉकर',
    },
    dashboard: {
      heroTitle: 'सरकारी योजनाएं, अब समझें सरलता से।',
      heroSubtitle: 'योजनाओं को समझें, अपनी पात्रता जांचें और विश्वास के साथ आवेदन करें।',
      findSchemesBtn: 'मेरे लिए योजनाएं खोजें',
      uploadDocBtn: 'योजना दस्तावेज़ अपलोड करें',
      matchedCount: 'सुसंगत योजनाएं',
      eligibleCount: 'उच्च पात्र योजनाएं',
      activeAppsCount: 'प्रक्रियाधीन आवेदन',
      missingDocsCount: 'लंबित दस्तावेज़',
      topMatchesTitle: 'आपके लिए प्रमुख योजनाएं',
      topMatchesSubtitle: 'आपकी प्रोफ़ाइल के आधार पर पारदर्शी नियमों से आकलित।',
      disclaimer: 'प्रदर्शित पात्रता प्रदान की गई जानकारी पर आधारित AI-सहायक प्रारंभिक मूल्यांकन है। अंतिम पात्रता संबंधित सरकारी प्राधिकरण द्वारा तय की जाती है।',
      viewDetails: 'विवरण देखें',
      applyNow: 'अभी आवेदन करें',
      checkEligibility: 'मेरी पात्रता जांचें',
      whyYouMatch: 'आप क्यों पात्र हैं',
      satisfiedCriteria: 'संतुष्ट शर्तें',
      missingDocsNotice: 'सत्यापन हेतु लंबित दस्तावेज़',
    },
    simplify: {
      title: 'सरकारी दस्तावेज़ों को सरल उत्तरों में बदलें',
      subtitle: 'सरकारी योजना का PDF अपलोड करें, AI इसे सरल हिंदी भाषा में समझाएगा।',
      dragDropText: 'सरकारी राजपत्र या अधिसूचना PDF यहाँ खींचें और छोड़ें',
      browseText: 'PDF फ़ाइल चुनें',
      supportedFormats: '25 MB तक के PDF दस्तावेज़ समर्थित हैं',
      orSample: 'या पूर्व-लोड किए गए आधिकारिक राजपत्रों के साथ तुरंत परीक्षण करें:',
      selectSample: 'नमूना राजपत्र लोड करें',
      generateBtn: '✨ सरल सारांश तैयार करें',
      processing: 'AI दस्तावेज़ का विश्लेषण कर रहा है...',
      steps: {
        uploading: 'दस्तावेज़ अपलोड हो रहा है',
        reading: 'डिजिटल पाठ और तालिकाएं पढ़ना',
        rules: 'योजना नियमों की पहचान',
        eligibility: 'पात्रता मानदंडों का निष्कर्षण',
        summary: 'सरल भाषा सारांश तैयार करना',
        ready: 'विश्लेषण पूर्ण!',
      },
      sections: {
        whatIs: 'यह योजना क्या है?',
        benefit: 'मुझे क्या लाभ मिलेगा?',
        whoCan: 'कौन आवेदन कर सकता है?',
        whoCannot: 'कौन आवेदन नहीं कर सकता?',
        conditions: 'पात्रता शर्तों की तालिका',
        documents: 'आवश्यक दस्तावेज़ों की चेकलिस्ट',
        howToApply: 'आवेदन कैसे करें (चरणबद्ध तरीका)',
        importantDates: 'महत्वपूर्ण तिथियां और समय सीमा',
        officialSource: 'आधिकारिक स्रोत और लिंक',
        checkMyEligibility: 'इस योजना के लिए मेरी पात्रता जांचें',
      },
    },
    findSchemes: {
      searchPlaceholder: 'योजना का नाम, विभाग या कीवर्ड द्वारा खोजें...',
      filtersTitle: 'फ़िल्टर',
      category: 'श्रेणी',
      level: 'सरकारी स्तर',
      state: 'राज्य',
      citizenType: 'नागरिक समूह',
      sortBy: 'क्रमबद्ध करें',
      resultsFound: 'योजनाएं उपलब्ध',
      allCategories: 'सभी श्रेणियां',
      allStates: 'सभी राज्य',
      central: 'केंद्र सरकार',
      stateGovt: 'राज्य सरकार',
    },
    assistant: {
      title: 'AI योजना सहायक',
      greeting: 'नमस्ते! मैं आपको सरकारी योजनाओं और पात्रता को समझने में मदद कर सकता हूँ। बेझिझक कोई भी प्रश्न पूछें।',
      placeholder: 'सरकारी योजनाओं, पात्रता या आवश्यक दस्तावेज़ों के बारे में पूछें...',
      send: 'भेजें',
      listening: 'आपकी आवाज़ सुन रहा हूँ...',
      speakPrompt: 'वॉइस सहायक सक्रिय है। कृपया स्पष्ट बोलें।',
      clearChat: 'चैट साफ़ करें',
      suggestedQuestions: 'सुझाए गए प्रश्न',
      copyTooltip: 'कॉपी करें',
      readAloud: 'बोलकर सुनाएं',
    },
    applications: {
      title: 'मेरे आवेदन',
      subtitle: 'विभिन्न सरकारी विभागों में अपने आवेदनों की स्थिति को ट्रैक करें।',
      trackApp: 'स्थिति जांचें',
      uploadMissingDoc: 'लंबित दस्तावेज़ अपलोड करें',
      openPortal: 'आधिकारिक पोर्टल खोलें',
      mockBadge: 'डेमो ट्रैकिंग मोड',
      timeline: {
        step1: 'आवेदन जमा हुआ',
        step2: 'दस्तावेज़ सत्यापित',
        step3: 'समीक्षाधीन',
        step4: 'निर्णय',
        step5: 'लाभ जारी',
      },
    },
    notifications: {
      title: 'नागरिक सूचना केंद्र',
      all: 'सभी सूचनाएं',
      unread: 'केवल अपठित',
      markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
      empty: 'इस समय कोई नई सूचना नहीं है।',
    },
    profile: {
      title: 'मेरी नागरिक प्रोफ़ाइल',
      subtitle: 'सटीक योजना अनुशंसाएं प्राप्त करने के लिए अपनी जानकारी अपडेट रखें।',
      personalInfo: 'व्यक्तिगत जानकारी',
      locationInfo: 'निवास विवरण',
      economicInfo: 'आर्थिक व रोजगार जानकारी',
      criteriaInfo: 'विशेष श्रेणियां',
      verifiedDocs: 'सत्यापित दस्तावेज़ (डिजीलॉकर)',
      updateBtn: 'प्रोफ़ाइल अपडेट करें',
      recalculateBtn: 'पात्रता पुनः गणना करें',
      privacyNotice: 'आपकी जानकारी का उपयोग केवल योजना अनुशंसाओं के लिए किया जाता है। डेटा पूरी तरह सुरक्षित है।',
    },
    admin: {
      title: 'सरकारी योजना प्रशासन',
      subtitle: 'योजनाओं का प्रबंधन करें और AI द्वारा निकाले गए नियमों की समीक्षा करें।',
      reviewTitle: 'AI द्वारा निकाले गए नियम — समीक्षा आवश्यक',
      reviewSubtitle: 'सार्वजनिक करने से पहले मानव सत्यापन।',
      approveBtn: 'स्वीकृत करें और प्रकाशित करें',
      rejectBtn: 'अस्वीकार करें',
      confidence: 'AI सटीकता स्कोर',
      schemesList: 'प्रकाशित योजनाओं की सूची',
      addScheme: 'नई योजना जोड़ें',
    },
    locker: {
      title: 'नागरिक दस्तावेज़ लॉकर',
      subtitle: 'आपके सत्यापित कल्याणकारी दस्तावेज़ों, प्रमाणपत्रों और पहचान पत्रों के लिए सुरक्षित डिजिटल वॉल्ट।',
      totalDocs: 'कुल दस्तावेज़',
      verifiedDocs: 'डिजिलॉकर सत्यापित',
      schemesCovered: 'संतुष्ट योजना आवश्यकताएं',
      storageUsed: 'सुरक्षित वॉल्ट स्टोरेज',
      syncDigiLocker: 'डिजिलॉकर से सिंक करें',
      syncing: 'डिजिलॉकर से सिंक हो रहा है...',
      uploadDoc: 'नया दस्तावेज़ अपलोड करें',
      searchPlaceholder: 'नाम, श्रेणी या दस्तावेज़ आईडी से खोजें...',
      filterCategory: 'श्रेणी',
      allCategories: 'सभी श्रेणियां',
      verifiedBadge: 'डिजिलॉकर सत्यापित',
      pendingBadge: 'सत्यापन लंबित',
      selfUploadedBadge: 'नागरिक द्वारा अपलोड',
      matchedSchemesCount: 'स्वीकृत योजनाएं',
      viewDoc: 'पूर्वावलोकन',
      downloadDoc: 'डाउनलोड',
      deleteDoc: 'हटाएं',
      deleteConfirm: 'क्या आप वाकई इस दस्तावेज़ को अपने वॉल्ट से हटाना चाहते हैं?',
      uploadModalTitle: 'लॉकर में दस्तावेज़ जोड़ें',
      docNameLabel: 'दस्तावेज़ का नाम',
      categoryLabel: 'दस्तावेज़ श्रेणी',
      docNumberLabel: 'दस्तावेज़ / प्रमाणपत्र संख्या',
      selectFile: 'फ़ाइल चुनें (PDF, JPG, PNG 10MB तक)',
      uploadSuccess: 'दस्तावेज़ वॉल्ट में सुरक्षित रूप से जोड़ा गया और योजना पात्रता से जोड़ा गया!',
      syncSuccess: 'डिजिलॉकर सिंक पूर्ण! नए प्रमाणपत्र आपके लॉकर में जोड़े गए।',
      deleteSuccess: 'दस्तावेज़ लॉकर से हटा दिया गया।',
      digilockerSyncNotice: 'डिजिलॉकर राष्ट्रीय वॉल्ट से संबद्ध • 256-बिट एईएस एन्क्रिप्टेड',
      acceptedIn: 'इन योजनाओं की शर्तों को पूरा करता है:',
      emptyState: 'कोई दस्तावेज़ नहीं मिला। दस्तावेज़ अपलोड करें या डिजिलॉकर से सिंक करें।',
    },
    auth: {
      portalTitle: 'सिटीजनस्कीम AI पोर्टल',
      portalSubtitle: 'राष्ट्रीय जन कल्याण एवं पात्रता बुद्धिमत्ता प्रणाली',
      loginTitle: 'अपने नागरिक खाते में लॉगिन करें',
      loginSubtitle: 'आधार या मोबाइल ओटीपी से सुरक्षित लॉगिन करें या परीक्षण प्रोफ़ाइल चुनें।',
      tabOtp: 'मोबाइल / आधार ओटीपी',
      tabDemo: 'डेमो प्रोफ़ाइल (निर्णायकों हेतु)',
      tabSso: 'डिजिलॉकर / मेरीपहचान SSO',
      mobileOrAadhaar: 'मोबाइल नंबर या आधार नंबर',
      mobilePlaceholder: '10 अंकों का मोबाइल या 12 अंकों का आधार नंबर दर्ज करें',
      getOtp: 'ओटीपी प्राप्त करें',
      sendingOtp: 'ओटीपी भेजा जा रहा है...',
      otpSentTo: 'पंजीकृत मोबाइल पर भेजा गया 6 अंकों का सुरक्षित ओटीपी:',
      otpLabel: '6 अंकों का ओटीपी दर्ज करें',
      otpPlaceholder: '• • • • • •',
      autoFillDemoOtp: 'डेमो ओटीपी स्वतः भरें',
      verifyAndLogin: 'सत्यापित करें और प्रवेश करें',
      verifying: 'सत्यापन जारी है...',
      resendOtp: 'ओटीपी पुनः भेजें',
      resendIn: 'पुनः भेजने में शेष',
      demoPersonaTitle: 'हैकथॉन निर्णायकों हेतु त्वरित नागरिक प्रोफ़ाइल',
      demoPersonaSubtitle: 'बिना कोई विवरण भरे, तुरंत व्यक्तिगत योजना पात्रता देखने के लिए नीचे दी गई किसी भी प्रोफ़ाइल पर क्लिक करें।',
      ssoTitle: 'राष्ट्रीय सिंगल साइन-ऑन (मेरीपहचान / डिजिलॉकर)',
      ssoSubtitle: 'भारत सरकार की आधिकारिक डिजिटल पहचान के साथ सीधे जुड़ें।',
      ssoBtn: 'मेरीपहचान / डिजिलॉकर से लॉगिन करें',
      securityNotice: '256-बिट एसएसएल एन्क्रिप्टेड • भारत सरकार डिजिटल मानकों के अनुरूप',
      privacyPledge: 'डिजिटल व्यक्तिगत डेटा संरक्षण (डीपीडीपी) अधिनियम 2023 के तहत नागरिक गोपनीयता पूर्णतः सुरक्षित।',
      logoutBtn: 'लॉग आउट',
      welcomeBack: 'स्वागत है',
      loggedOutMsg: 'आप सफलतापूर्वक लॉग आउट हो गए हैं।',
    },
    common: {
      eligible: 'योग्य / मजबूत मेल',
      potential: 'संभावित पात्र / सत्यापन आवश्यक',
      notEligible: 'पात्र नहीं',
      genderNeutralNotice: 'लिंग का कोई प्रतिबंध नहीं। यह योजना सभी नागरिकों के लिए खुली है।',
      close: 'बंद करें',
      loading: 'लोड हो रहा है...',
      back: 'वापस जाएं',
      success: 'कार्य सफलतापूर्वक पूरा हुआ',
      save: 'परिवर्तन सहेजें',
    },
  },
};
