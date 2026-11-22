import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { FLOREAL_CONFIG } from '../../config/floreal';

interface HeaderProps {
  onSelectCategory?: (category: 'moda-intima' | 'linha-praia') => void;
}

export const Header: React.FC<HeaderProps> = ({ onSelectCategory }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string, category?: 'moda-intima' | 'linha-praia') => {
    setMobileMenuOpen(false);
    if (category && onSelectCategory) {
      onSelectCategory(category);
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-neutral-200/70 shadow-sm py-3'
          : 'bg-white/60 backdrop-blur-md border-b border-neutral-100 py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logotipo Floreal Embalagens */}
          <a
            href="#"
            className="group flex items-center gap-3 text-neutral-900 focus:outline-none"
            aria-label="Floreal Embalagens - Início"
          >
            <img
              src="/floreal-logo.png"
              srcSet="/floreal-logo.png 1x, /floreal-logo@2x.png 2x"
              alt="Floreal Embalagens"
              className="h-9 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <div className="hidden sm:flex flex-col border-l border-neutral-200/90 pl-3 py-0.5">
              <span className="text-[10px] tracking-[0.18em] uppercase text-neutral-700 font-semibold">
                Embalagens em PVC
              </span>
              <span className="text-[9px] font-mono tracking-wider text-neutral-500">
                Desde 1961 • São Paulo
              </span>
            </div>
          </a>

          {/* Navegação Desktop com Pills Suaves */}
          <nav className="hidden lg:flex items-center gap-2 p-1.5 bg-neutral-100/80 rounded-full border border-neutral-200/60 text-xs uppercase tracking-wider font-medium text-neutral-600">
            <button
              onClick={() => handleNavClick('#solucoes', 'moda-intima')}
              className="px-4 py-1.5 rounded-full hover:text-neutral-950 hover:bg-white transition-all focus:outline-none shadow-sm shadow-transparent hover:shadow-neutral-200/50"
            >
              Moda Íntima
            </button>

            <button
              onClick={() => handleNavClick('#solucoes', 'linha-praia')}
              className="px-4 py-1.5 rounded-full hover:text-amber-800 hover:bg-amber-50 transition-all focus:outline-none"
            >
              Linha Praia
            </button>

            <button
              onClick={() => handleNavClick('#acabamentos')}
              className="px-4 py-1.5 rounded-full hover:text-neutral-950 hover:bg-white transition-all focus:outline-none"
            >
              Acabamentos
            </button>

            <button
              onClick={() => handleNavClick('#sobre')}
              className="px-4 py-1.5 rounded-full hover:text-neutral-950 hover:bg-white transition-all focus:outline-none"
            >
              Sobre a Floreal
            </button>
          </nav>

          {/* Botão de Ação Direta CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#orcamento')}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-black rounded-full shadow-md shadow-neutral-900/10 hover:shadow-lg hover:shadow-neutral-900/20 transition-all duration-200 focus:outline-none"
            >
              <span>Solicitar Orçamento</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-neutral-950 focus:outline-none rounded-lg hover:bg-neutral-100"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Painel Mobile Flutuante */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 border-b border-neutral-200/80 px-6 py-6 space-y-5 animate-in fade-in duration-200 backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-2 gap-3 pb-3 border-b border-neutral-100">
            <button
              onClick={() => handleNavClick('#solucoes', 'moda-intima')}
              className="flex flex-col items-start p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/70 hover:border-neutral-400 text-left transition-colors"
            >
              <span className="text-[10px] tracking-wider uppercase text-neutral-400 font-semibold">Categoria 01</span>
              <span className="text-sm font-semibold text-neutral-900 mt-0.5">Moda Íntima</span>
            </button>
            <button
              onClick={() => handleNavClick('#solucoes', 'linha-praia')}
              className="flex flex-col items-start p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 hover:border-amber-400 text-left transition-colors"
            >
              <span className="text-[10px] tracking-wider uppercase text-amber-700 font-semibold">Categoria 02</span>
              <span className="text-sm font-semibold text-amber-900 mt-0.5">Linha Praia</span>
            </button>
          </div>

          <div className="space-y-2 text-sm font-medium text-neutral-700">
            <button
              onClick={() => handleNavClick('#acabamentos')}
              className="block w-full text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              Acabamentos & Fechamentos
            </button>
            <button
              onClick={() => handleNavClick('#sobre')}
              className="block w-full text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              Sobre a Floreal (Desde 1961)
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="block w-full text-left py-2 hover:text-neutral-950 border-b border-neutral-100"
            >
              Dúvidas Frequentes
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleNavClick('#orcamento')}
              className="w-full py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-neutral-900 hover:bg-black rounded-full flex items-center justify-center gap-2 shadow-lg shadow-neutral-900/10"
            >
              <span>Solicitar Orçamento B2B</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
              Fabricação Própria em São Paulo
            </span>
            <span>Vendas Corporativas</span>
          </div>
        </div>
      )}
    </header>
  );
};


