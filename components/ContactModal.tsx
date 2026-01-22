import React, { useState, useEffect } from 'react';
import { X, Send, Mail, MessageSquare, Check, ArrowRight, Loader2, Globe, Server } from 'lucide-react';



interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  pricingSelections?: Record<string, any>;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, pricingSelections }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1 = pris, 2 = email/besked, 3 = tak
  const [email, setEmail] = useState("");
  const [intro, setIntro] = useState("");
  const [hasDomain, setHasDomain] = useState(false);
  const [hasHosting, setHasHosting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setEmail("");
      setIntro("");
      setHasDomain(false);
      setHasHosting(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!email) return;
    setIsLoading(true);

    // Simuler afsendelse
    setTimeout(() => {
      setIsLoading(false);
      setStep(3); // gå til "tak" step
    }, 1500);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
      <div className="relative bg-slate-900 w-full max-w-2xl rounded-2xl shadow-2xl border border-white/10 p-8">
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full">
          <X className="w-5 h-5" />
        </button>

        {step === 1 && (
          <div>
            <h2 className="text-white font-black text-2xl mb-4">Din prisberegning</h2>
            <div className="text-slate-300 space-y-2">
              {pricingSelections ? (
                Object.entries(pricingSelections).map(([key, value]) => (
                  <p key={key}><span className="font-bold text-white">{key}:</span> {value}</p>
                ))
              ) : (
                <p>Ingen prisdata tilgængelig.</p>
              )}
            </div>
            <button
              onClick={() => setStep(2)}
              className="mt-6 w-full py-4 bg-emerald-600 text-white font-bold rounded-xl shadow hover:bg-emerald-500 transition"
            >
              Næste
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-white font-black text-2xl mb-4">Send Forespørgsel</h2>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Din Email</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="navn@virksomhed.dk"
                />
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Kort Introduktion</label>
              <div className="relative mt-1">
                <textarea
                  value={intro}
                  onChange={(e) => setIntro(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950 border border-white/10 rounded-xl text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none"
                  placeholder="Hej, jeg har en virksomhed der..."
                />
                <MessageSquare className="absolute left-3 top-3 w-5 h-5 text-slate-500" />
              </div>
            </div>

            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer mt-2">
              <input type="checkbox" className="sr-only" checked={hasDomain} onChange={e => setHasDomain(e.target.checked)} />
              <Globe className="w-4 h-4 text-slate-400" />
              <span className={`text-sm font-bold ${hasDomain ? 'text-white' : 'text-slate-300'}`}>Jeg har domæne</span>
            </label>

            <label className="flex items-center gap-3 p-4 border rounded-xl cursor-pointer">
              <input type="checkbox" className="sr-only" checked={hasHosting} onChange={e => setHasHosting(e.target.checked)} />
              <Server className="w-4 h-4 text-slate-400" />
              <span className={`text-sm font-bold ${hasHosting ? 'text-white' : 'text-slate-300'}`}>Jeg har hosting</span>
            </label>

            <button
              onClick={handleSend}
              disabled={!email || isLoading}
              className={`w-full py-4 mt-4 font-bold text-white rounded-xl ${!email || isLoading ? 'bg-slate-800 opacity-50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'}`}
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Send Besked'}
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4">
            <Check className="w-12 h-12 text-green-400 mx-auto" />
            <h3 className="text-2xl font-black text-white">Tak for din besked!</h3>
            <p className="text-slate-400">Vi har modtaget din forespørgsel og vender tilbage til <span className="font-bold text-white">{email}</span>.</p>
            <button onClick={handleClose} className="mt-4 px-8 py-3 bg-slate-800 text-white rounded-xl hover:bg-slate-700">
              Tilbage til forsiden
            </button>
          </div>
        )}

      </div>
    </div>
  );
};