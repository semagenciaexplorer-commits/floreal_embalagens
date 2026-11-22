import React from 'react';
import { Box, Layers, PlusCircle, Sparkles, Globe } from 'lucide-react';

interface HeaderProps {
  currentTab: 'gallery' | 'editor';
  onSelectTab: (tab: 'gallery' | 'editor') => void;
  onRequestModel: () => void;
  lang: 'pt' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onRequestModel,
  lang,
  onToggleLang,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('gallery')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-900/40 group-hover:scale-105 transition-transform duration-200">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-white group-hover:text-brand-200 transition-colors">
                Mafa<span className="text-brand-500">3D</span> Studio
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Parametric
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              {lang === 'pt' ? 'Personalizador 3D para Impressão' : 'Parametric 3D Model Customizer'}
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 sm:gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          <button
            onClick={() => onSelectTab('gallery')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentTab === 'gallery'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Catálogo' : 'Catalog'}</span>
          </button>
          <button
            onClick={() => onSelectTab('editor')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              currentTab === 'editor'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'pt' ? 'Editor 3D' : '3D Editor'}</span>
          </button>
        </nav>

        {/* Actions & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
            title="Alternar Idioma / Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-brand-400" />
            <span>{lang.toUpperCase()}</span>
          </button>

          <button
            onClick={onRequestModel}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-950/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PlusCircle className="w-4 h-4" />
            <span className="hidden md:inline">
              {lang === 'pt' ? 'Solicitar Novo Modelo' : 'Request New Model'}
            </span>
            <span className="md:hidden">
              {lang === 'pt' ? 'Pedir' : 'Request'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
