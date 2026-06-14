const fs = require('fs');
const path = require('path');

const files = [
  'src/App.tsx',
  'src/components/PriceCalculator.tsx',
  'src/components/CookieBanner.tsx',
  'src/components/ContactModal.tsx',
  'src/components/PrivacyModal.tsx',
  'src/components/StickyCTA.tsx',
  'src/components/Button.tsx'
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/bg-gradient-to-r from-blue-600 to-purple-600/g, 'bg-white');
  content = content.replace(/bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500/g, 'bg-white');
  content = content.replace(/bg-gradient-to-br from-blue-600 to-slate-800/g, 'bg-brand-card');
  content = content.replace(/bg-gradient-to-br from-slate-900 to-slate-800/g, 'bg-brand-card');
  content = content.replace(/bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500/g, 'bg-white');
  content = content.replace(/bg-gradient-to-br from-blue-900\/40 to-purple-900\/20/g, 'bg-white/10');
  content = content.replace(/bg-gradient-to-b from-slate-900 to-blue-950\/20/g, 'bg-white/10');
  content = content.replace(/from-transparent via-white\/10 to-transparent/g, 'from-transparent via-white/10 to-transparent');
  content = content.replace(/bg-gradient-to-br from-slate-700 to-slate-900/g, 'bg-brand-card');
  content = content.replace(/bg-gradient-to-b from-slate-800 via-slate-900 to-slate-900/g, 'bg-brand-bg');
  content = content.replace(/bg-gradient-to-br from-\[#1e3a5f\] to-\[#1e1b4b\]/g, 'bg-brand-card');
  content = content.replace(/bg-gradient-to-br from-\[#1e3a5f\] to-\[#2d1b4b\]/g, 'bg-brand-card');
  content = content.replace(/bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20/g, 'bg-white rounded-2xl opacity-10');
  content = content.replace(/bg-gradient-to-br \$\{theme\.glow\} opacity-10/g, 'bg-white opacity-5');
  content = content.replace(/bg-gradient-to-r from-blue-500\/30 via-purple-500\/30 to-emerald-500\/30/g, 'bg-white/20');
  content = content.replace(/bg-gradient-to-tr from-blue-600\/20 to-purple-600\/20/g, 'bg-white/5');
  content = content.replace(/bg-gradient-to-br from-blue-600 to-purple-800/g, 'bg-brand-card');
  
  // Specific secondary button replacement in App.tsx
  content = content.replace(/border-2 border-blue-600 hover:border-blue-500 hover:bg-white\/5 text-white/g, 'border-2 border-white hover:bg-white hover:text-black text-white');
  
  // Other buttons in App.tsx
  content = content.replace(/hover:text-blue-400/g, 'hover:text-white');
  content = content.replace(/hover:text-purple-400/g, 'hover:text-white');
  content = content.replace(/hover:text-emerald-400/g, 'hover:text-white');
  
  // Remaining texts
  content = content.replace(/text-blue-100/g, 'text-brand-muted');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  }
});
