import React, { useState } from 'react';
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
import { Mail, ExternalLink, Sparkles, Code, Heart, Phone, Calculator, CheckCircle2, MapPin, Shield, Cookie } from 'lucide-react';

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/5 shadow-lg shadow-blue-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="#forside"
            onClick={(e) => scrollToSection(e, 'forside')}
            className="flex items-center gap-2 group transition-transform hover:scale-105"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-white/5 border border-white/10">
              <span className="text-white font-bold text-xl leading-none">M</span>
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">{BUSINESS_NAME}</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#hvorfor" onClick={(e) => scrollToSection(e, 'hvorfor')} className="text-slate-400 hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Værdi</a>
            <a href="#proces" onClick={(e) => scrollToSection(e, 'proces')} className="text-slate-400 hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Proces</a>
            <a href="#portfolio" onClick={(e) => scrollToSection(e, 'portfolio')} className="text-slate-400 hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Showcase</a>
            <a href="#om-mig" onClick={(e) => scrollToSection(e, 'om-mig')} className="text-slate-400 hover:text-white font-semibold transition-colors hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">Om mig</a>
            <button
              onClick={onOpenCalc}
              className="bg-white/10 text-white px-7 py-3 rounded-full font-bold hover:bg-white/20 transition-all flex items-center gap-3 shadow-xl border border-white/10 ring-2 ring-white/5 group hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <Calculator className="w-4 h-4 group-hover:rotate-12 transition-transform text-slate-300" /> Beregn Pris
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={onOpenCalc}
              className="p-2 text-white bg-white/10 rounded-lg border border-white/10"
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
    <section id="forside" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900 -z-20"></div>

      {/* Spotlight Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-blue-500/10 blur-[100px] -z-15 pointer-events-none rounded-full mix-blend-screen"></div>

      {/* Ambient Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-600/20 rounded-full blur-[130px] -z-10 animate-pulse-slow mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen"></div>

      {/* Faint grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.3] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="z-10 text-center lg:text-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 text-slate-300 font-black text-[10px] uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-md shadow-lg">
              <Sparkles className="w-3 h-3 text-white" /> Professionel Partner • Optimeret til vækst
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-8 tracking-tight italic drop-shadow-2xl">
              Glem de tunge bureaupriser – <br />
              få en hjemmeside <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-cyan-200 to-teal-200 underline decoration-teal-500/20 underline-offset-8 shadow-lg pr-2">der skaber resultater</span>
            </h1>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Find ud af præcis hvad din nye, professionelle løsning vil koste.<br />
              <span className="text-white font-bold underline decoration-white/30 underline-offset-4">Prøv min interaktive prisberegner</span> og få et uforpligtende<br />
              pris estimat med det samme.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <PrisButton text="Start her" subText="Brug prisberegneren" onClick={onOpenCalc} />
            </div>
          </div>

          <div className="relative hidden lg:block perspective-1000 lg:col-span-5">
            {/* Floating planet/glow effect behind */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -z-10 border border-white/5 opacity-60 mix-blend-screen"></div>

            {/* Removed hover transformations (rotate/scale) from the image container */}
            <div className="relative">
              <div className="relative p-4 bg-slate-800/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/10 rotate-2 ring-1 ring-white/5">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2.5rem] pointer-events-none"></div>
                <img
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200"
                  alt="Website mockup"
                  className="rounded-[2rem] w-full object-cover aspect-[4/3] shadow-inner brightness-95 contrast-105"
                />
              </div>

              {/* Floating Badge - Chrome Rainbow Edition */}
              <div className="absolute -top-6 -right-6 z-20 animate-bounce-slow">
                <div className="bg-gradient-to-br from-pink-200 via-white to-cyan-200 p-6 rounded-3xl shadow-[0_0_40px_rgba(255,255,255,0.4)] border-2 border-white max-w-[200px] relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none"></div>
                  <div className="flex items-center gap-3 mb-2 relative z-10">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-black/20 ring-1 ring-black/10">
                      <Code className="w-5 h-5" />
                    </div>
                    <span className="text-slate-700 font-black text-xs uppercase tracking-widest">Ekspertise</span>
                  </div>
                  <p className="text-slate-900 font-bold text-sm leading-snug relative z-10">
                    5+ års erfaring i softwareudvikling og kodning
                  </p>
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
  return (
    <section id="hvorfor" className="py-32 relative overflow-hidden bg-slate-900">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-blue-900/20 blur-[120px] rounded-full -z-10 opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <div className="inline-block mb-6">
            <span className="py-2 px-6 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-blue-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Hvorfor vælge mig?
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 pb-2">
            Værdi der kan mærkes direkte
          </h2>

          <div className="max-w-3xl mx-auto relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur"></div>
            <div className="relative bg-slate-800 ring-1 ring-white/10 rounded-2xl p-8 backdrop-blur-xl">
              <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed">
                "Ingen sælger-snak. Kun <span className="text-white font-bold underline decoration-purple-500/50 underline-offset-4">strategisk webdesign</span>, der konverterer besøgende til betalende kunder."
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALUE_PROPS.map((prop, idx) => {
            // Define unique colors per card
            const colors = [
              { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', shadow: 'shadow-blue-500/10', glow: 'from-blue-600 to-cyan-600' },
              { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', shadow: 'shadow-purple-500/10', glow: 'from-purple-600 to-pink-600' },
              { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', shadow: 'shadow-emerald-500/10', glow: 'from-emerald-600 to-teal-600' },
              { bg: 'bg-rose-500/10', border: 'border-rose-500/20', text: 'text-rose-400', shadow: 'shadow-rose-500/10', glow: 'from-rose-600 to-orange-600' },
            ];
            const theme = colors[idx % colors.length];

            // Removed 'group' class and group-hover effects
            return (
              <div key={idx} className="relative">
                <div className={`h-full bg-slate-800/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/5 ${theme.border} flex flex-col items-center text-center relative overflow-hidden shadow-2xl ${theme.shadow}`}>

                  {/* Enhanced Icon Container - Removed scaling */}
                  <div className="relative mb-8">
                    {/* Rotated background square for depth */}
                    <div className={`absolute inset-0 ${theme.bg} rounded-2xl rotate-6 opacity-50`}></div>
                    <div className={`relative w-24 h-24 rounded-2xl flex items-center justify-center bg-slate-900/50 backdrop-blur-md border border-white/10 ${theme.text} shadow-inner`}>
                      <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} opacity-10 rounded-2xl`}></div>
                      {React.cloneElement(prop.icon as React.ReactElement<{ className?: string }>, { className: "w-10 h-10 relative z-10" })}
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-white mb-4 leading-tight">
                    {prop.title}
                  </h3>

                  <p className="text-slate-400 font-medium leading-relaxed text-sm">
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
  return (
    <section id="proces" className="py-32 bg-slate-800 text-white overflow-hidden rounded-[4rem] mx-4 md:mx-8 my-10 relative border border-white/5 shadow-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/0 to-slate-900/0 -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-black mb-6 italic text-white">En Strømlinet & Effektiv Proces</h2>
          <p className="text-xl text-slate-400 max-w-4xl mx-auto font-medium">En gennemsigtig rejse fra idé til færdig løsning, der sikrer kvalitet i alle led.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {PROCESS_STEPS.map((step, idx) => (
            // Removed group and hover effects
            <div key={idx} className="relative text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-6 inline-flex items-center gap-3 bg-slate-700/80 rounded-full px-5 py-2 border border-white/10 shadow-lg shadow-black/20 backdrop-blur-md">
                  <span className="text-blue-400 font-black uppercase tracking-widest text-xs">Trin {idx + 1}</span>
                  <div className="w-px h-3 bg-white/20"></div>
                  {React.cloneElement(step.icon as React.ReactElement<{ className?: string }>, { className: "w-4 h-4 text-slate-300" })}
                </div>

                <h3 className="text-2xl font-black mb-4 tracking-tight text-slate-100">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <PrisButton text="Prøv det nu" subText="Åben Prisberegneren" onClick={onOpenCalc} />
        </div>
      </div>
    </section>
  );
};

const Portfolio: React.FC = () => {
  const item = PORTFOLIO_ITEMS[0];
  return (
    <section id="portfolio" className="py-32 bg-slate-900 overflow-hidden relative">
      {/* Background gradients */}
      <div className="absolute top-1/2 right-0 w-[40%] h-[40%] bg-purple-900/10 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>
      <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-900/10 blur-[120px] -z-10 rounded-full mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">

          {/* Text Content */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
              <Sparkles className="w-3 h-3 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Case Study</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 italic leading-[1.1]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">MST Pizzaria</span>
              Premium Takeaway
            </h2>

            <p className="text-lg text-slate-400 font-medium leading-relaxed mb-10">
              En komplet digital transformation der fokuserer på <span className="text-white">høj konvertering</span> og <span className="text-white">visuel appetit</span>. Se hvordan strategisk design øger ordreflowet.
            </p>

            {/* Feature List */}
            <div className="space-y-6 mb-10 border-l-2 border-white/5 pl-6">
              {item.services.map((service, idx) => (
                <div key={idx} className="relative">
                  <h4 className="text-white font-bold text-lg mb-1">{service.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
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
          <div className="lg:col-span-7 order-1 lg:order-2 perspective-1000">
            {/* Removed interactive 3D hovers (rotate/scale) */}
            <div className="relative">
              {/* Glow behind */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-2xl -z-10 rounded-[2rem]"></div>

              {/* Browser Window Look */}
              <div className="bg-slate-800 rounded-[1.5rem] shadow-2xl border border-white/10 overflow-hidden ring-1 ring-white/5">
                {/* Browser Header */}
                <div className="h-8 bg-slate-900 border-b border-white/5 flex items-center px-4 gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                  <div className="ml-4 h-4 w-40 bg-white/5 rounded-full text-[8px] flex items-center px-2 text-slate-600 font-mono">mstpizzaria.netlify.app</div>
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
              <div className="absolute -bottom-8 -left-8 bg-slate-800/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl animate-bounce-slow hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 border border-green-500/30">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Performance</p>
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
  return (
    <section id="om-mig" className="py-32 bg-slate-900 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="relative lg:col-span-5">
            {/* Removed hover opacity change on image */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-slate-800 bg-slate-800 shadow-blue-900/20">
              <img
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&q=80&w=1200"
                alt="Professional software developer workspace"
                className="w-full h-full object-cover aspect-square md:aspect-[4/3] lg:aspect-square opacity-90"
              />
              <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay pointer-events-none"></div>
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-600 rounded-full blur-[80px] opacity-40 -z-10"></div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 text-white font-black text-xs uppercase tracking-widest border border-white/10">
              Bag om koden
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white italic tracking-tight leading-tight">
              Fra hobby til <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 pb-2 pr-2">Digitalt Talent</span>
            </h2>
            <div className="space-y-6 text-xl text-slate-400 leading-relaxed font-medium">
              <p>
                Jeg er en ung softwareudvikler, der har haft kodning som min helt store passion siden jeg var barn. Hvad der startede som en nysgerrig hobby, har udviklet sig til et professionelt håndværk.
              </p>
              <p>
                Med mange års erfaring i at bygge komplekse systemer, har jeg nu valgt at dedikere mit talent til at hjælpe virksomheder med at få præcis det, de har brug for: <br />En platform der ikke bare er flot, men som skaber reel vækst og værdi.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 py-3 pl-6 pr-6 bg-slate-800/50 rounded-2xl border border-white/5 backdrop-blur-sm whitespace-nowrap">
              <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center shadow-inner">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 shadow-red-500/50 drop-shadow-md" />
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
  return (
    <section className="py-32 px-4 md:px-8 text-center bg-slate-900">
      <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-600 to-purple-800 rounded-[4rem] p-16 md:p-32 text-white shadow-2xl overflow-hidden relative border border-white/10">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/20 to-transparent"></div>

        <div className="relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-10 italic tracking-tight leading-tight drop-shadow-lg">Hvad koster din <br />nye hjemmeside?</h2>
          <p className="text-2xl text-blue-100 mb-16 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-md">
            "Find ud af det på under et minut med min beregner"
          </p>
          <div className="flex flex-col items-center gap-8">
            <button
              onClick={onOpenCalc}
              className="bg-white text-blue-900 px-16 py-8 rounded-full font-black text-2xl shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all transform hover:scale-105 active:scale-95 hover:bg-blue-50 border-4 border-white/20"
            >
              Beregn Pris Nu
            </button>
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
    <footer className="bg-slate-900 border-t border-white/10 pt-20 pb-10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/0 to-slate-900/0 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-20 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-white/10 shadow-lg shadow-blue-900/10">
                <span className="text-white font-bold text-xl leading-none">M</span>
              </div>
              <span className="text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">{BUSINESS_NAME}</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Skræddersyede webløsninger designet til vækst. Jeg kombinerer teknisk ekspertise med strategisk design for at skabe resultater.
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
                    className="group flex items-center gap-3 text-slate-400 hover:text-blue-400 transition-colors text-sm font-medium w-full text-left"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 text-blue-500">
                      {link.icon}
                    </span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
              <li>
                <button onClick={onOpenCalc} className="group flex items-center gap-3 text-slate-400 hover:text-purple-400 transition-colors text-sm font-medium w-full text-left">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity -ml-4 text-purple-500"><Calculator className="w-4 h-4" /></span>
                  <span className="group-hover:translate-x-1 transition-transform">Prisberegner</span>
                </button>
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
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-blue-500/30 transition-all shadow-md group-hover:shadow-blue-500/20">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Email</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-sm">{EMAIL_ADDRESS}</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-4 group cursor-default">
                  <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:border-purple-500/30 transition-all shadow-md group-hover:shadow-purple-500/20">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Telefon</span>
                    <span className="text-slate-300 group-hover:text-white transition-colors text-sm">+45 30 43 19 64</span>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-4 opacity-60">
                <div className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-0.5">Lokation</span>
                  <span className="text-slate-300 text-sm">Hadsten, Danmark</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
            &copy; {currentYear} {BUSINESS_NAME}. Alle rettigheder forbeholdes.
          </p>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
            <span>Website by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{BUSINESS_NAME}</span>
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
    <div className="min-h-screen bg-slate-900 text-white selection:bg-purple-500 selection:text-white">
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
