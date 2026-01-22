
import React from 'react';
import {
  Rocket,
  Target,
  Smartphone,
  ShieldCheck,
  Mail,
  Layout,
  TrendingUp,
  Wrench,
  Stethoscope,
  Scale,
  PiggyBank,
  Zap,
  Globe,
  Utensils,
  ShoppingBag,
  Search,
  Settings,
  MousePointer2,
  Lock,
  BarChart3,
  Users,
  PhoneCall,
  CalendarClock,
  Hourglass,
  CalendarDays,
  Server
} from 'lucide-react';

export const BUSINESS_NAME = "MST Studios";
export const PHONE_NUMBER = "+45 30 43 19 64";
export const EMAIL_ADDRESS = "contact@mststudios.com";

// Hosting & API Configuration
// Use "/" for relative paths if backend is on same domain, 
// or the full placeholder for staging.
export const API_BASE_URL = "https://staging.mststudios.com/api";

export const getGmailLink = (email: string, customBody?: string) => {
  const subject = encodeURIComponent("Forespørgsel på samarbejde (via Prisberegner)");
  // Use generic mailto body encoding suitable for default mail clients
  const body = encodeURIComponent(customBody || "Hej Morten,\n\nJeg har brugt din prisberegner og vil gerne høre mere om mulighederne.\n\nMed venlig hilsen,\n");
  return `mailto:${email}?subject=${subject}&body=${body}`;
};

export const CALCULATOR_STEPS = [
  {
    id: 'goals',
    question: 'Hvad vil du opnå med din hjemmeside?',
    description: "Vælg 1-2 primære mål for din nye løsning.",
    isMulti: true,
    options: [
      {
        id: 'leads',
        label: 'Flere kundehenvendelser',
        sub: 'Få flere leads fra kunder, der finder dig online',
        minPrice: 0,
        maxPrice: 0,
        monthlyPrice: 0,
        icon: <Users className="w-5 h-5" />
      },
      {
        id: 'brand',
        label: 'Styrket brand/troværdighed',
        sub: 'Giv et professionelt indtryk, så kunderne stoler på dig',
        minPrice: 0,
        maxPrice: 0,
        monthlyPrice: 0,
        icon: <ShieldCheck className="w-5 h-5" />
      },
      {
        id: 'sales',
        label: 'Salg online/webshop',
        sub: 'Sælg produkter direkte fra hjemmesiden',
        minPrice: 0,
        maxPrice: 0,
        monthlyPrice: 0,
        icon: <ShoppingBag className="w-5 h-5" />
      }
    ]
  },
  {
    id: 'type',
    question: 'Hvilken type hjemmeside ønsker du?',
    description: "Vælg den type, der bedst matcher dit behov.",
    isMulti: false,
    options: [
      {
        id: 'simple',
        label: 'Simpel informationsside',
        sub: 'Klassisk site med info om ydelser og kontakt',
        minPrice: 7000,
        maxPrice: 7000,
        monthlyPrice: 0,
        icon: <Layout className="w-5 h-5" />
      },
      {
        id: 'showcase',
        label: 'Portfolio / showcase',
        sub: 'Fremvis projekter eller cases',
        minPrice: 8000,
        maxPrice: 8000,
        monthlyPrice: 0,
        icon: <Rocket className="w-5 h-5" />
      },
      {
        id: 'ecommerce',
        label: 'E-handels-side',
        sub: 'Sælg produkter med kurv og betaling',
        minPrice: 10000,
        maxPrice: 10000,
        monthlyPrice: 0,
        icon: <ShoppingBag className="w-5 h-5" />
      }
    ]
  },
  {
    id: 'services',
    question: 'Services og tilvalg',
    description: "Vælg ekstra services for at styrke din løsning.",
    isMulti: true,
    options: [
      {
        id: 'seo',
        label: 'SEO / søgemaskineoptimering',
        sub: 'Hjælper hjemmesiden med at blive fundet på Google',
        minPrice: 2000,
        maxPrice: 2000,
        monthlyPrice: 0,
        icon: <Search className="w-5 h-5" />
      },
      {
        id: 'maintenance',
        label: 'Vedligehold / support',
        sub: 'Små ændringer, backup og teknisk hjælp efter lancering',
        minPrice: 0,
        maxPrice: 0,
        monthlyPrice: 500,
        icon: <Wrench className="w-5 h-5" />
      },
      {
        id: 'hosting',
        label: 'Hosting / domæne (valgfrit)',
        sub: 'Har du allerede domæne og hosting? (valgfrit – vi kan hjælpe dig)',
        minPrice: 0,
        maxPrice: 0,
        monthlyPrice: 0,
        icon: <Server className="w-5 h-5" />
      }
    ]
  }
];

export const VALUE_PROPS = [
  {
    title: "Maksimal værdi for din investering",
    description: "High-end webløsninger behøver ikke koste en formue. Jeg leverer bureau-kvalitet til en brøkdel af markedsprisen.",
    icon: <PiggyBank className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Strategisk konverterings - arkitektur",
    description: "Design med formål. Hvert element øger din konverteringsrate og ROI.",
    icon: <Target className="w-8 h-8 text-purple-400" />
  },
  {
    title: "Gennemsigtighed & Fast Pris",
    description: "Eliminer usikkerhed med en fast prissætning uden nogen form for skjulte gebyrer.",
    icon: <ShieldCheck className="w-8 h-8 text-blue-400" />
  },
  {
    title: "Mobil-Optimering",
    description: "En flydende brugeroplevelse på tværs af alle enheder, der styrker din virksomheds digitale autoritet.",
    icon: <Smartphone className="w-8 h-8 text-purple-400" />
  }
];

export const PROCESS_STEPS = [
  {
    number: "1",
    title: "Brug Prisberegneren",
    description: "Få et lynhurtigt pris estimat på dit projekt direkte her på siden.",
    icon: <Zap className="w-6 h-6 text-white" />
  },
  {
    number: "2",
    title: "Gennemgang via Mail",
    description: "Vi tager en hurtig dialog om dine specifikke behov og mål.",
    icon: <Mail className="w-6 h-6 text-white" />
  },
  {
    number: "3",
    title: "Udvikling & Design",
    description: "Selve eksekveringen, hvor din vision transformeres til en højtydende digital platform.",
    icon: <Layout className="w-6 h-6 text-white" />
  },
  {
    number: "4",
    title: "Lancering & Vækst",
    description: "Siden går live, gennemtestet og optimeret til at generere resultater fra dag ét.",
    icon: <TrendingUp className="w-6 h-6 text-white" />
  }
];

export interface SubSiteData {
  id: string;
  name: string;
  niche: string;
  heroTitle: string;
  heroSub: string;
  accentColor: string;
  icon: React.ReactNode;
  services: { title: string, desc: string }[];
  result: string;
  imageUrl: string;
  externalUrl?: string;
}

export const PORTFOLIO_ITEMS: SubSiteData[] = [
  {
    id: "pizzaria",
    name: "MST Pizzaria",
    niche: "Restaurant & Takeaway",
    heroTitle: "Premium digital oplevelse for restauranter",
    heroSub: "En komplet løsning med fokus på visuel appetitvækkende design og lynhurtig bestilling. Dette eksempel viser, hvordan man skaber en luksuriøs følelse til en yderst konkurrencedygtig pris.",
    accentColor: "bg-red-600",
    icon: <Utensils className="w-6 h-6 text-white" />,
    result: "Optimeret til konvertering",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1600",
    externalUrl: "https://mstpizzaria.netlify.app/",
    services: [
      { title: "Visuel Storytelling", desc: "Brug af store, flotte billeder der sælger produktet med det samme." },
      { title: "Bestillings-Optimering", desc: "Minimal friktion fra besøg til gennemført bestilling." },
      { title: "Hurtig Performance", desc: "Sikrer en god oplevelse selv på langsomme mobilforbindelser." }
    ]
  }
];
