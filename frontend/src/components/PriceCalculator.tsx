import React, { useState, useEffect, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight, Check, Loader2, Sparkles, Utensils, Wrench, ShoppingBag, HelpCircle, Stethoscope, ArrowRight } from 'lucide-react';
import { submitCalculatorLead } from '../services/api';

interface PriceCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalize: (summary: string, selections: Record<string, any>) => void;
}

type BusinessType = 'Frisør / skønhed' | 'Restaurant / café' | 'Håndværker / servicefag' | 'Butik / webshop' | 'Klinik / behandler' | 'Andet';

type PackageTier = 'Starter' | 'Vækst' | 'Pro';
type SelectedPackage = PackageTier | 'Skræddersyet';

const PACKAGE_TIERS: PackageTier[] = ['Starter', 'Vækst', 'Pro'];

const BUSINESS_TYPES: BusinessType[] = [
  'Frisør / skønhed',
  'Restaurant / café',
  'Håndværker / servicefag',
  'Butik / webshop',
  'Klinik / behandler',
  'Andet',
];

interface AddonOption {
  id: string;
  label: string;
}

const ADDON_OPTIONS: AddonOption[] = [
  { id: 'more_than_5_pages', label: 'Har du brug for mere end 5 sider?' },
  { id: 'maintenance', label: 'Vil du have os til at håndtere løbende tekstændringer & opdateringer?' },
  { id: 'google_business', label: 'Vil du have Google Business opsætning & optimering?' },
  { id: 'priority_support', label: 'Vil du have prioriteret support (svar inden 24 timer)?' }
];

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ isOpen, onClose, onFinalize }) => {
  const [currentStep, setCurrentStep] = useState(0); // 0–2: flow, 3: booking, 4: success
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [addons, setAddons] = useState<Record<string, boolean>>({
    more_than_5_pages: false,
    maintenance: false,
    google_business: false,
    priority_support: false
  });
  const [selectedPackage, setSelectedPackage] = useState<SelectedPackage | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [availability, setAvailability] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [availabilityError, setAvailabilityError] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setBusinessType(null);
      setAddons({
        more_than_5_pages: false,
        maintenance: false,
        google_business: false,
        priority_support: false
      });
      setSelectedPackage(null);
      setName('');
      setEmail('');
      setAvailability('');
      setNameError(false);
      setEmailError(false);
      setAvailabilityError(false);
      setIsSending(false);
    }
  }, [isOpen]);

  const recommendedPackage = useMemo((): PackageTier => {
    const selectedAddonsCount = Object.values(addons).filter(Boolean).length;
    if (selectedAddonsCount === 0) return 'Starter';
    if (selectedAddonsCount <= 2) return 'Vækst';
    return 'Pro';
  }, [addons]);

  useEffect(() => {
    if (currentStep === 2) {
      setSelectedPackage(recommendedPackage);
    }
  }, [currentStep, recommendedPackage]);

  if (!isOpen) return null;

  const handleBusinessTypeSelect = (type: BusinessType) => {
    setBusinessType(type);
    setTimeout(() => {
      setCurrentStep(1);
    }, 300);
  };

  const handleToggleAddon = (id: string, value: boolean) => {
    setAddons(prev => ({ ...prev, [id]: value }));
  };

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);
  };

  const handleSelectPackage = (pkg: PackageTier) => {
    setSelectedPackage(pkg);
  };

  const handleBookCall = () => {
    if (!selectedPackage) return;
    setCurrentStep(3);
  };

  const handleFormSubmit = async () => {
    const trimmedName = name.trim();
    const trimmedAvailability = availability.trim();
    const hasName = trimmedName.length > 0;
    const hasValidEmail = validateEmail(email);
    const hasAvailability = trimmedAvailability.length > 0;

    setNameError(!hasName);
    setEmailError(!hasValidEmail);
    setAvailabilityError(!hasAvailability);
    if (!hasName || !hasValidEmail || !hasAvailability || !selectedPackage) return;

    // Rate Limiting Check: Max 3 submissions per 10 minutes
    const submissionsKey = 'mst_calc_submissions';
    const now = Date.now();
    const tenMinutes = 10 * 60 * 1000;
    
    let timestamps: number[] = [];
    try {
      const stored = localStorage.getItem(submissionsKey);
      if (stored) {
        timestamps = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse submission timestamps', e);
    }
    
    // Filter out timestamps older than 10 minutes
    timestamps = timestamps.filter(t => now - t < tenMinutes);
    
    if (timestamps.length >= 3) {
      alert('Du har indsendt for mange gange. Prøv igen om lidt.');
      return;
    }

    // Record submission attempt
    timestamps.push(now);
    try {
      localStorage.setItem(submissionsKey, JSON.stringify(timestamps));
    } catch (e) {
      console.error('Failed to save submission timestamp', e);
    }

    setIsSending(true);
    console.log("Form submitted");

    const selectedAddonsArray = Object.keys(addons).filter(key => addons[key]);
    const chosen = selectedPackage;

    const summary = `Prisberegner:\nNavn: ${trimmedName}\nVirksomhedstype: ${businessType}\nValgte tilvalg: ${selectedAddonsArray.join(', ') || 'Ingen'}\nAnbefalet pakke: ${recommendedPackage}\nValgt pakke: ${chosen}\nTilgængelighed: ${trimmedAvailability}\nE-mail: ${email}`;
    onFinalize(summary, {
      name: trimmedName,
      businessType,
      addons,
      recommendedPackage,
      chosenPackage: chosen,
      availability: trimmedAvailability,
      email,
    });

    try {
      const response = await submitCalculatorLead({
        name: trimmedName,
        email,
        availability: trimmedAvailability,
        businessType: businessType || 'Andet',
        needsExtraPages: addons.more_than_5_pages,
        needsUpdates: addons.maintenance,
        needsGoogleBusiness: addons.google_business,
        needsPrioritySupport: addons.priority_support,
        recommendedPackage: chosen,
      });

      if (response.success) {
        setCurrentStep(4);
      } else {
        alert('Noget gik galt — prøv igen eller skriv til mig direkte.');
      }
    } catch (e) {
      console.error(e);
      alert('Noget gik galt — prøv igen eller skriv til mig direkte.');
    } finally {
      setIsSending(false);
    }
  };

  const packageSelectButtonClass = (pkg: PackageTier) =>
    selectedPackage === pkg
      ? 'w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30 border border-transparent'
      : 'w-full py-3 px-4 bg-transparent text-white font-bold text-sm rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:bg-white/5';

  const canBook = selectedPackage !== null;

  // Icons for business types
  const getBusinessIcon = (type: BusinessType) => {
    const iconClass = "w-6 h-6";
    switch (type) {
      case 'Frisør / skønhed':
        return <Sparkles className={iconClass} />;
      case 'Restaurant / café':
        return <Utensils className={iconClass} />;
      case 'Håndværker / servicefag':
        return <Wrench className={iconClass} />;
      case 'Butik / webshop':
        return <ShoppingBag className={iconClass} />;
      case 'Klinik / behandler':
        return <Stethoscope className={iconClass} />;
      default:
        return <HelpCircle className={iconClass} />;
    }
  };

  // SUCCESS STEP
  if (currentStep === 4) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-955/90 backdrop-blur-md animate-in fade-in duration-300">
        <div className="bg-emerald-950/90 w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-emerald-500/30 p-10 text-center animate-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-emerald-400"></div>

          <div className="mx-auto w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-8 border border-emerald-500/40">
            <Check className="w-10 h-10 text-emerald-400" />
          </div>

          <h2 className="text-3xl font-black text-white mb-4 italic tracking-tight">Tak! Vi ringer dig op inden for 24 timer for at booke vores møde. 🎉</h2>
          <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
            Dine oplysninger er modtaget. Vi kontakter dig inden for kort tid for at aftale dit gratis opkald.
          </p>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-10 py-4 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-colors"
          >
            Luk vindue
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="bg-slate-900/95 w-full max-w-4xl rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 relative shadow-blue-900/20 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between shrink-0 bg-white/[0.01]">
          <div>
            <h3 className="text-xl font-black text-white italic tracking-tight">Prisberegner</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              Trin {Math.min(currentStep + 1, 4)} af 4
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-slate-800 w-full overflow-hidden shrink-0">
          <div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
            style={{ width: `${(Math.min(currentStep + 1, 4) / 4) * 100}%` }}
          />
        </div>

        {/* Content Area */}
        <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">

          {/* STEP 1: BUSINESS TYPE */}
          {currentStep === 0 && (
            <div className="space-y-8">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight italic">
                  Hvilken type virksomhed har du?
                </h2>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  Vælg den kategori der beskriver din virksomhed bedst.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {BUSINESS_TYPES.map((type) => {
                  const isSelected = businessType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => handleBusinessTypeSelect(type)}
                      className={`p-6 rounded-2xl border text-left transition-all duration-300 flex flex-col gap-4 relative overflow-hidden group ${isSelected
                          ? 'border-blue-500 bg-gradient-to-br from-blue-900/40 to-purple-900/20 shadow-lg shadow-blue-500/10'
                          : 'border-white/10 hover:border-white/20 hover:bg-white/5'
                        }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isSelected
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg'
                          : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-white'
                        }`}>
                        {getBusinessIcon(type)}
                      </div>
                      <div>
                        <p className={`font-black text-base ${isSelected ? 'text-blue-300' : 'text-white group-hover:text-blue-400 transition-colors'}`}>
                          {type}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: ADDONS */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight italic">
                  Hvad har du brug for?
                </h2>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  Besvar disse 4 korte spørgsmål for at vi kan sammensætte det bedste prisforslag.
                </p>
              </div>

              <div className="space-y-4">
                {ADDON_OPTIONS.map((addon) => {
                  const val = addons[addon.id];
                  return (
                    <div key={addon.id} className="p-6 bg-slate-800/40 border border-white/5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <p className="text-white font-bold text-base leading-relaxed md:max-w-[70%]">
                        {addon.label}
                      </p>
                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleAddon(addon.id, true)}
                          className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 w-24 flex items-center justify-center ${val === true
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                              : 'bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800'
                            }`}
                        >
                          Ja
                        </button>
                        <button
                          onClick={() => handleToggleAddon(addon.id, false)}
                          className={`px-6 py-2.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all duration-200 w-24 flex items-center justify-center ${val === false
                              ? 'bg-slate-800 border border-white/10 text-white'
                              : 'bg-slate-900 text-slate-400 border border-white/5 hover:bg-slate-800'
                            }`}
                        >
                          Nej
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: RECOMMENDATION & COMPARISON TABLE */}
          {currentStep === 2 && (
            <div className="space-y-10">
              <div className="text-center">
                <div className="inline-block mb-3">
                  <span className="py-1 px-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-black uppercase tracking-widest text-blue-300">
                    Beregning fuldført
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight italic">
                  Min anbefaling: <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{recommendedPackage}</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium mt-1">
                  Baseret på dine svar anbefaler vi {recommendedPackage}-pakken. Se sammenligningen nedenfor.
                </p>
              </div>

              {/* COMPARISON TABLE - DESKTOP VIEW */}
              <div className="hidden md:block overflow-hidden border border-white/10 rounded-[2rem] bg-slate-950/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.01]">
                      <th className="p-6 text-slate-400 font-bold uppercase text-xs tracking-wider w-1/4">Egenskaber</th>
                      {PACKAGE_TIERS.map((pkg) => {
                        const isRec = recommendedPackage === pkg;
                        return (
                          <th key={pkg} className={`p-6 w-1/4 relative ${isRec ? 'bg-blue-500/5' : ''}`}>
                            {isRec && (
                              <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-b-lg">
                                Anbefalet
                              </span>
                            )}
                            <p className="text-xl font-black text-white italic">{pkg}</p>
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-300 font-bold text-sm">Pris</td>
                      <td className={`p-6 ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}><span className="text-white font-black text-lg">299 kr/md</span></td>
                      <td className={`p-6 ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}><span className="text-white font-black text-lg">499 kr/md</span></td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><span className="text-white font-black text-lg">799 kr/md</span></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-400 text-sm">Sider</td>
                      <td className={`p-6 text-slate-300 text-sm ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}>Op til 5</td>
                      <td className={`p-6 text-slate-300 text-sm ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}>Op til 10</td>
                      <td className={`p-6 text-slate-300 text-sm ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}>Ubegrænset</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-400 text-sm">Hosting & domæne</td>
                      <td className={`p-6 ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-400 text-sm">SEO</td>
                      <td className={`p-6 ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-400 text-sm">Opdateringer</td>
                      <td className={`p-6 text-slate-500 text-sm ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}>—</td>
                      <td className={`p-6 ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="p-6 text-slate-400 text-sm">Google Business</td>
                      <td className={`p-6 text-slate-500 text-sm ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}>—</td>
                      <td className={`p-6 ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                    </tr>
                    <tr className="border-b border-white/10">
                      <td className="p-6 text-slate-400 text-sm">Prioriteret support</td>
                      <td className={`p-6 text-slate-500 text-sm ${recommendedPackage === 'Starter' ? 'bg-blue-500/5' : ''}`}>—</td>
                      <td className={`p-6 text-slate-500 text-sm ${recommendedPackage === 'Vækst' ? 'bg-blue-500/5' : ''}`}>—</td>
                      <td className={`p-6 ${recommendedPackage === 'Pro' ? 'bg-blue-500/5' : ''}`}><Check className="w-5 h-5 text-emerald-400" /></td>
                    </tr>
                    {/* Package selection row */}
                    <tr>
                      <td className="p-6"></td>
                      {PACKAGE_TIERS.map((pkg) => {
                        const isRec = recommendedPackage === pkg;
                        return (
                          <td key={pkg} className={`p-6 align-top ${isRec ? 'bg-blue-500/5' : ''}`}>
                            <button
                              type="button"
                              onClick={() => handleSelectPackage(pkg)}
                              className={packageSelectButtonClass(pkg)}
                            >
                              Vælg {pkg}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* COMPARISON - MOBILE VIEW */}
              <div className="md:hidden space-y-6">
                {PACKAGE_TIERS.map((pkg) => {
                  const isRec = recommendedPackage === pkg;
                  const details = {
                    Starter: { price: '299 kr/md', pages: 'Op til 5', features: ['Hosting & domæne', 'SEO optimering'] },
                    Vækst: { price: '499 kr/md', pages: 'Op til 10', features: ['Hosting & domæne', 'SEO optimering', 'Løbende tekstændringer', 'Google Business'] },
                    Pro: { price: '799 kr/md', pages: 'Ubegrænset', features: ['Hosting & domæne', 'SEO optimering', 'Løbende tekstændringer', 'Google Business', 'Prioriteret support (24t)'] }
                  }[pkg];

                  return (
                    <div
                      key={pkg}
                      className={`p-6 rounded-2xl border transition-all relative ${isRec
                          ? 'border-blue-500 bg-gradient-to-b from-slate-900 to-blue-950/20 shadow-xl shadow-blue-500/5'
                          : 'border-white/5 bg-slate-800/20'
                        }`}
                    >
                      {isRec && (
                        <span className="absolute -top-3 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                          Anbefalet
                        </span>
                      )}

                      <div className="flex justify-between items-baseline mb-4">
                        <h4 className="text-xl font-black text-white italic">{pkg}</h4>
                        <span className="text-lg font-black text-blue-400">{details.price}</span>
                      </div>

                      <ul className="space-y-2 mb-6">
                        <li className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{details.pages} sider</span>
                        </li>
                        {details.features.map((feat, i) => (
                          <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        onClick={() => handleSelectPackage(pkg)}
                        className={packageSelectButtonClass(pkg)}
                      >
                        Vælg {pkg}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Book call — below comparison */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleBookCall}
                  disabled={!canBook}
                  className={`w-full max-w-md py-4 px-6 font-black text-sm uppercase tracking-wider rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                    canBook
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white shadow-lg shadow-blue-500/30 transform hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-slate-800/60 text-slate-500 border border-white/5 cursor-not-allowed'
                  }`}
                >
                  Book et gratis opkald <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* SECONDARY CTA */}
              <div className="pt-6 border-t border-white/5">
                <div className="max-w-md mx-auto text-center">
                  <button
                    type="button"
                    onClick={() => setSelectedPackage('Skræddersyet')}
                    className={`transition-colors font-bold text-sm border-b pb-0.5 tracking-tight ${
                      selectedPackage === 'Skræddersyet'
                        ? 'text-blue-300 border-blue-400'
                        : 'text-slate-400 hover:text-white border-dashed border-slate-600 hover:border-white'
                    }`}
                  >
                    Jeg vil gerne diskutere en skræddersyet løsning →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: BOOKING FORM */}
          {currentStep === 3 && (
            <div className="space-y-8 max-w-lg mx-auto">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight italic">
                  Næsten der — hvornår passer det dig?
                </h2>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setNameError(false);
                  }}
                  placeholder="Dit navn"
                  className={`w-full bg-slate-900 border rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 ${nameError ? 'border-red-500/80' : 'border-white/10'}`}
                />
                {nameError && (
                  <p className="text-red-400 text-xs font-bold -mt-2">Indtast venligst dit navn</p>
                )}

                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError(false);
                  }}
                  placeholder="din@email.dk"
                  className={`w-full bg-slate-900 border rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 ${emailError ? 'border-red-500/80' : 'border-white/10'}`}
                />
                {emailError && (
                  <p className="text-red-400 text-xs font-bold -mt-2">Indtast venligst en gyldig e-mailadresse</p>
                )}

                <input
                  type="text"
                  value={availability}
                  onChange={(e) => {
                    setAvailability(e.target.value);
                    setAvailabilityError(false);
                  }}
                  placeholder="Hvornår passer et kort online møde? (fx. tirsdag eftermiddag)"
                  className={`w-full bg-slate-900 border rounded-xl py-3.5 px-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-600 ${availabilityError ? 'border-red-500/80' : 'border-white/10'}`}
                />
                {availabilityError && (
                  <p className="text-red-400 text-xs font-bold -mt-2">Fortæl os hvornår vi bedst kan ringe</p>
                )}

                <button
                  type="button"
                  onClick={handleFormSubmit}
                  disabled={isSending}
                  className="w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black text-sm rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
                >
                  {isSending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    'Kom i gang — jeg ringer dig op inden for 24 timer'
                  )}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer Nav */}
        <div className="px-8 py-6 bg-slate-900 border-t border-white/5 flex items-center justify-between shrink-0">
          {currentStep > 0 && currentStep < 4 ? (
            <button
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-xs uppercase tracking-widest pl-2"
            >
              <ChevronLeft className="w-4 h-4" /> Tilbage
            </button>
          ) : (
            <div></div>
          )}

          {currentStep === 1 ? (
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm uppercase tracking-widest rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/30"
            >
              Næste <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-[10px] font-bold text-slate-600 uppercase tracking-wider mr-2">
              100% uforpligtende
            </div>
          )}
        </div>

      </div>
      <div className="absolute inset-0 -z-10" onClick={onClose}></div>
    </div>
  );
};
