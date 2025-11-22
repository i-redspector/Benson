import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Sparkles, ChevronRight } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';

const SUGGESTIONS = [
  "How can I invest?",
  "Tell me about TG4",
  "What is your philosophy?",
  "Contact support"
];

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'system', text: 'Welcome to Benson Global. I am your AI Concierge. How may I assist you with your wealth architecture today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const responseText = await sendMessageToGemini(messages, textToSend);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="relative group bg-bg-gold text-black w-16 h-16 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
        >
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20"></div>
          <MessageSquare className="w-7 h-7 group-hover:rotate-3 transition-transform" />
          <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></span>
        </button>
      )}

      {isOpen && (
        <div className="w-[360px] md:w-[420px] h-[650px] max-h-[80vh] bg-[#0f0f0f]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up ring-1 ring-white/5">
          {/* Header */}
          <div className="bg-bg-charcoal/80 p-5 border-b border-white/5 flex justify-between items-center backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bg-gold to-yellow-600 flex items-center justify-center shadow-lg">
                        <Sparkles className="w-5 h-5 text-black" />
                    </div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-bg-charcoal rounded-full"></div>
                </div>
                <div>
                    <h3 className="font-serif text-white font-medium text-lg tracking-wide">Concierge</h3>
                    <p className="text-[10px] text-bg-gold uppercase tracking-widest opacity-80">
                        Always On
                    </p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 bg-gradient-to-b from-black/50 to-transparent">
            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-bg-gold text-black rounded-tr-none font-medium' 
                    : 'bg-[#1c1c1c] text-gray-200 border border-white/5 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-[#1c1c1c] p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-bg-gold" />
                  <span className="text-xs text-gray-500">Consulting knowledge base...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {messages.length < 3 && !loading && (
            <div className="px-5 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                {SUGGESTIONS.map(s => (
                    <button 
                        key={s}
                        onClick={() => handleSend(s)}
                        className="whitespace-nowrap px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-gray-400 hover:bg-bg-gold hover:text-black hover:border-bg-gold transition-all"
                    >
                        {s}
                    </button>
                ))}
            </div>
          )}

          {/* Input */}
          <div className="p-5 bg-bg-charcoal/50 border-t border-white/5 backdrop-blur-sm">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your inquiry..."
                className="w-full bg-black/50 border border-white/10 rounded-full pl-5 pr-12 py-3 text-sm text-white focus:outline-none focus:border-bg-gold/50 focus:ring-1 focus:ring-bg-gold/20 transition-all placeholder-gray-600"
              />
              <button 
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="absolute right-1.5 p-2 bg-bg-gold text-black rounded-full hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-bg-gold shadow-sm"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;