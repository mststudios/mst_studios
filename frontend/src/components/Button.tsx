
import React from 'react';
import { Zap } from 'lucide-react';

interface ButtonProps {
  text: string;
  subText: string;
  className?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export const PrisButton: React.FC<ButtonProps> = ({ text, subText, className = "", variant = 'primary', onClick }) => {
  const baseStyles = "inline-flex items-center justify-center gap-4 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-2xl cursor-pointer group relative overflow-hidden";
  
  // Neon glow effects
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50 hover:shadow-blue-600/50 border border-blue-400/30",
    secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 hover:border-purple-500/50 shadow-lg"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></div>
      
      <div className="bg-white/10 p-2 rounded-full group-hover:rotate-12 transition-transform backdrop-blur-sm border border-white/10">
        <Zap className="w-6 h-6 fill-current text-yellow-300" />
      </div>
      <div className="flex flex-col items-start leading-tight text-left relative z-10">
        <span className="text-xs font-black uppercase opacity-80 tracking-widest text-blue-100">{text}</span>
        <span className="text-xl tracking-tight font-black italic">{subText}</span>
      </div>
    </button>
  );
};
