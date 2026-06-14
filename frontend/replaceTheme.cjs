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

  // Backgrounds
  content = content.replace(/bg-slate-900(?:\/\d+)?/g, 'bg-brand-bg');
  content = content.replace(/bg-slate-950(?:\/\d+)?/g, 'bg-brand-bg');
  content = content.replace(/bg-slate-800(?:\/\d+)?/g, 'bg-brand-card');
  content = content.replace(/bg-slate-700(?:\/\d+)?/g, 'bg-brand-card');

  // Text
  content = content.replace(/text-slate-300/g, 'text-brand-muted');
  content = content.replace(/text-slate-400/g, 'text-brand-muted');
  content = content.replace(/text-slate-500/g, 'text-brand-subtle');
  content = content.replace(/text-slate-600/g, 'text-brand-subtle');

  // Borders
  content = content.replace(/border-white\/5/g, 'border-brand-border');
  content = content.replace(/border-white\/10/g, 'border-brand-border');
  content = content.replace(/border-white\/20/g, 'border-brand-border');
  content = content.replace(/border-slate-800/g, 'border-brand-border');
  content = content.replace(/border-slate-600/g, 'border-brand-border');

  // Colored backgrounds/badges
  content = content.replace(/bg-(blue|purple|emerald|pink|rose|yellow)-500\/1[05]/g, 'bg-brand-card');
  content = content.replace(/border-(blue|purple|emerald|pink|rose|yellow)-500\/[23]0/g, 'border-brand-border');
  
  // Text colors (except hero accent which has teal/cyan)
  content = content.replace(/text-(blue|purple|emerald|pink|rose|yellow)-(300|400|500)/g, 'text-white');

  // Remove glows
  content = content.replace(/bg-(blue|purple|emerald|pink|teal)-[4569]00\/(10|20)/g, 'bg-white/5');
  content = content.replace(/shadow-(blue|purple|emerald|pink|teal)-[4569]00\/\d+/g, 'shadow-none');
  
  // Replace gradients for text
  content = content.replace(/bg-gradient-to-r from-blue-400 (via-purple-400 )?to-(pink|purple)-400/g, 'text-white');
  content = content.replace(/from-white to-slate-[45]00/g, 'text-white');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Processed ${filePath}`);
}

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    processFile(fullPath);
  } else {
    console.log(`File not found: ${fullPath}`);
  }
});
