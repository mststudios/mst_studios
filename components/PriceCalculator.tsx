import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Mail, Server, Loader2 } from 'lucide-react';
import { CALCULATOR_STEPS, API_BASE_URL } from '../constants';

interface PriceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalize: (summary: string, selections: Record<string, any>) => void;
}

// Define strict types for selections
type SelectionState = Record<string, string | string[]>;

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ isOpen, onClose, onFinalize }) => {

  const [currentStep, setCurrentStep] = useState(0); // 0-2: Questions, 3: Email, 4: Confirmation
  const [selections, setSelections] = useState<SelectionState>({});

  // User Form State
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // Price State for the "Price Box"
  const [totalPrice, setTotalPrice] = useState(0);
  const [monthlyPrice, setMonthlyPrice] = useState(0);

  // Reset on Open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setEmail("");
      setMessage("");
      setIsSending(false);
      // Keep selections? Maybe clear them. Let's clear for fresh start.
      setSelections({});
    }
  }, [isOpen]);

  // Calculate Prices Dynamically
  useEffect(() => {
    let price = 0;
    let monthly = 0;

    Object.keys(selections).forEach(stepId => {
      const step = CALCULATOR_STEPS.find(s => s.id === stepId);
      const selection = selections[stepId];
      if (!step) return;

      const optsToCheck = Array.isArray(selection) ? selection : [selection];

      optsToCheck.forEach(selId => {
        const opt = step.options.find(o => o.id === selId);
        if (opt) {
          price += opt.minPrice;
          monthly += opt.monthlyPrice;
        }
      });
    });




    setTotalPrice(price);
    setMonthlyPrice(monthly);
  }, [selections]);

  if (!isOpen) return null;

  const handleOptionClick = (stepId: string, optionId: string, isMulti?: boolean) => {
    if (isMulti) {
      const current = (selections[stepId] as string[]) || [];
      const next = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      setSelections({ ...selections, [stepId]: next });
    } else {
      setSelections({ ...selections, [stepId]: optionId });
      // Auto advance for single select if not last step
      if (currentStep < 2) {
        setTimeout(() => setCurrentStep(prev => prev + 1), 300);
      }
    }
  };

  const isStepComplete = () => {
    if (currentStep >= 3) return true; // Step 4/5 handled differently
    const step = CALCULATOR_STEPS[currentStep];
    if (step.isMulti) return true; // Multi-select can be skipped/empty effectively
    return !!selections[step.id];
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const formatSelectionSummary = () => {
    let text = "Prisberegner Valg:\n";
    CALCULATOR_STEPS.forEach(step => {
      const sel = selections[step.id];
      if (sel) {
        text += `\n${step.question}\n`;
        const opts = Array.isArray(sel) ? sel : [sel];
        opts.forEach(optId => {
          const opt = step.options.find(o => o.id === optId);
          if (opt) text += `- ${opt.label}\n`;
        });
      }
    });
    text += `\nEstimeret Pris: ${totalPrice} kr.\nMånedlig: ${monthlyPrice} kr.`;
    return text;
  };

  const handleSend = async () => {
    if (!email) return;
    setIsSending(true);

    const summary = formatSelectionSummary();
    onFinalize(summary, selections);

    try {
      // Construct the payload matching backend expectations
      const payload = {
        email,
        message,
        selections,
        priceEstimate: summary, // Passing the summary string as expected
        totalPrice,
        monthlyPrice
      };

      const response = await fetch(`${API_BASE_URL}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Backend responded with an error');
      }

      setCurrentStep(4); // Go to Green Success Popup
    } catch (e) {
      console.error(e);
      alert("Der opstod en fejl. Prøv igen.");
    } finally {
      setIsSending(false);
    }
  };

  // ----------------------------------------------------------------------------------
  // RENDER HELPERS
  // ----------------------------------------------------------------------------------

  // STEP 5: CONFIRMATION (Green Popup)
  if (currentStep === 4) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-emerald-900/90 w-full max-w-lg rounded-2xl shadow-2xl border border-emerald-500/30 p-8 text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-emerald-400"></div>

          <div className="mx-auto w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 border border-emerald-500/40">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>

          <h2 className="text-2xl font-black text-white mb-4">Tak for din henvendelse!</h2>
          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
            Din besked er blevet sendt. Jeg kontakter dig snarest med yderligere info.
          </p>

          <button
            onClick={onClose}
            className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors"
          >
            Luk
          </button>
        </div>
      </div>
    );
  }

  // WRAPPER FOR STEPS 1-4
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-slate-900/95 w-full max-w-xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 relative shadow-blue-900/20 h-[700px] md:h-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.02]">
          <div>
            <h3 className="text-xl font-black text-white italic tracking-tight">Prisberegner</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
              Trin {currentStep + 1} af 4 {/* We show 4 steps visibly in bar */}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar (25% per step 1-4) */}
        <div className="h-1 bg-slate-800 w-full overflow-hidden shrink-0">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out box-content"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>

        {/* CONTENT AREA */}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">

          {/* STEP 4: CONTACT FORM */}
          {currentStep === 3 ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 leading-tight italic">Send Forespørgsel</h2>
                <p className="text-slate-400 text-sm font-medium">Udfyld formularen, så kontakter jeg dig for en uforpligtende samtale om dit website.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Afsender</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Her skriver du den email, jeg senere henvender mig til"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Besked</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Beskriv kort dit projekt, og angiv de tidspunkter jeg bedst muligt kan kontakte dig"
                    rows={5}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 resize-none"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* STEPS 1-3: SELECTION */
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2 leading-tight italic">
                  {CALCULATOR_STEPS[currentStep].question}
                </h2>
                <p className="text-slate-400 text-sm font-medium">
                  {CALCULATOR_STEPS[currentStep].description}
                </p>
              </div>

              <div className="space-y-3">
                {CALCULATOR_STEPS[currentStep].options.map((opt) => {
                  const isSelected = CALCULATOR_STEPS[currentStep].isMulti
                    ? (Array.isArray(selections[CALCULATOR_STEPS[currentStep].id]) && (selections[CALCULATOR_STEPS[currentStep].id] as string[]).includes(opt.id))
                    : selections[CALCULATOR_STEPS[currentStep].id] === opt.id;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(CALCULATOR_STEPS[currentStep].id, opt.id, CALCULATOR_STEPS[currentStep].isMulti)}
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 group relative overflow-hidden ${isSelected
                        ? 'border-blue-500/50 bg-blue-900/20 shadow-lg shadow-blue-500/10'
                        : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                        }`}
                    >
                      <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
                        }`}>
                        {opt.icon}
                      </div>
                      <div className="flex-1">
                        <p className={`font-bold text-sm ${isSelected ? 'text-blue-300' : 'text-white'}`}>{opt.label}</p>
                        <p className="text-xs text-slate-400 leading-relaxed mt-0.5">{opt.sub}</p>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-blue-400" />}
                    </button>
                  );
                })}
              </div>

              {/* DYNAMIC PRICE BOX - ONLY ON STEP 3 (Index 2) */}
              {currentStep === 2 && (
                <div className="mt-8 p-4 bg-slate-950 border border-white/10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2">
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Estimeret pris for din hjemmeside:</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-white">{totalPrice.toLocaleString('da-DK')} kr.</span>
                      {monthlyPrice > 0 && (
                        <span className="text-sm text-emerald-400 font-bold">(+{monthlyPrice} kr/md for vedligehold)</span>
                      )}
                    </div>
                  </div>
                  {/* Optional visual indicator or miniature chart could go here */}
                </div>
              )}
            </div>
          )}
        </div>

        {/* FOOTER NAV */}
        <div className="px-8 py-6 bg-slate-900 border-t border-white/5 flex items-center justify-between shrink-0">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest pl-2"
            >
              <ChevronLeft className="w-4 h-4" /> Tilbage
            </button>
          ) : (
            <div></div> // Spacer
          )}

          {currentStep === 3 ? (
            <button
              onClick={handleSend}
              disabled={!email || isSending}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${!email || isSending
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 hover:scale-105 active:scale-95'
                }`}
            >
              {isSending ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Send Besked <Mail className="w-4 h-4" /></>}
            </button>
          ) : (
            <button
              disabled={!isStepComplete()}
              onClick={handleNext}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${isStepComplete()
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:scale-105 active:scale-95'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
            >
              Næste <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};
