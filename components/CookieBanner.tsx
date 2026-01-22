import React, { useState, useEffect } from 'react';
import { Cookie, X, ShieldCheck, BarChart3, Server, Check } from 'lucide-react';
import { API_BASE_URL } from '../constants';



interface CookieBannerProps {
  isOpen: boolean; // Styres fra footer
  onClose: () => void;
}

interface CookieConsent {
  necessary: boolean;
  statistics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ isOpen, onClose }) => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [preferences, setPreferences] = useState({
    necessary: true,
    statistics: false,
    marketing: false
  });

  useEffect(() => {
    const storedConsent = localStorage.getItem('mst_cookie_consent');

    if (!storedConsent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const parsed = JSON.parse(storedConsent);
        setPreferences({
          necessary: true,
          statistics: parsed.statistics || false,
          marketing: parsed.marketing || false
        });
      } catch (e) {
        console.error("Cookie parse error", e);
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShowBanner(false);
      setShowSettings(true);
    }
  }, [isOpen]);

  const saveConsent = async (stats: boolean, marketing: boolean) => {
    const consentData: CookieConsent = {
      necessary: true,
      statistics: stats,
      marketing: marketing,
      timestamp: new Date().toISOString()
    };

    localStorage.setItem('mst_cookie_consent', JSON.stringify(consentData));

    // Fire and forget - Send to backend
    const status = stats && marketing ? 'accepted' : (stats || marketing ? 'custom' : 'rejected');

    fetch(`${API_BASE_URL}/cookie-consent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
        userAgent: navigator.userAgent
      }),
    }).catch(err => console.error("Cookie consent log failed", err));

    setPreferences({ necessary: true, statistics: stats, marketing: marketing });
    setShowBanner(false);
    setShowSettings(false);
    onClose();
  };

  const handleAcceptAll = () => saveConsent(true, true);
  const handleRejectAll = () => saveConsent(false, false);
  const handleSavePreferences = () => saveConsent(preferences.statistics, preferences.marketing);

  if (!showBanner && !showSettings) return null;

  return (
    <>
      {/* BANNER */}
      {showBanner && !showSettings && (
        <div className="fixed bottom-0 left-0 right-0 z-[150] p-4 md:p-6 animate-in slide-in-from-bottom-10 duration-500">
          <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-blue-900/20 p-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20">
                <Cookie className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-1">Vi bruger cookies</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Vi bruger cookies til at sikre, at hjemmesiden fungerer optimalt (nødvendige) og til at forbedre brugeroplevelsen via anonymiseret statistik og markedsføring. Vi deler ikke persondata uden samtykke.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => setShowSettings(true)}
                className="px-6 py-3 rounded-xl border border-white/10 text-slate-300 font-bold text-xs uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                Indstillinger
              </button>
              <button
                onClick={handleRejectAll}
                className="px-6 py-3 rounded-xl border border-white/10 bg-slate-800 text-white font-bold text-xs uppercase tracking-wider hover:bg-slate-700 transition-colors"
              >
                Kun nødvendige
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-blue-500 shadow-lg shadow-blue-900/30 transition-colors"
              >
                Accepter alle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL */}
      {showSettings && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div
            className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl border border-white/10 flex flex-col animate-in zoom-in-95 duration-300 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="p-8 pb-6 bg-slate-900 border-b border-white/5 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
              <button onClick={() => { setShowSettings(false); onClose(); }} className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg border border-white/10">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-white italic tracking-tight">Cookiepolitik</h2>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Dine data, dit valg</p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-950/50 space-y-6">
              {/* Nødvendige */}
              <div className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-start gap-4 opacity-75">
                <ShieldCheck className="w-5 h-5 text-emerald-500 mt-1" />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-white font-bold text-sm">Nødvendige (Altid aktive)</h4>
                    <div className="text-[10px] font-black uppercase text-emerald-500 tracking-wider flex items-center gap-1">
                      <Check className="w-3 h-3" /> Påkrævet
                    </div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Disse cookies er nødvendige for, at hjemmesiden kan fungere (f.eks. navigation, sikkerhed og denne cookie-boks). De kan ikke fravælges.
                  </p>
                </div>
              </div>

              {/* Statistik */}
              <label className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-start gap-4 cursor-pointer group hover:border-blue-500/30 transition-colors">
                <BarChart3 className={`w-5 h-5 mt-1 ${preferences.statistics ? 'text-blue-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-white font-bold text-sm group-hover:text-blue-300 transition-colors">Statistik & Analyse</h4>
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.statistics}
                      onChange={(e) => setPreferences({ ...preferences, statistics: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer-checked:bg-blue-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Hjælper os med at forstå, hvordan besøgende interagerer med hjemmesiden anonymt via Google Analytics.
                  </p>
                </div>
              </label>

              {/* Marketing */}
              <label className="bg-slate-900 border border-white/10 rounded-xl p-5 flex items-start gap-4 cursor-pointer group hover:border-purple-500/30 transition-colors">
                <Server className={`w-5 h-5 mt-1 ${preferences.marketing ? 'text-purple-400' : 'text-slate-600'}`} />
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-white font-bold text-sm group-hover:text-purple-300 transition-colors">Marketing</h4>
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={preferences.marketing}
                      onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer-checked:bg-purple-600 relative after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Bruges til personaliseret indhold og annoncer. Vi deler kun data med tredjepart hvis du accepterer.
                  </p>
                </div>
              </label>
            </div>

            {/* FOOTER */}
            <div className="p-6 bg-slate-900 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <button
                onClick={() => { setShowSettings(false); onClose(); }}
                className="text-slate-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Annuller ændringer
              </button>
              <button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto px-8 py-3 bg-white text-slate-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-lg"
              >
                Gem præferencer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
