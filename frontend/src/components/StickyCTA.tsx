import React, { useState, useEffect } from 'react';
import { Calculator, X } from 'lucide-react';

interface StickyCTAProps {
  onOpenCalc: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onOpenCalc }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!isDismissed) {
        setIsVisible(window.scrollY > 400);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => setIsDismissed(true)}
        className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors shadow-lg"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={onOpenCalc}
        className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3.5 rounded-full font-black text-sm shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all border border-white/10"
      >
        <Calculator className="w-4 h-4" />
        Beregn din pris
      </button>
    </div>
  );
};
