import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, User } from 'lucide-react';
import { ChatMessage } from '../types';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { Chat, GenerateContentResponse } from '@google/genai';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm your Virtual Science Tutor. I can help you with Physics, Chemistry, Biology, Math, or CS labs. What are you working on today?",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Store chat session ref so it persists across renders
  const chatSessionRef = useRef<Chat | null>(null);

  useEffect(() => {
    chatSessionRef.current = createChatSession();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Add a placeholder message for the AI while streaming/thinking
      const tempId = 'temp-' + Date.now();
      setMessages((prev) => [...prev, { id: tempId, role: 'model', text: '', timestamp: Date.now(), isThinking: true }]);

      const result = await sendMessageToGemini(chatSessionRef.current, userMsg.text);
      
      let fullText = '';
      for await (const chunk of result) {
          const c = chunk as GenerateContentResponse;
          if (c.text) {
            fullText += c.text;
             setMessages((prev) => 
                prev.map(msg => msg.id === tempId ? { ...msg, text: fullText, isThinking: false } : msg)
            );
          }
      }

    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: "I'm having trouble connecting to the neural network right now. Please check your API key configuration.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-24 px-4 md:px-12 lg:px-32 min-h-screen flex flex-col pb-8">
      <div className="flex-1 glass-panel rounded-3xl overflow-hidden flex flex-col shadow-2xl border border-purple-500/20">
        
        {/* Header */}
        <div className="bg-purple-900/20 p-6 border-b border-white/10 flex items-center gap-4 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
             <Bot className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              AI Lab Assistant <Sparkles size={16} className="text-yellow-400 animate-pulse"/>
            </h1>
            <p className="text-xs text-purple-300">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-black/20 scrollbar-thin">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'model' ? 'bg-purple-600' : 'bg-blue-600'
              }`}>
                  {msg.role === 'model' ? <Bot size={16}/> : <User size={16}/>}
              </div>
              
              <div className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl leading-relaxed text-sm md:text-base ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(37,99,235,0.3)]' 
                  : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5 backdrop-blur-sm'
              }`}>
                {msg.isThinking && msg.text === '' ? (
                   <div className="flex gap-1 h-6 items-center">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                   </div>
                ) : (
                    <span className="whitespace-pre-wrap">{msg.text}</span>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-black/30 border-t border-white/10">
            <div className="relative flex items-center">
                <input 
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-14 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all"
                    placeholder="Ask about Physics, Chemistry, Math..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                    disabled={isLoading}
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-600/30"
                >
                    <Send size={18} />
                </button>
            </div>
            <p className="text-center text-[10px] text-gray-600 mt-2">AI can make mistakes. Check important info.</p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
