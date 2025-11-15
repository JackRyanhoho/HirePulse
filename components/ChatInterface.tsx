
import React, { useState, useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';
import { Icon } from './ui/Icon';
import { CandidateCard } from './CandidateCard';

interface ChatInterfaceProps {
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  onSelectCandidate: (candidateId: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, onSelectCandidate }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[65vh] md:h-[70vh]">
      <div className="flex-1 overflow-y-auto pr-4 -mr-4 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                <Icon name="logo" className="h-5 w-5 text-white" />
              </div>
            )}
            <div className={`max-w-md lg:max-w-lg p-3 rounded-lg ${
              msg.sender === 'user'
                ? 'bg-primary-600 text-white rounded-br-none'
                : 'bg-slate-100 text-slate-800 rounded-bl-none'
            }`}>
              {msg.isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                  <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                </div>
              ) : (
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              )}
               {msg.candidates && msg.candidates.length > 0 && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                  {msg.candidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} onSelectCandidate={onSelectCandidate} />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-6">
        <form onSubmit={handleSend} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about candidates..."
            className="w-full pl-4 pr-12 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-900"
          />
          <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 disabled:bg-slate-300 transition-colors">
            <Icon name="send" />
          </button>
        </form>
      </div>
    </div>
  );
};
