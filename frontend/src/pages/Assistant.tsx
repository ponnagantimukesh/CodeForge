import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  User,
  Send,
  Mic,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { apiService } from '../services/api';
import { ChatMessage, GovernmentScheme } from '../types';

export const Assistant: React.FC = () => {
  const { t, language, profile, setVoiceModalOpen, setActiveSchemeModal, schemes } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: t.assistant.greeting,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [copiedMsgId, setCopiedMsgId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    'Which schemes am I eligible for?',
    'What documents do I need for PM-KISAN?',
    'Explain Ayushman Bharat PM-JAY simply',
    'What benefit will I receive under Rythu Bharosa?',
    'Show schemes available in Telangana',
    'How do I apply for Atal Pension Yojana?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await apiService.askAssistant(text, language, undefined, profile);
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        related_schemes: res.related_schemes,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: 'I could not verify that information from the available scheme data.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleCopy = (msgId: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedMsgId(msgId);
    setTimeout(() => setCopiedMsgId(null), 2000);
  };

  const handleSpeak = (msgId: string, content: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMsgId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMsgId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const clean = content.replace(/[*_#•]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.lang = language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.onstart = () => setSpeakingMsgId(msgId);
    utterance.onend = () => setSpeakingMsgId(null);
    utterance.onerror = () => setSpeakingMsgId(null);
    window.speechSynthesis.speak(utterance);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: t.assistant.greeting,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMsgId(null);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col h-[calc(100vh-140px)] min-h-[550px] overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
              {t.assistant.title}
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </h2>
            <p className="text-[11px] text-slate-500">
              Grounded on official Central & State scheme guidelines • No Hallucinations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Mic className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Voice Mode</span>
          </button>
          <button
            onClick={clearChat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            title={t.assistant.clearChat}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                  isUser
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-blue-600 text-white shadow-xs'
                }`}
              >
                {isUser ? profile.full_name.charAt(0) : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-1.5 max-w-[85%]">
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-xs'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line font-sans">{msg.content}</div>

                  {/* Related scheme chips */}
                  {msg.related_schemes && msg.related_schemes.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                      {msg.related_schemes.map((rs: any) => (
                        <button
                          key={rs.id}
                          onClick={() => {
                            const found = schemes.find((s: GovernmentScheme) => s.id === rs.id);
                            if (found) setActiveSchemeModal(found);
                          }}
                          className="px-2.5 py-1 rounded-md bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold border border-blue-200 inline-flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          {rs.name} <ExternalLink className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bubble Meta (Timestamp & Tools) */}
                <div
                  className={`flex items-center gap-2 px-1 text-[10px] text-slate-400 ${
                    isUser ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <>
                      <span>•</span>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="hover:text-slate-700 flex items-center gap-0.5 cursor-pointer"
                        title="Copy text"
                      >
                        {copiedMsgId === msg.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> Copy
                          </>
                        )}
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => handleSpeak(msg.id, msg.content)}
                        className="hover:text-slate-700 flex items-center gap-0.5 cursor-pointer"
                        title="Read aloud"
                      >
                        {speakingMsgId === msg.id ? (
                          <>
                            <VolumeX className="w-3 h-3 text-rose-500" /> Stop
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3 h-3" /> Listen
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 max-w-xs mr-auto items-center">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3 bg-white border border-slate-200 rounded-2xl rounded-tl-none flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Chips */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white overflow-x-auto whitespace-nowrap flex items-center gap-2">
        <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1 shrink-0">
          <Sparkles className="w-3 h-3 text-amber-500" /> Suggestions:
        </span>
        {suggestedQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(q)}
            className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-full shrink-0 transition-colors cursor-pointer border border-slate-200"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Text Input Footer */}
      <div className="p-3 sm:p-4 border-t border-slate-200 bg-white flex items-center gap-2">
        <button
          onClick={() => setVoiceModalOpen(true)}
          className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
          title="Speak your question"
        >
          <Mic className="w-5 h-5 text-amber-600" />
        </button>

        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          placeholder={t.assistant.placeholder}
          className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputMessage.trim() || isTyping}
          className={`p-2.5 rounded-xl font-bold text-white transition-all cursor-pointer ${
            !inputMessage.trim() || isTyping
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 shadow-xs'
          }`}
          aria-label="Send message"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
