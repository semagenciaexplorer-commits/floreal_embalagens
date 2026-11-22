import React from 'react';
import { Heart, ExternalLink, Box } from 'lucide-react';

interface FooterProps {
  lang: 'pt' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/60 py-6 px-4 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-brand-500" />
          <span>
            {lang === 'pt' 
              ? '3D Parametric Studio — Inspirado na tecnologia e comunidade Mafagrafos' 
              : '3D Parametric Studio — Inspired by the Mafagrafos community & tech'}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://www.mafagrafos.com/pt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-brand-400 transition-colors"
          >
            <span>Mafagrafos Oficial</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-slate-600">•</span>
          <span className="flex items-center gap-1 text-slate-400">
            OpenSCAD + BOSL2 + Three.js <Heart className="w-3 h-3 text-red-500 fill-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};
