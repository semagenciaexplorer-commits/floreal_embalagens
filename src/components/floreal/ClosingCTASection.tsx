import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../../config/floreal';
import { trackWhatsAppClick } from '../../services/analytics';

export const ClosingCTASection: React.FC = () => {
  const handleScrollToForm = () => {
    const el = document.querySelector('#orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    trackWhatsAppClick(null, 'closing_cta_whatsapp');
    window.open(getWhatsAppUrl(null), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative py-20 lg:py-28 bg-white text-neutral-900 overflow-hidden border-b border-neutral-300">
      {/* Luz ambiente suave */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-100/40 rounded-full blur-[160px]" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neutral-200/80 rounded-full text-[10px] font-mono tracking-widest uppercase text-neutral-600 shadow-sm">
          <span>Floreal Embalagens • Desde 1961</span>
        </div>

        {/* H2 Marcante */}
        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-neutral-950 tracking-tight leading-[1.15] max-w-4xl mx-auto">
          Cada coleção tem suas particularidades.{' '}
          <span className="italic font-light text-neutral-500">
            A embalagem também deve considerar isso.
          </span>
        </h2>

        {/* Texto Editorial */}
        <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-2xl mx-auto">
          Seja para moda íntima ou linha praia, apresente seu projeto à equipe da Floreal e conheça as possibilidades de embalagens em PVC com entrega em todo o Brasil.
        </p>

        {/* CTAs Finais */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={handleScrollToForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] focus:outline-none"
          >
            <span>Solicitar orçamento</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-white hover:bg-stone-50 border border-neutral-200 text-neutral-800 font-medium text-xs uppercase tracking-widest rounded-full transition-all duration-200 shadow-sm hover:shadow focus:outline-none"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Falar com especialista</span>
          </button>
        </div>
      </div>
    </section>
  );
};

