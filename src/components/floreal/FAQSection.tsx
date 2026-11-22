import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FLOREAL_CONFIG } from '../../config/floreal';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-16 lg:py-24 bg-[#f2f0ea] text-neutral-900 border-b border-neutral-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho do FAQ */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-neutral-200 rounded-full text-[10px] font-mono tracking-widest uppercase text-neutral-600 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-500" />
            <span>Esclarecimentos Comerciais</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-neutral-950 tracking-tight">
            Dúvidas frequentes de confecções e marcas
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light max-w-xl mx-auto">
            Critérios essenciais sobre fornecimento, personalização de dimensões e logística da Floreal.
          </p>
        </div>

        {/* Lista de Perguntas e Respostas */}
        <div className="space-y-4">
          {FLOREAL_CONFIG.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-neutral-200/80 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-neutral-900 font-medium">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    isOpen ? 'bg-neutral-100 text-neutral-900' : 'bg-stone-50 text-neutral-400'
                  }`}>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? 'transform rotate-180 text-neutral-900' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light border-t border-neutral-100 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

