import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { submitCookieConsent } from '../services/api';

interface CookieBannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ isOpen, onClose }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setShowBanner(false);
    }
  }, [isOpen]);

  const handleConsent = async (status: 'accepted_all' | 'necessary_only' | 'declined') => {
    localStorage.setItem('cookie_consent', status);
    setShowBanner(false);
    
    try {
      await submitCookieConsent(status);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {showBanner && !showModal && (
        <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
          <div className="max-w-6xl mx-auto bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl shadow-2xl shadow-none p-6 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
            
            <div className="flex-1">
              <p className="text-brand-muted text-sm leading-relaxed font-medium">
                Vi bruger cookies for at give dig den bedste oplevelse. Læs vores cookiepolitik for at lære mere.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button 
                onClick={() => setShowModal(true)} 
                className="text-white hover:text-white underline text-sm font-medium mr-2"
              >
                Cookiepolitik
              </button>
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button
                  onClick={() => handleConsent('declined')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-border bg-brand-card text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-card transition-colors"
                >
                  Afvis
                </button>
                <button
                  onClick={() => handleConsent('necessary_only')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-brand-border bg-brand-card text-white font-bold text-xs uppercase tracking-wider hover:bg-brand-card transition-colors whitespace-nowrap"
                >
                  Kun nødvendige
                </button>
                <button
                  onClick={() => handleConsent('accepted_all')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 shadow-lg shadow-none transition-colors whitespace-nowrap"
                >
                  Accepter alle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-brand-bg backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-brand-bg w-full max-w-xl rounded-[2rem] shadow-2xl border border-brand-border flex flex-col animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="p-8 pb-6 bg-brand-bg border-b border-brand-border relative">
              <button onClick={() => { setShowModal(false); onClose(); if (!localStorage.getItem('cookie_consent')) setShowBanner(true); }} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full text-brand-muted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-black text-white italic tracking-tight">Cookiepolitik for MST Studios</h2>
            </div>
            
            <div className="p-8 space-y-6 text-brand-muted text-sm leading-relaxed font-medium">
              <p>Vi bruger følgende typer cookies:</p>
              
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base">Nødvendige cookies:</h4>
                <p className="text-brand-muted">Disse er nødvendige for at hjemmesiden fungerer korrekt og kan ikke slås fra.</p>
              </div>

              <div className="space-y-1">
                <h4 className="text-white font-bold text-base">Analytiske cookies:</h4>
                <p className="text-brand-muted">Vi bruger anonyme data til at forstå hvordan besøgende bruger vores hjemmeside, så vi kan forbedre den.</p>
              </div>

              <p>Vi deler ikke dine data med tredjeparter til markedsføringsformål.</p>
              <p>Du kan til enhver tid ændre dine cookie-præferencer ved at klikke på "Cookiepolitik" i sidens footer.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
