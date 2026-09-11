import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Smartphone,
  KeyRound,
  CheckCircle2,
  Users,
  Sparkles,
  ArrowRight,
  Globe,
  RefreshCw,
  Fingerprint,
  FileCheck,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const LoginPage: React.FC = () => {
  const { login, language, setLanguage, t, personas } = useApp();

  const [authMode, setAuthMode] = useState<'otp' | 'demo' | 'sso'>('otp');
  const [identifier, setIdentifier] = useState('9848012345');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: any;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleSendOtp = () => {
    if (!identifier.trim()) {
      setErrorMsg('Please enter a valid Mobile or Aadhaar number');
      return;
    }
    setErrorMsg('');
    setIsSendingOtp(true);
    setTimeout(() => {
      // Generate a realistic 6-digit OTP
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      setOtpSent(true);
      setIsSendingOtp(false);
      setCountdown(45);
    }, 600);
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      setEnteredOtp(generatedOtp);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp !== generatedOtp && enteredOtp !== '123456') {
      setErrorMsg('Invalid OTP. Please check the code or click Auto-fill.');
      return;
    }
    setErrorMsg('');
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      login('farmer_ramesh', identifier);
    }, 500);
  };

  const handlePersonaLogin = (personaKey: string) => {
    login(personaKey);
  };

  const handleSsoLogin = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      login('farmer_ramesh');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-between text-slate-100 selection:bg-blue-600 selection:text-white relative overflow-hidden">
      {/* Background Decorative Lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top National Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-20">
        <div className="h-1 w-full flex">
          <div className="h-full w-1/3 bg-amber-500" />
          <div className="h-full w-1/3 bg-white" />
          <div className="h-full w-1/3 bg-emerald-600" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-blue-600 to-indigo-800 flex items-center justify-center text-white font-black text-xl shadow-lg border border-blue-400/30">
              CS
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg tracking-tight">
                  CitizenScheme
                </span>
                <span className="text-xs bg-blue-500/20 text-blue-400 border border-blue-400/30 px-1.5 py-0.5 rounded font-mono font-semibold">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl p-1 shadow-inner">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
            {(['en', 'te', 'hi'] as Language[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                {lang === 'en' ? 'English' : lang === 'te' ? 'తెలుగు' : 'हिन्दी'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6 z-10">
        <div className="w-full max-w-xl bg-slate-900/90 border border-slate-800/90 rounded-3xl shadow-2xl p-6 sm:p-8 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300">
          {/* Government Compliance Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t.govBadge}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {t.auth.loginTitle}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto">
              {t.auth.loginSubtitle}
            </p>
          </div>

          {/* Mode Selector Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-950/80 border border-slate-800 rounded-2xl mb-6">
            <button
              onClick={() => {
                setAuthMode('otp');
                setErrorMsg('');
              }}
              className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'otp'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="truncate">{t.auth.tabOtp}</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('demo');
                setErrorMsg('');
              }}
              className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'demo'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span className="truncate">{t.auth.tabDemo}</span>
            </button>

            <button
              onClick={() => {
                setAuthMode('sso');
                setErrorMsg('');
              }}
              className={`py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                authMode === 'sso'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="truncate">{t.auth.tabSso}</span>
            </button>
          </div>

          {/* TAB 1: Mobile / Aadhaar OTP Login */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.auth.mobileOrAadhaar}
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    disabled={otpSent}
                    placeholder={t.auth.mobilePlaceholder}
                    className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 disabled:opacity-75 disabled:bg-slate-900"
                  />
                  {!otpSent && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isSendingOtp}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSendingOtp ? t.auth.sendingOtp : t.auth.getOtp}
                    </button>
                  )}
                  {otpSent && (
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false);
                        setEnteredOtp('');
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-400 hover:underline cursor-pointer"
                    >
                      Change
                    </button>
                  )}
                </div>
              </div>

              {/* OTP Sent Alert & Helper */}
              {otpSent && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2 animate-in fade-in">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-200">
                      <span>{t.auth.otpSentTo} </span>
                      <strong className="text-white font-mono">
                        +91 {identifier.slice(0, 5)} {identifier.slice(5) || 'XXXXX'}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-900/90 rounded-lg p-2 border border-emerald-500/20 text-xs">
                    <div>
                      <span className="text-slate-400">Generated OTP: </span>
                      <span className="font-mono font-bold text-amber-400 text-sm tracking-widest ml-1">
                        {generatedOtp}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAutoFillOtp}
                      className="px-2.5 py-1 bg-emerald-600/80 hover:bg-emerald-500 text-white font-semibold text-[11px] rounded-md transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-amber-300" />
                      {t.auth.autoFillDemoOtp}
                    </button>
                  </div>
                </div>
              )}

              {/* OTP Verification Form */}
              {otpSent && (
                <form onSubmit={handleVerifyOtp} className="space-y-4 pt-1">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-semibold text-slate-300">
                        {t.auth.otpLabel}
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {countdown > 0 ? (
                          `${t.auth.resendIn} ${countdown}s`
                        ) : (
                          <button
                            type="button"
                            onClick={handleSendOtp}
                            className="text-blue-400 hover:underline cursor-pointer"
                          >
                            {t.auth.resendOtp}
                          </button>
                        )}
                      </span>
                    </div>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        maxLength={6}
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value)}
                        placeholder="123456"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono text-base tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  {errorMsg && (
                    <div className="text-rose-400 text-xs bg-rose-950/30 border border-rose-500/30 p-2.5 rounded-xl">
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isVerifying || enteredOtp.length < 4}
                    className="w-full py-3 rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:from-blue-700 active:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        {t.auth.verifying}
                      </>
                    ) : (
                      <>
                        <span>{t.auth.verifyAndLogin}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Helper tip before OTP requested */}
              {!otpSent && (
                <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                  <span>Demo Tip: Click "Request Secure OTP" or choose a Persona tab above.</span>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Demo Persona Selector (Essential for Hackathon Judges) */}
          {authMode === 'demo' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs space-y-1">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.auth.demoPersonaTitle}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {t.auth.demoPersonaSubtitle}
                </p>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {Object.entries(personas).map(([key, p]) => (
                  <button
                    key={key}
                    onClick={() => handlePersonaLogin(key)}
                    className="w-full text-left p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-blue-500/50 transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        <span>{p.profile.full_name}</span>
                        <span className="text-[11px] font-normal px-2 py-0.2 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                          {p.profile.age}y • {p.profile.gender}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {p.profile.occupation} • {p.profile.district}, {p.profile.state}
                      </div>
                      <div className="text-[11px] text-emerald-400 font-medium">
                        Income: ₹{p.profile.annual_income.toLocaleString('en-IN')} / yr • {p.profile.social_category}
                      </div>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: MeriPehchan / DigiLocker National SSO */}
          {authMode === 'sso' && (
            <div className="space-y-4 text-center py-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                <Fingerprint className="w-7 h-7" />
              </div>

              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="font-bold text-white text-base">{t.auth.ssoTitle}</h3>
                <p className="text-slate-400 text-xs">{t.auth.ssoSubtitle}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-left space-y-1.5 text-slate-300">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Pre-verified e-KYC Identity
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Automatic Document Locker Synchronization
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Zero Manual Form Filling
                </div>
              </div>

              <button
                onClick={handleSsoLogin}
                disabled={isVerifying}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Connecting to DigiLocker...
                  </>
                ) : (
                  <>
                    <Fingerprint className="w-4 h-4" />
                    {t.auth.ssoBtn}
                  </>
                )}
              </button>
            </div>
          )}

          {/* Security & Data Privacy Notice */}
          <div className="mt-6 pt-5 border-t border-slate-800/80 text-[11px] text-slate-500 space-y-1.5 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-400">
              <Lock className="w-3 h-3 text-emerald-500" />
              <span>{t.auth.securityNotice}</span>
            </div>
            <p className="leading-relaxed">{t.auth.privacyPledge}</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>© 2026 CitizenScheme AI • Government of India Public Welfare Initiative</div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Universal Access</span>
            <span>•</span>
            <span>Strictly Non-Commercial</span>
            <span>•</span>
            <span>DPDP Act 2023 Compliant</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
