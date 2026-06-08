import React, { useState, useEffect, useRef } from 'react';
import {
  BUSINESS_NAME,
  VALUE_PROPS,
  PROCESS_STEPS,
  PORTFOLIO_ITEMS,
  EMAIL_ADDRESS,
} from './constants';
import { PrisButton } from './components/Button';
import { ContactModal } from './components/ContactModal';
import { PriceCalculator } from './components/PriceCalculator';
import { StickyCTA } from './components/StickyCTA';
import { PrivacyModal } from './components/PrivacyModal';
import { CookieBanner } from './components/CookieBanner';
import { Mail, ExternalLink, Sparkles, Code, Heart, Phone, Calculator, CheckCircle2, MapPin, Shield, Cookie, Zap, PiggyBank, Smartphone, Layout, TrendingUp, Users, PhoneCall, Eye, Monitor } from 'lucide-react';

const Navbar: React.FC<{ onOpenCalc: () => void }> = ({ onOpenCalc }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbarens højde
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-bg backdrop-blur-lg border-b border-brand-border shadow-lg shadow-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#forside"
            onClick={(e) => scrollToSection(e, 'forside')}
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-brand-card rounded-xl flex items-center justify-center shadow-lg shadow-white/5 border border-brand-border">
              <span className="text-white font-bold text-xl leading-none">M</span>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">{BUSINESS_NAME}</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#hvorfor" onClick={(e) => scrollToSection(e, 'hvorfor')} className="text-brand-muted hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Værdi</a>
            <a href="#proces" onClick={(e) => scrollToSection(e, 'proces')} className="text-brand-muted hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Proces</a>
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-brand-muted hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Showcase</a>
            <a href="#om-mig" onClick={(e) => scrollToSection(e, 'om-mig')} className="text-brand-muted hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Om mig</a>
            <button
              onClick={onOpenCalc}
              className="bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-3 shadow-xl border border-brand-border ring-2 ring-white/5 group hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform text-brand-muted" /> Beregn Pris
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={onOpenCalc}
              className="p-2 text-white bg-white/10 rounded-lg border border-brand-border"
            >
              <Calculator className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC<{ onOpenCalc: () => void }> = ({ onOpenCalc }) => {
  return (
    <section id="forside" className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden bg-brand-bg">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-brand-bg -z-20"></div>

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-brand-card blur-[100px] -z-15 pointer-events-none rounded-full mix-blend-screen"></div>

      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-white/5 rounded-full blur-[130px] -z-10 animate-pulse-slow mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-white/5 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>

      {/* Faint grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.3] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="z-10 text-center lg:text-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-brand-muted font-black text-[10px] uppercase tracking-widest mb-6 border border-brand-border backdrop-blur-md shadow-lg">
              <Sparkles className="w-3 h-3 text-white" /> Professionel Partner • Optimeret til vækst
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight italic drop-shadow-2xl">
              Glem de tunge bureaupriser – <br />
              få en hjemmeside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 underline decoration-teal-500/20 underline-offset-8 shadow-lg pr-2">der bringer flere kunder ind ad døren</span>
            </h1>

            <p className="text-lg text-brand-muted mb-12 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Find ud af præcis hvad din nye, professionelle løsning vil koste.<br />
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">Prøv min interaktive prisberegner</span> og få et uforpligtende<br />
              pris estimat med det samme.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <PrisButton className="w-full sm:w-auto" text="Start her" subText="Brug prisberegneren" onClick={onOpenCalc} />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('portfolio');
                  if (element) {
                    const offset = 80; // Navbarens højde
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({
                      top: offsetPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="inline-flex items-center justify-center px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white hover:bg-white hover:text-black text-white shadow-2xl h-[78px] w-full sm:w-auto"
              >
                Se et eksempel &rarr;
              </button>
            </div>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-2 mt-12 justify-center lg:justify-start">
              <span className="bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white">
                ⚡ Under 14 dage
              </span>
              <span className="bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white">
                ✓ Fast pris
              </span>
              <span className="bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white">
                📱 Mobiloptimeret
              </span>
              <span className="bg-brand-card border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white">
                <TrendingUp className="w-3 h-3 inline mr-1" /> Bedre online synlighed
              </span>
            </div>


          </div>

          <div className="relative hidden lg:block lg:col-span-5">

            {/* Animated background glows — these make it feel alive */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-card rounded-full blur-[80px] animate-pulse-glow pointer-events-none" />
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-card rounded-full blur-[60px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-0 left-10 w-32 h-32 bg-white/5 rounded-full blur-[50px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

            <div className="relative w-full" style={{ height: '400px' }}>

              {/* --- DESKTOP MONITOR --- */}
              <div className="animate-float-desktop absolute left-1/2 -translate-x-1/2 top-5 w-[280px] z-[1]">
                <div className="bg-brand-card border border-brand-border rounded-xl p-1.5 shadow-2xl shadow-black/50">
                  {/* Browser bar */}
                  <div className="bg-brand-bg rounded-t-lg h-5 flex items-center px-3 gap-1.5 border-b border-brand-border">
                    <div className="w-2 h-2 rounded-full bg-red-500/40 border border-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/40 border border-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/40 border border-green-500/50" />
                    <div className="flex-1 bg-white/5 rounded-full h-2 ml-2" />
                  </div>
                  {/* Screen */}
                  <div className="bg-brand-card rounded-b-lg h-36 p-3 overflow-hidden">
                    <div className="bg-white/10 rounded h-2 w-3/5 mb-2" />
                    <div className="bg-white/5 rounded h-1.5 w-4/5 mb-1.5" />
                    <div className="bg-white/5 rounded h-1.5 w-1/2 mb-3" />
                    <div className="flex gap-2 mb-3">
                      <div className="bg-blue-500/40 rounded-full h-6 w-16" />
                      <div className="bg-white/10 rounded-full h-6 w-12" />
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white/5 rounded-lg h-10 flex-1" />
                      <div className="bg-white/5 rounded-lg h-10 flex-1" />
                      <div className="bg-white/5 rounded-lg h-10 flex-1" />
                    </div>
                  </div>
                </div>
                {/* Monitor stand */}
                <div className="w-10 h-2.5 bg-brand-card border border-brand-border border-t-0 rounded-b mx-auto" />
                <div className="w-16 h-1 bg-brand-card border border-brand-border rounded mx-auto" />
              </div>

              {/* --- TABLET --- */}
              <div className="animate-float-tablet absolute left-[2%] top-[60px] w-[115px] z-[2]">
                <div className="bg-brand-card border border-brand-border rounded-xl p-1 shadow-2xl shadow-black/50">
                  <div className="bg-brand-card rounded-lg h-44 p-2.5 overflow-hidden">
                    <div className="bg-white/10 rounded h-1.5 w-3/4 mb-1.5" />
                    <div className="bg-white/5 rounded h-1 w-full mb-1" />
                    <div className="bg-white/5 rounded h-1 w-3/5 mb-2.5" />
                    <div className="bg-blue-500/35 rounded-full h-4 w-14 mb-2.5" />
                    <div className="bg-white/5 rounded-lg h-12 w-full mb-2" />
                    <div className="flex gap-1">
                      <div className="bg-white/5 rounded h-7 flex-1" />
                      <div className="bg-white/5 rounded h-7 flex-1" />
                    </div>
                  </div>
                  <div className="w-5 h-5 rounded-full border border-brand-border mx-auto my-1" />
                </div>
              </div>

              {/* --- PHONE --- */}
              <div className="animate-float-phone absolute right-[2%] top-[50px] w-[75px] z-[2]">
                <div className="bg-brand-card border border-brand-border rounded-2xl p-1 shadow-2xl shadow-black/50">
                  <div className="w-6 h-1.5 bg-brand-bg rounded-full mx-auto mb-1" />
                  <div className="bg-brand-card rounded-xl h-36 p-2 overflow-hidden">
                    <div className="bg-white/10 rounded h-1.5 w-4/5 mb-1" />
                    <div className="bg-white/5 rounded h-1 w-3/5 mb-2" />
                    <div className="bg-blue-500/35 rounded-full h-3.5 w-10 mb-2" />
                    <div className="bg-white/5 rounded-lg h-12 w-full mb-1.5" />
                    <div className="bg-white/5 rounded h-1 w-full mb-1" />
                    <div className="bg-white/5 rounded h-1 w-4/5" />
                  </div>
                  <div className="w-4 h-4 rounded-full border border-brand-border mx-auto my-1" />
                </div>
              </div>

              {/* --- FLOATING CARD 1 — top left — Speed --- */}
              <div className="animate-bounce-card absolute top-0 left-[16%] z-10 bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-brand-subtle uppercase tracking-widest">Fra idé til online</p>
                  <p className="text-xs font-black text-white">Under 14 dage</p>
                </div>
              </div>

              {/* --- FLOATING CARD 2 — bottom center — Pricing --- */}
              <div className="animate-bounce-card absolute bottom-16 left-[10%] z-10 bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0">
                  <PiggyBank className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-brand-subtle uppercase tracking-widest">Budgetvenlige priser</p>
                  <p className="text-xs font-black text-white">Tilpasset til dig</p>
                </div>
              </div>

              {/* --- FLOATING CARD 3 — right — All devices --- */}
              <div className="absolute top-[30%] right-0 z-10 bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
                <div className="w-7 h-7 rounded-lg bg-brand-card border border-brand-border flex items-center justify-center shrink-0">
                  <Smartphone className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-brand-subtle uppercase tracking-widest">Optimeret til</p>
                  <p className="text-xs font-black text-white">Alle enheder</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ValueProposition: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: '0px 0px -150px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="hvorfor" className="py-32 relative overflow-hidden bg-brand-bg" ref={containerRef}>
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-white/5 blur-[120px] rounded-full -z-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <span className="py-2 px-6 rounded-full border border-brand-border bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Hvorfor vælge mig?
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tight text-transparent bg-clip-text text-white pb-2">
            Værdi der kan mærkes direkte
          </h2>

          <div className={`max-w-3xl mx-auto relative ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="absolute -inset-1 bg-white rounded-2xl opacity-20 blur"></div>
            <div className="relative bg-brand-card ring-1 ring-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <p className="text-xl md:text-2xl text-brand-muted font-medium leading-relaxed">
                "Ingen sælger-snak. Kun <span className="text-white font-bold underline decoration-purple-500/50 underline-offset-4">strategisk webdesign</span>, der konverterer besøgende til betalende kunder."
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((prop, idx) => {
            // Define unique colors per card
            const colors = [
              { bg: 'bg-brand-card', border: 'border-brand-border', text: 'text-white', shadow: 'shadow-none', glow: 'from-blue-600 to-cyan-600' },
              { bg: 'bg-brand-card', border: 'border-brand-border', text: 'text-white', shadow: 'shadow-none', glow: 'from-purple-600 to-pink-600' },
              { bg: 'bg-brand-card', border: 'border-brand-border', text: 'text-white', shadow: 'shadow-none', glow: 'from-emerald-600 to-teal-600' },
              { bg: 'bg-brand-card', border: 'border-brand-border', text: 'text-white', shadow: 'shadow-rose-500/10', glow: 'from-rose-600 to-orange-600' },
            ];
            const theme = colors[idx % colors.length];

            // Removed 'group' class and group-hover effects
            return (
              <div key={idx} className={`relative ${isVisible ? `animate-fade-up animate-fade-up-delay-${(idx % 4) + 1}` : 'opacity-0'}`}>
                <div className={`h-full bg-brand-card backdrop-blur-xl p-8 rounded-[2.5rem] border border-brand-border ${theme.border} flex flex-col items-center text-center relative overflow-hidden shadow-2xl ${theme.shadow}`}>

                  {/* Enhanced Icon Container - Removed scaling */}
                  <div className="relative mb-8">
                    {/* Rotated background square for depth */}
                    <div className={`absolute inset-0 ${theme.bg} rounded-2xl rotate-6 opacity-50`}></div>
                    <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center bg-brand-bg backdrop-blur-md border border-brand-border ${theme.text} shadow-inner`}>
                      <div className={`absolute inset-0 bg-white opacity-5 rounded-2xl`}></div>
                      {React.cloneElement(prop.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 relative z-10" })}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white mb-4 leading-tight">
                    {prop.title}
                  </h3>

                  <p className="text-brand-muted font-medium leading-relaxed text-sm">
                    {prop.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Process: React.FC<{ onOpenCalc: () => void }> = ({ onOpenCalc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="proces" className="py-32 bg-brand-card text-white overflow-hidden rounded-[4rem] mx-4 md:mx-8 my-10 relative border border-brand-border shadow-2xl" ref={containerRef}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/0 to-slate-900/0 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header — keep existing text, just keep it centered */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6 italic text-white">
            En Strømlinet & Effektiv Proces
          </h2>
          <p className="text-xl text-brand-muted max-w-4xl mx-auto font-medium">
            En gennemsigtig rejse fra idé til færdig løsning, der sikrer kvalitet i alle led.
          </p>
        </div>

        {/* Steps grid with connector line */}
        <div className="relative">

          {/* Horizontal connector line — desktop only */}
          <div className="hidden lg:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/20 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
            {[
              {
                number: '01',
                title: 'Brug Prisberegneren',
                description: 'Få et lynhurtigt pris estimat på dit projekt direkte her på siden.',
                color: 'blue',
                icon: <Zap className="w-5 h-5" />,
                bg: 'bg-brand-card',
                border: 'border-brand-border',
                text: 'text-white',
                glow: 'shadow-none',
              },
              {
                number: '02',
                title: 'Gennemgang via møde',
                description: 'Vi tager en hurtig dialog om dine specifikke behov og mål.',
                color: 'purple',
                icon: <Monitor className="w-5 h-5" />,
                bg: 'bg-brand-card',
                border: 'border-brand-border',
                text: 'text-white',
                glow: 'shadow-none',
              },
              {
                number: '03',
                title: 'Udvikling & Design',
                description: 'Selve eksekveringen, hvor din vision transformeres til en højtydende digital platform.',
                color: 'pink',
                icon: <Layout className="w-5 h-5" />,
                bg: 'bg-brand-card',
                border: 'border-brand-border',
                text: 'text-white',
                glow: 'shadow-none',
              },
              {
                number: '04',
                title: 'Lancering & Vækst',
                description: 'Siden går live, gennemtestet og optimeret til at generere resultater fra dag ét.',
                color: 'emerald',
                icon: <TrendingUp className="w-5 h-5" />,
                bg: 'bg-brand-card',
                border: 'border-brand-border',
                text: 'text-white',
                glow: 'shadow-none',
              },
            ].map((step, idx) => (
              <div key={idx} className={`flex flex-col items-center lg:items-start text-center lg:text-left ${isVisible ? `animate-fade-up animate-fade-up-delay-${(idx % 4) + 1}` : 'opacity-0'}`}>

                {/* Big number circle with icon */}
                <div className={`relative w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-6 shadow-xl ${step.glow} ${step.text}`}>
                  <div className={`absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-bg border ${step.border} flex items-center justify-center`}>
                    <span className={`text-[9px] font-black ${step.text}`}>{step.number}</span>
                  </div>
                  {step.icon}
                </div>

                {/* Big step number as background watermark */}
                <div className={`text-7xl font-black ${step.text} opacity-5 leading-none mb-2 select-none`}>
                  {step.number}
                </div>

                <h3 className="text-xl font-black text-white mb-3 -mt-6 leading-tight">
                  {step.title}
                </h3>
                <p className="text-brand-muted leading-relaxed font-medium text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA button — keep existing */}
        <div className="mt-24 text-center">
          <PrisButton text="Prøv det nu" subText="Åben Prisberegneren" onClick={onOpenCalc} />
        </div>

      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const item = PORTFOLIO_ITEMS[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="py-32 bg-brand-bg overflow-hidden relative" ref={containerRef}>
      {/* Background gradients */}
      <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-white/5 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-white/5 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Text Content */}
          <div className={`lg:col-span-5 order-2 lg:order-1 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-brand-border backdrop-blur-md mb-8">
              <Sparkles className="w-3 h-3 text-white" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">Live Case Study</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r text-white">MST Pizzaria</span>
              Premium Takeaway
            </h2>

            <p className="text-lg text-brand-muted font-medium leading-relaxed mb-10">
              En komplet digital transformation der fokuserer på <span className="text-white">høj konvertering</span> og <span className="text-white">visuel appetit</span>. Se hvordan strategisk design øger ordreflowet.
            </p>

            {/* Feature List */}
            <div className="space-y-6 mb-10 border-l-2 border-brand-border pl-6">
              {item.services.map((service, idx) => (
                <div key={idx} className="relative">
                  <h4 className="text-white font-bold text-lg mb-1">{service.title}</h4>
                  <p className="text-sm text-brand-subtle leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href={item.externalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-blue-50 transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.1)] group">
                Besøg Siden <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Image/Mockup */}
          <div className={`lg:col-span-7 order-1 lg:order-2 perspective-1000 ${isVisible ? 'animate-fade-up animate-fade-up-delay-2' : 'opacity-0'}`}>
            {/* Removed interactive 3D hovers (rotate/scale) */}
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-white/5 blur-2xl -z-10 rounded-[2rem]"></div>

              {/* Browser Window Look */}
              <div className="bg-brand-card rounded-[1.5rem] shadow-2xl border border-brand-border overflow-hidden ring-1 ring-white/5">
                {/* Browser Header */}
                <div className="h-8 bg-brand-bg border-b border-brand-border flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  <div className="ml-4 h-4 w-40 bg-white/5 rounded-full text-[8px] flex items-center px-2 text-brand-subtle font-mono">mstpizzaria.netlify.app</div>
                </div>

                {/* Content Image - Removed "Click to see live" overlay since it wasn't a link wrapper */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating Stat Card */}
              <div className="absolute -bottom-8 -left-8 bg-brand-card backdrop-blur-xl p-6 rounded-2xl border border-brand-border shadow-xl animate-bounce-slow hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-muted font-bold uppercase tracking-wider">Performance</p>
                    <p className="text-xl font-black text-white">100/100</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const AboutMe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="om-mig" className="py-32 bg-brand-bg overflow-hidden relative" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          <div className={`relative lg:col-span-5 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>

            {/* Photo with styled overlay */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-brand-border">
              <img
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200"
                alt="Professional software developer workspace"
                className="w-full h-full object-cover aspect-square md:aspect-[4/3] lg:aspect-square"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/80 via-blue-900/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
            </div>

            {/* Floating card — availability */}
            <div className="absolute top-6 left-6 z-10 bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-lg shadow-none animate-pulse" />
              <div>
                <p className="text-[10px] font-bold text-brand-subtle uppercase tracking-widest">Status</p>
                <p className="text-xs font-black text-white">Tilgængelig for projekter</p>
              </div>
            </div>

            {/* Floating card — experience */}
            <div className="absolute -bottom-6 -right-4 z-10 bg-brand-bg backdrop-blur-xl border border-brand-border rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="w-8 h-8 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-brand-subtle uppercase tracking-widest">Tilgang</p>
                <p className="text-xs font-black text-white">Fuldt dedikeret</p>
              </div>
            </div>

            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-20 -z-10" />
          </div>

          <div className={`space-y-8 lg:col-span-7 ${isVisible ? 'animate-fade-up animate-fade-up-delay-2' : 'opacity-0'}`}>

            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-card text-white font-black text-xs uppercase tracking-widest border border-brand-border">
              Bag om koden
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight leading-tight">
              Fra hobby til <br />
              <span className="text-transparent bg-clip-text text-white pb-2 pr-2">
                Digitalt Talent
              </span>
            </h2>

            {/* Stat cards row */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center mx-auto mb-2">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-black text-white mb-1">Fuld fokus</p>
                <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest leading-tight">Én kunde ad gangen</p>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center mx-auto mb-2">
                  <PhoneCall className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-black text-white mb-1">Altid tilgængelig</p>
                <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest leading-tight">Hurtig kommunikation</p>
              </div>
              <div className="bg-brand-card border border-brand-border rounded-2xl p-4 text-center">
                <div className="w-8 h-8 rounded-xl bg-brand-card border border-brand-border flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-black text-white mb-1">Transparent proces</p>
                <p className="text-[10px] text-brand-muted font-bold uppercase tracking-widest leading-tight">Du følger med hele vejen</p>
              </div>
            </div>

            {/* Shorter punchier paragraphs */}
            <div className="space-y-4 text-lg text-brand-muted leading-relaxed font-medium">
              <p>
                Jeg er en ung udvikler med en ægte interesse for kodning — det er ikke bare et job, det er noget jeg <span className="text-white font-bold">rent faktisk bryder mig om</span>.
              </p>
              <p>
                Jeg har brugt en masse tid på at lære, bygge og eksperimentere — og den nysgerrighed driver mig til at levere løsninger der er <span className="text-white font-bold">gennemtænkte og veludførte</span>.
              </p>
              <p>
                Jeg er ikke et stort bureau med hundrede kunder. Du får én person der er <span className="text-white font-bold">fuldt dedikeret til dit projekt</span> — fra første linje kode til siden går live.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 py-3 pl-6 pr-6 bg-brand-card rounded-2xl border border-brand-border backdrop-blur-sm whitespace-nowrap">
              <div className="w-10 h-10 bg-brand-card rounded-full flex items-center justify-center shadow-inner">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              </div>
              <span className="text-white font-bold tracking-tight text-sm">Drevet af passion og præcision</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

const FinalCTA: React.FC<{ onOpenCalc: () => void }> = ({ onOpenCalc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '0px 0px -80px 0px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-32 px-4 md:px-8 text-center bg-brand-bg" ref={containerRef}>
      <div className={`max-w-6xl mx-auto bg-brand-card rounded-[4rem] p-16 md:p-32 text-white shadow-2xl overflow-hidden relative border border-brand-border ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="relative z-10">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="bg-white/10 border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white/80">⚡ Under 2 minutter</span>
            <span className="bg-white/10 border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white/80">✓ Ingen forpligtelse</span>
            <span className="bg-white/10 border border-brand-border rounded-full px-4 py-1.5 text-xs font-bold text-white/80">🔒 Gratis estimat</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-10 italic tracking-tight leading-tight drop-shadow-lg">Hvad koster din <br />nye hjemmeside?</h2>
          <p className="text-xl text-brand-muted mb-12 max-w-xl mx-auto font-medium leading-relaxed">
            Ingen forpligtelse. Ingen skjulte gebyrer. <br />
            <span className="text-white font-black">Se hvad din hjemmeside koster på under 2 minutter.</span>
          </p>
          <div className="flex flex-col items-center gap-8">
            <PrisButton text="Beregn Pris Nu" subText="Gratis og uforpligtende" onClick={onOpenCalc} />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FooterProps {
  onOpenCalc: () => void;
  onOpenPrivacy: () => void;
  onOpenCookies: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenCalc, onOpenPrivacy, onOpenCookies }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: "Privatlivspolitik", icon: <Shield className="w-4 h-4" />, action: onOpenPrivacy },
    { label: "Cookiepolitik", icon: <Cookie className="w-4 h-4" />, action: onOpenCookies },
  ];

  return (
    <footer className="bg-brand-bg border-t-2 border-brand-border pt-20 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/0 to-slate-900/0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-brand-border shadow-lg shadow-none">
                <span className="text-white font-bold text-xl leading-none">M</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r text-white">{BUSINESS_NAME}</span>
            </div>
            <p className="text-brand-muted text-sm leading-relaxed font-medium">
              Skræddersyede webløsninger designet til vækst. <br />
              Jeg kombinerer teknisk ekspertise med strategisk design for at skabe resultater.
            </p>

          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-blue-500 rounded-full"></div> Information
            </h4>
            <ul className="space-y-4">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={link.action}
                    className="group flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm font-medium w-full text-left"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 text-white">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={onOpenCalc} className="group flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm font-medium w-full text-left">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 text-white"><Calculator className="w-4 h-4" /></span>
                  <span className="group-hover:translate-x-1 transition-transform">Prisberegner</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Kom i gang Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-emerald-500 rounded-full"></div> Kom i gang
            </h4>
            <ul className="space-y-4">
              <li>
                <button onClick={onOpenCalc} className="group flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm font-medium w-full text-left">
                  <span className="group-hover:translate-x-1 transition-transform">Brug Prisberegneren</span>
                </button>
              </li>
              <li>
                <a href="mailto:contact@mststudios.com" className="group flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm font-medium">
                  <span className="group-hover:translate-x-1 transition-transform">Send en mail</span>
                </a>
              </li>
              <li>
                <a href="tel:+4530431964" className="group flex items-center gap-3 text-brand-muted hover:text-white transition-colors text-sm font-medium">
                  <span className="group-hover:translate-x-1 transition-transform">Ring til mig</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <div className="w-1 h-1 bg-purple-500 rounded-full"></div> Kontakt
            </h4>
            <ul className="space-y-6">
              <li>
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-muted group-hover:text-white group-hover:border-brand-border transition-all shadow-md group-hover:shadow-none">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-subtle uppercase tracking-wider mb-0.5">Email</span>
                    <span className="text-white group-hover:text-white transition-colors text-sm">{EMAIL_ADDRESS}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-muted group-hover:text-white group-hover:border-brand-border transition-all shadow-md group-hover:shadow-none">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-brand-subtle uppercase tracking-wider mb-0.5">Telefon</span>
                    <span className="text-white group-hover:text-white transition-colors text-sm">+45 30 43 19 64</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-brand-bg border border-brand-border flex items-center justify-center text-brand-muted">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-brand-subtle uppercase tracking-wider mb-0.5">Lokation</span>
                  <span className="text-white text-sm">Hadsten, Danmark</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-brand-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-subtle text-xs font-bold uppercase tracking-[0.2em]">
            &copy; {currentYear} {BUSINESS_NAME}. Alle rettigheder forbeholdes.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-subtle">
            <span>Website by</span>
            <span className="text-transparent bg-clip-text text-white">{BUSINESS_NAME}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // State for at åbne cookie indstillinger fra footer
  const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);

  const [prefilledMessage, setPrefilledMessage] = useState("");
  const [pricingSelections, setPricingSelections] = useState<Record<string, any>>({});

  const handleFinalizeCalc = (summary: string, selections: Record<string, any>) => {
    // Calculator handles its own contact flow now.
    // We just update state for potential other uses, but don't open the old modal.
    setPrefilledMessage(summary);
    setPricingSelections(selections);
    // Do NOT close calc here (it shows success screen) and do NOT open contact modal.
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white selection:bg-purple-500 selection:text-white">
      <Navbar onOpenCalc={() => setIsCalcOpen(true)} />
      <Hero onOpenCalc={() => setIsCalcOpen(true)} />
      <ValueProposition />
      <Process onOpenCalc={() => setIsCalcOpen(true)} />
      <Portfolio />
      <AboutMe />
      <FinalCTA onOpenCalc={() => setIsCalcOpen(true)} />
      <Footer
        onOpenCalc={() => setIsCalcOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenCookies={() => setIsCookieSettingsOpen(true)}
      />
      <StickyCTA onOpenCalc={() => setIsCalcOpen(true)} />

      <PriceCalculator
        isOpen={isCalcOpen}
        onClose={() => setIsCalcOpen(false)}
        onFinalize={handleFinalizeCalc}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        initialMessage={prefilledMessage}
        pricingSelections={pricingSelections}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <CookieBanner
        isOpen={isCookieSettingsOpen}
        onClose={() => setIsCookieSettingsOpen(false)}
      />
    </div>
  );
};

export default App;
