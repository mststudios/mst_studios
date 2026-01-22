
import React, { useEffect } from 'react';
import { X, Shield, Lock, Eye, Database, Share2, UserCheck, Mail, Phone, FileText } from 'lucide-react';
import { EMAIL_ADDRESS, PHONE_NUMBER } from '../constants';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  
  // Håndter scroll lock og ESC tast
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleEsc);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
      
      <div 
        className="bg-slate-900 w-full max-w-2xl max-h-[90vh] rounded-[2rem] shadow-2xl border border-white/10 flex flex-col animate-in zoom-in-95 duration-300 relative shadow-blue-900/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Gradient Strip */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Section */}
        <div className="p-8 pb-6 bg-slate-900 border-b border-white/5 relative shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-slate-800 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white italic tracking-tight">Privatlivspolitik</h2>
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest mt-1">
                <Lock className="w-3 h-3" />
                <span>Dine data er sikre hos os</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-slate-950/30">
          <div className="space-y-8 text-slate-400 leading-relaxed">
            
            {/* 1. Intro */}
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5">
              <p className="text-sm">
                Vi går op i gennemsigtighed. Denne politik forklarer kort og præcist, hvilke oplysninger vi indsamler, hvorfor vi gør det, og hvordan vi passer på dem. Vi indsamler kun det nødvendige for at kunne levere en professionel service.
              </p>
            </div>

            {/* 2. Indsamlet data */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-400" /> Hvilke data indsamler vi?
              </h3>
              <ul className="grid sm:grid-cols-2 gap-3">
                {['Navn', 'E-mailadresse', 'Telefonnummer', 'Beskeder via formular'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-slate-900 p-3 rounded-lg border border-white/5 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Formål */}
            <div>
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Database className="w-5 h-5 text-emerald-400" /> Hvad bruger vi data til?
              </h3>
              <p className="text-sm mb-3">Dine oplysninger bruges udelukkende til følgende formål:</p>
              <ul className="space-y-2 text-sm pl-4 border-l-2 border-white/10">
                <li>• At besvare dine henvendelser og give dig tilbud.</li>
                <li>• At levere den aftalte webløsning.</li>
                <li>• At kunne fakturere for udført arbejde.</li>
              </ul>
            </div>

            {/* 4. Opbevaring & Deling */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-blue-400" /> Opbevaring
                </h3>
                <p className="text-xs">
                  Vi gemmer dine data, så længe det er relevant for vores samarbejde eller påkrævet i henhold til bogføringsloven (typisk 5 år for fakturaer). Herefter slettes de.
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                  <Share2 className="w-5 h-5 text-pink-400" /> Deling
                </h3>
                <p className="text-xs">
                  Vi sælger <strong>aldrig</strong> dine data. Vi deler kun data med tekniske underleverandører, der er nødvendige for driften (f.eks. hosting, mail-system eller betalingsløsning).
                </p>
              </div>
            </div>

            {/* 5. Rettigheder */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-white/10">
              <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-yellow-400" /> Dine Rettigheder (GDPR)
              </h3>
              <div className="grid gap-4 text-sm">
                <div className="flex gap-3">
                  <Eye className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Ret til indsigt</strong>
                    Du kan altid få oplyst, hvilke data vi har på dig.
                  </div>
                </div>
                <div className="flex gap-3">
                  <X className="w-5 h-5 text-slate-500 shrink-0" />
                  <div>
                    <strong className="text-white block">Ret til sletning</strong>
                    Du kan til enhver tid bede om at få slettet dine oplysninger, såfremt det ikke strider mod bogføringsloven.
                  </div>
                </div>
              </div>
            </div>

            {/* 6. Kontakt */}
            <div className="border-t border-white/10 pt-6 mt-2">
              <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-4">Kontakt Dataansvarlig</h3>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href={`mailto:${EMAIL_ADDRESS}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{EMAIL_ADDRESS}</span>
                </a>
                <a href={`tel:${PHONE_NUMBER.replace(/\s/g, '')}`} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{PHONE_NUMBER}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Close Action */}
        <div className="p-6 bg-slate-900 border-t border-white/5 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-white/10 hover:border-white/30"
          >
            Luk vindue
          </button>
        </div>

      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};
