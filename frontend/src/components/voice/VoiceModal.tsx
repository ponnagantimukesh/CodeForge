import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Bot,
  CornerDownLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { apiService } from '../../services/api';
import { Language } from '../../types';

export const VoiceModal: React.FC = () => {
  const { isVoiceModalOpen, setVoiceModalOpen, language, setLanguage, profile, t } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Suggested voice prompts per language
  const suggestedVoicePrompts: Record<Language, string[]> = {
    en: [
      'Which schemes am I eligible for?',
      'What documents do I need for PM-KISAN?',
      'How do I apply for Ayushman Bharat PM-JAY?',
      'Show me scholarships for students in Telangana',
    ],
    te: [
      'నాకు ఏ ప్రభుత్వ పథకాలు వర్తిస్తాయి?',
      'నా వయస్సు 22 సంవత్సరాలు. నాకు ఏ ప్రభుత్వ పథకాలు ఉన్నాయి?',
      'PM-KISAN దరఖాస్తుకు ఏ పత్రాలు కావాలి?',
      'ఆయుష్మాన్ భారత్ హెల్త్ కార్డు ఎలా పొందాలి?',
    ],
    hi: [
      'मैं किन सरकारी योजनाओं के लिए पात्र हूँ?',
      'मेरी आयु 42 वर्ष है, मुझे कौन सी योजना मिलेगी?',
      'आयुष्मान भारत कार्ड के लिए आवश्यक दस्तावेज़ क्या हैं?',
      'पीएम-किसान योजना में आवेदन कैसे करें?',
    ],
  };

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recog = new SpeechRecognition();
        recog.continuous = false;
        recog.interimResults = true;
        recog.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';

        recog.onstart = () => {
          setIsListening(true);
        };

        recog.onresult = (event: any) => {
          let current = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            current += event.results[i][0].transcript;
          }
          setTranscript(current);
        };

        recog.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recog.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recog;
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [language]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      if (transcript) {
        handleSubmitQuery(transcript);
      }
    } else {
      setTranscript('');
      setResponse('');
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang =
            language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
          recognitionRef.current.start();
        } catch (e) {
          console.warn('Speech recog start error:', e);
        }
      } else {
        // Fallback simulation for unsupported browsers
        setTranscript(
          language === 'te'
            ? 'నాకు ఏ ప్రభుత్వ పథకాలు వర్తిస్తాయి?'
            : language === 'hi'
            ? 'मैं किन सरकारी योजनाओं के लिए पात्र हूँ?'
            : 'Which government schemes am I eligible for?'
        );
      }
    }
  };

  const handleSubmitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;
    setIsProcessing(true);
    try {
      const res = await apiService.askAssistant(queryText, language, undefined, profile);
      setResponse(res.reply);
      speakText(res.reply);
    } catch (err) {
      setResponse('Error retrieving scheme information.');
    } finally {
      setIsProcessing(false);
    }
  };

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks for clean speech
      const clean = text.replace(/[*_#•]/g, ' ');
      const utterance = new SpeechSynthesisUtterance(clean);
      utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.rate = 0.95;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden flex flex-col text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Mic className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                Voice Assistant Active
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </h3>
              <p className="text-[11px] text-slate-400">
                Multilingual Speech Interaction (English • తెలుగు • हिन्दी)
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              setVoiceModalOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voice Visualizer Area */}
        <div className="p-8 flex flex-col items-center justify-center text-center bg-radial from-blue-950/40 via-slate-900 to-slate-900 border-b border-slate-800">
          {/* Animated Waves */}
          <div className="h-16 flex items-center justify-center gap-1.5 mb-6">
            {isListening || isSpeaking ? (
              <>
                <div className="w-1.5 bg-amber-400 rounded-full animate-wave-1" />
                <div className="w-1.5 bg-blue-400 rounded-full animate-wave-2" />
                <div className="w-1.5 bg-emerald-400 rounded-full animate-wave-3" />
                <div className="w-1.5 bg-blue-500 rounded-full animate-wave-4" />
                <div className="w-1.5 bg-amber-300 rounded-full animate-wave-5" />
              </>
            ) : (
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
                <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
                <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
                <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
                <div className="w-1.5 h-3 bg-slate-700 rounded-full" />
              </div>
            )}
          </div>

          {/* Big Mic Button */}
          <button
            onClick={toggleListening}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-lg ${
              isListening
                ? 'bg-rose-600 text-white ring-8 ring-rose-600/30 scale-105'
                : 'bg-linear-to-tr from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:scale-105 shadow-blue-900/40'
            }`}
          >
            {isListening ? (
              <MicOff className="w-8 h-8 animate-pulse" />
            ) : (
              <Mic className="w-8 h-8" />
            )}
          </button>

          <p className="mt-4 text-sm font-medium text-slate-300">
            {isListening
              ? 'Listening... Speak your question now'
              : 'Tap microphone to speak'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Current Citizen: <span className="text-slate-300">{profile.full_name} ({profile.occupation})</span>
          </p>
        </div>

        {/* Transcript / Input Area */}
        <div className="p-5 space-y-4 max-h-72 overflow-y-auto">
          {/* Transcript Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
              <span>Your Question:</span>
              {transcript && (
                <button
                  onClick={() => handleSubmitQuery(transcript)}
                  disabled={isProcessing}
                  className="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold"
                >
                  Process <CornerDownLeft className="w-3 h-3" />
                </button>
              )}
            </div>
            <textarea
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              placeholder="Your spoken words will appear here, or type your query..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-600 resize-none focus:outline-hidden min-h-[44px]"
            />
          </div>

          {/* AI Response Output */}
          {response && (
            <div className="bg-blue-950/40 border border-blue-800/60 rounded-xl p-4 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between text-xs text-blue-400 font-semibold">
                <span className="flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-blue-400" /> AI Grounded Answer:
                </span>
                <button
                  onClick={() => (isSpeaking ? stopSpeaking() : speakText(response))}
                  className="p-1 rounded-md bg-blue-900/60 text-blue-200 hover:bg-blue-800 flex items-center gap-1 text-[11px]"
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-400" /> Stop Audio
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Listen
                    </>
                  )}
                </button>
              </div>
              <div className="text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {response}
              </div>
            </div>
          )}

          {/* Suggested Sample Questions */}
          <div>
            <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" /> Try Asking:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestedVoicePrompts[language].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setTranscript(prompt);
                    handleSubmitQuery(prompt);
                  }}
                  className="text-xs text-left bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700 rounded-lg px-3 py-1.5 transition-all"
                >
                  "{prompt}"
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>AI answers strictly verified from official schemes</span>
          <div className="flex items-center gap-2">
            {(['en', 'te', 'hi'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={`px-2 py-0.5 rounded-sm font-mono text-[11px] ${
                  language === l
                    ? 'bg-blue-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
