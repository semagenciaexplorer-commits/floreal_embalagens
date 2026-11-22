import React from 'react';
import { MessageCircle, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { getWhatsAppUrl } from '../../config/floreal';
import { trackWhatsAppClick } from '../../services/analytics';

export const Hero: React.FC = () => {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick(null, 'hero_cta_secondary');
    window.open(getWhatsAppUrl(null), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-stone-100/60 via-[#fafaf9] to-white text-neutral-900 border-b border-neutral-300/80">
      {/* Background sutil com luz difusa e estética de estúdio clean */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-stone-200/50 rounded-full blur-[160px]" />
        {/* Grade técnica milimétrica suave no fundo */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Coluna de Conteúdo Editorial */}
          <div className="lg:col-span-7 space-y-8 z-10">
            {/* Tag Industrial de Credibilidade em formato Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-neutral-200 bg-white/90 backdrop-blur-sm text-neutral-700 text-xs tracking-wider font-medium shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Floreal Embalagens</span>
              <span className="text-neutral-300">•</span>
              <span className="text-neutral-500">Fabricação Própria em SP Desde 1961</span>
            </div>

            {/* H1 Principal com Tipografia Editorial */}
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-neutral-950 leading-[1.12]">
                Embalagens em PVC para{' '}
                <span className="italic font-normal text-neutral-700">Moda Íntima</span>{' '}
                <span className="text-neutral-400 font-sans text-2xl sm:text-4xl lg:text-5xl font-light">&</span>{' '}
                <span className="italic font-normal text-amber-800">Linha Praia</span>
              </h1>

              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-normal max-w-2xl">
                Soluções para marcas e confecções que precisam proteger, organizar e apresentar suas coleções com embalagens adequadas a cada produto.
              </p>

              <div className="pt-2 flex items-start gap-3 text-xs sm:text-sm text-neutral-600 font-normal border-l-2 border-neutral-300 pl-4 py-1">
                <p>
                  Fabricação própria em São Paulo, com opções de acabamentos e formatos personalizados para projetos em volume.
                </p>
              </div>
            </div>

            {/* CTAs com formato Pill Moderno */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => handleScrollTo('#orcamento')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-neutral-900/15 hover:shadow-xl hover:shadow-neutral-900/25 transition-all duration-300 focus:outline-none"
              >
                <span>Solicitar orçamento</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={handleWhatsApp}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white hover:bg-neutral-50 border border-neutral-200 text-neutral-800 font-medium text-xs uppercase tracking-widest rounded-full shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Falar com a Floreal</span>
              </button>
            </div>

            {/* Pilares B2B em Destaque com visual Clean */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-neutral-200/80">
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">1961</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Fundação em SP</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">B2B</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Projetos em Volume</span>
              </div>
              <div className="space-y-0.5">
                <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">100%</span>
                <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Fabricação Própria</span>
              </div>
            </div>
          </div>

          {/* Coluna Visual: Composição Transtranslúcida em Tons Claros */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Moldura Flutuante com Cantos Arredondados Modernos */}
              <div className="relative bg-white rounded-3xl border border-neutral-200/80 p-5 sm:p-7 shadow-2xl shadow-neutral-900/8">
                {/* Visualização de Estrutura de Embalagem em PVC */}
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/60 flex items-center justify-center group shadow-inner">
                  {/* Fotografia real de embalagem Floreal */}
                  <img
                    src="/images/floreal/transparente-01.webp"
                    alt="Produção e acabamento de embalagens em PVC Floreal"
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                    fetchPriority="high"
                  />

                  {/* Camada translúcida de PVC Cristal com efeito Glassmorphism Claro */}
                  <div className="absolute inset-5 rounded-2xl border border-white/80 bg-white/40 backdrop-blur-md pointer-events-none flex flex-col justify-between p-5 shadow-lg">
                    {/* Linha superior de solda / fecho zíper técnico */}
                    <div className="flex items-center justify-between border-b border-neutral-900/10 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
                        <span className="text-[11px] font-mono tracking-wider text-neutral-900 uppercase font-bold">PVC CRISTAL</span>
                      </div>
                      <span className="text-[10px] font-mono text-neutral-700 uppercase font-semibold">SOLDA ELETRÔNICA HF</span>
                    </div>

                    {/* Marca d'água geométrica com logo oficial Floreal */}
                    <div className="text-center py-6">
                      <img
                        src="/floreal-logo.png"
                        srcSet="/floreal-logo.png 1x, /floreal-logo@2x.png 2x"
                        alt="Floreal"
                        className="h-10 sm:h-12 w-auto mx-auto object-contain drop-shadow-sm mb-3"
                      />
                      <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-900 uppercase font-bold block">
                        EMBALAGENS EM PVC
                      </span>
                      <span className="text-[10px] text-neutral-600 uppercase tracking-widest font-medium">
                        São Paulo • Desde 1961
                      </span>
                    </div>

                    {/* Rodapé do envelope */}
                    <div className="flex items-center justify-between border-t border-neutral-900/10 pt-2.5 text-[10px] font-mono text-neutral-700 font-medium">
                      <span>PADRÃO EDITORIAL</span>
                      <span>SOLUÇÃO B2B</span>
                    </div>
                  </div>

                  {/* Reflexo translúcido de luz suave */}
                  <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/30 to-transparent rotate-45 transform pointer-events-none" />
                </div>

                {/* Especificações Técnicas em Pills */}
                <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs text-neutral-600 font-medium">
                  <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Transparência Óptica</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Zíper ou Botão</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-neutral-500" />
                    <span>Alta Resistência</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-neutral-50 rounded-xl">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>Projetos Sob Medida</span>
                  </div>
                </div>
              </div>

              {/* Botão sutil de rolagem orientativa */}
              <button
                onClick={() => handleScrollTo('#categorias')}
                className="mt-6 flex items-center justify-center gap-2 mx-auto text-xs uppercase tracking-widest text-neutral-500 hover:text-neutral-900 font-semibold transition-colors"
                aria-label="Rolar para seleção de categorias"
              >
                <span>Conheça as duas categorias</span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


