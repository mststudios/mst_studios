import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check, Mail, Server, Loader2 } from 'lucide-react';
import { CALCULATOR_STEPS, API_BASE_URL } from '../constants';
import { submitLead } from '../services/api';

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
      const { success, error } = await submitLead({
        email,
        message,
        selections,
        priceEstimate: `${totalPrice.toLocaleString('da-DK')} kr.`,
        totalPrice,
        monthlyPrice
      });

      if (!success) {
        throw new Error(error || 'Submission failed');
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
        className="bg-slate-900/95 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 relative shadow-blue-900/20 h-[700px] md:h-auto"
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
        <div className="h-1.5 bg-slate-800 w-full overflow-hidden shrink-0">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
          />
        </div>

        {/* CONTENT AREA */}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">

          {/* STEP 4: CONTACT FORM */}
          {currentStep === 3 ? (
            <div className="flex gap-6 h-full">

              {/* LEFT SIDEBAR — summary */}
              <div className="w-48 shrink-0 flex flex-col gap-3">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Dine valg</p>

                {/* Selected options */}
                <div className="flex flex-col gap-2">
                  {CALCULATOR_STEPS.map(step => {
                    const sel = selections[step.id];
                    if (!sel) return null;
                    const opts = Array.isArray(sel) ? sel : [sel];
                    return opts.map(optId => {
                      const opt = step.options.find(o => o.id === optId);
                      if (!opt) return null;
                      return (
                        <div key={optId} className="bg-slate-800/60 border border-white/5 rounded-xl px-3 py-2.5">
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-0.5">
                            {step.question.split(' ').slice(0, 2).join(' ')}
                          </p>
                          <p className="text-xs font-black text-white leading-tight">{opt.label}</p>
                          {opt.minPrice > 0 && (
                            <p className="text-[10px] text-blue-400 font-bold mt-1">
                              {opt.minPrice.toLocaleString('da-DK')} kr.
                            </p>
                          )}
                          {opt.monthlyPrice > 0 && (
                            <p className="text-[10px] text-emerald-400 font-bold mt-1">
                              +{opt.monthlyPrice} kr/md
                            </p>
                          )}
                        </div>
                      );
                    });
                  })}
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-white/5 my-1" />

                {/* Price estimate */}
                <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/20 border border-blue-500/30 rounded-xl px-3 py-3">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimeret pris</p>
                  <p className="text-xl font-black text-white leading-none">
                    {totalPrice > 0 ? `${totalPrice.toLocaleString('da-DK')} kr.` : 'Beregnes'}
                  </p>
                  {monthlyPrice > 0 && (
                    <p className="text-[10px] text-emerald-400 font-bold mt-1">+{monthlyPrice} kr/md</p>
                  )}
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Uforpligtende estimat</span>
                  </div>
                </div>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-white/5 shrink-0" />

              {/* RIGHT — contact form */}
              <div className="flex-1 space-y-5">
                <div>
                  <h2 className="text-xl font-black text-white mb-1 leading-tight italic">Send Forespørgsel</h2>
                  <p className="text-slate-400 text-xs font-medium">Udfyld formularen, så kontakter jeg dig for en uforpligtende samtale.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Afsender</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="din@email.dk"
                        className="w-full bg-slate-950 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Besked</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Beskriv kort dit projekt, og angiv hvornår jeg bedst kan kontakte dig"
                      rows={5}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 resize-none"
                    />
                  </div>
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
                      className={`w-full p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-4 relative overflow-hidden ${
                        isSelected
                          ? 'border-blue-500/60 bg-gradient-to-r from-blue-900/40 to-purple-900/20 shadow-lg shadow-blue-500/20 ring-1 ring-blue-500/30'
                          : 'border-white/10 hover:border-white/30 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
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
                <div className="mt-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-sm" />
                  <div className="relative p-5 bg-slate-900/80 border border-blue-500/30 rounded-2xl ring-1 ring-white/5">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">
                          Dit estimerede prisoverslag
                        </p>
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-3xl font-black text-white">
                            {totalPrice.toLocaleString('da-DK')} kr.
                          </span>
                          {monthlyPrice > 0 && (
                            <span className="text-sm text-emerald-400 font-bold">
                              + {monthlyPrice} kr/md
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-xs mt-1">Endeligt tilbud aftales efter dialog</p>
                      </div>
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Uforpligtende estimat</span>
                      </div>
                    </div>
                  </div>
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
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                !email || isSending
                  ? 'bg-slate-800/60 text-slate-600 cursor-not-allowed border border-white/5'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/30'
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
