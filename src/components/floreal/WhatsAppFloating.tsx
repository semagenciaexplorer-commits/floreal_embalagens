import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { CategoryType } from '../../types/landing';
import { FLOREAL_CONFIG, getWhatsAppUrl } from '../../config/floreal';
import { trackWhatsAppClick } from '../../services/analytics';

interface WhatsAppFloatingProps {
  activeCategory: CategoryType;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ activeCategory }) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    trackWhatsAppClick(activeCategory, 'floating_bubble');
  };

  const currentCategoryLabel = activeCategory === 'moda-intima' ? 'Moda Íntima' : 'Linha Praia';
  const currentMessage = FLOREAL_CONFIG.whatsappMessages[activeCategory];
  const whatsappUrl = getWhatsAppUrl(activeCategory);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip expansível com a mensagem contextual */}
      {isTooltipOpen && (
        <div className="bg-white/95 backdrop-blur-md border border-neutral-200/90 p-4 rounded-2xl shadow-2xl max-w-xs text-xs text-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-neutral-100 text-[10px] font-mono text-neutral-500">
            <span>CANAL COMERCIAL FLOREAL</span>
            <button
              onClick={() => setIsTooltipOpen(false)}
              className="text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-neutral-600 font-light mt-2 leading-relaxed">
            Mensagem contextual para <strong className="text-neutral-900 font-medium">{currentCategoryLabel}</strong>:
          </p>
          <div className="bg-stone-50 p-2.5 mt-1.5 rounded-xl border border-neutral-200/70 text-[11px] text-neutral-600 italic">
            "{currentMessage}"
          </div>
        </div>
      )}

      {/* Botão de WhatsApp */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/95 hover:bg-white border border-neutral-200/90 text-[11px] font-mono text-neutral-700 shadow-md backdrop-blur-sm rounded-full transition-all"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Atendimento {currentCategoryLabel}</span>
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-[0_10px_25px_rgba(16,185,129,0.35)] hover:scale-105 transition-all duration-200 focus:outline-none"
          aria-label={`Falar no WhatsApp com especialista Floreal sobre ${currentCategoryLabel}`}
        >
          <MessageCircle className="w-7 h-7 fill-white stroke-white" />
        </a>
      </div>
    </div>
  );
};

