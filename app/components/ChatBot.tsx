'use client';

import { useState, useRef, useEffect } from 'react';
import { Message, ChatResponse } from '../types/chat';

const MOOD_COLORS: Record<string, string> = {
  existential: 'bg-purple-500',
  conspiratorial: 'bg-red-500',
  poetic: 'bg-pink-500',
  confused: 'bg-yellow-500',
  philosophical: 'bg-blue-500',
  dramatic: 'bg-orange-500',
  forgetful: 'bg-gray-500',
  easter_egg: 'bg-green-500'
};

const MOOD_LABELS: Record<string, string> = {
  existential: 'Mode Existentiel',
  conspiratorial: 'Mode Conspirationniste',
  poetic: 'Mode Poétique',
  confused: 'Mode Confus',
  philosophical: 'Mode Philosophique',
  dramatic: 'Mode Dramatique',
  forgetful: 'Mode Tête en l\'air',
  easter_egg: 'Easter Egg!'
};

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Bonjour! Je suis Le Professeur Confus, docteur en Philosophie Approximative et maître ès Pensées Décousues. Posez-moi n\'importe quelle question, et je vous garantis une réponse... quelque part entre le génie et l\'absurde total! 🎓',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState<string>('philosophical');
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input,
          history: messages
        }),
      });

      const data: ChatResponse = await response.json();

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: data.timestamp
      };

      setMessages(prev => [...prev, assistantMessage]);
      if (data.mood) {
        setCurrentMood(data.mood);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Ah! Une erreur quantique dans la matrice! Ou peut-être que les serveurs méditent... Réessayez, l\'univers vous le rendra! 🌌',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating chat button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 group"
          aria-label="Ouvrir le chat avec Le Professeur Confus"
        >
          <div className="relative">
            {/* Pulsing ring animation */}
            <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-75"></div>

            {/* Main button */}
            <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-4 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110">
              {/* Professor icon */}
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Discutez avec Le Professeur Confus!
              <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-gray-900"></div>
            </div>
          </div>
        </button>
      )}

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border-2 border-purple-500/30 dark:border-purple-500/50 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-2xl">🎓</span>
                </div>
                <div>
                  <h3 className="font-bold text-lg">Le Professeur Confus</h3>
                  <p className="text-xs text-white/80">Philosophe du Dimanche</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
                aria-label="Fermer le chat"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Current mood indicator */}
            <div className="flex items-center gap-2 text-xs">
              <div className={`w-2 h-2 rounded-full ${MOOD_COLORS[currentMood]} animate-pulse`}></div>
              <span className="text-white/90">{MOOD_LABELS[currentMood]}</span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100 shadow-md'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-1 text-xs opacity-70">
                      <span>🎓</span>
                      <span className="font-semibold">Le Professeur</span>
                    </div>
                  )}
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className={`text-xs mt-1 ${msg.role === 'user' ? 'text-white/70' : 'text-gray-500 dark:text-gray-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('fr-FR', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 rounded-2xl px-4 py-3 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">Le Professeur réfléchit...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={sendMessage} className="p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Posez votre question..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:text-white text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 font-medium text-sm"
              >
                Envoyer
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              Propulsé par Hugging Face 🤗
            </p>
          </form>
        </div>
      )}
    </>
  );
}
