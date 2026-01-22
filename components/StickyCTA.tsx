
import React from 'react';
import { Calculator } from 'lucide-react';

interface StickyCTAProps {
  onOpenCalc: () => void;
}

export const StickyCTA: React.FC<StickyCTAProps> = ({ onOpenCalc }) => {
  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:hidden pointer-events-none">
      <button 
        onClick={onOpenCalc}
        className="pointer-events-auto w-full flex items-center justify-between bg-slate-900 text-white p-4 rounded-2xl shadow-2xl active:scale-95 transition-transform border border-white/10 shadow-blue-900/50 backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600/20 p-2 rounded-lg border border-blue-500/30">
            <Calculator className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Hvad koster din side?</span>
            <span className="text-md font-extrabold tracking-tight italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Beregn din pris nu</span>
          </div>
        </div>
        <div className="bg-white text-slate-900 px-4 py-2 rounded-xl font-black text-xs uppercase shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          Start
        </div>
      </button>
    </div>
  );
};
