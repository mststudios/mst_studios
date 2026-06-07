import React, { useState, useEffect } from 'react';
import { submitCookieConsent } from '../services/api';

interface CookieBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ isOpen, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
    }
  }, [isOpen]);

  const handleConsent = async (status: 'accepted' | 'declined') => {
    localStorage.setItem('cookie_consent', status);
    setShow(false);
    onClose();
    
    try {
      await submitCookieConsent(status);
    } catch (e) {
      console.error(e);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
        
        <p className="text-slate-300 text-sm leading-relaxed font-medium">
          Vi bruger cookies for at forbedre din oplevelse på siden.
        </p>

        <div className="flex gap-3 w-full md:w-auto shrink-0">
          <button
            onClick={() => handleConsent('declined')}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl border border-white/10 bg-slate-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors"
          >
            Afvis
          </button>
          <button
            onClick={() => handleConsent('accepted')}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-colors"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  );
};
