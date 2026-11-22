import React, { useState } from 'react';
import { ArrowRight, Sparkles, Sun, CheckCircle2 } from 'lucide-react';
import { trackCategorySelect } from '../../services/analytics';
import { CategoryType } from '../../types/landing';

interface CategorySplitPanelsProps {
  onSelectCategory: (category: CategoryType) => void;
  onSelectProduct?: (category: CategoryType, productName: string) => void;
}

export const CategorySplitPanels: React.FC<CategorySplitPanelsProps> = ({
  onSelectCategory,
  onSelectProduct,
}) => {
  // Itens de Moda Íntima com fotos oficiais Floreal
  const intimateItems = [
    {
      name: 'Lingerie',
      badge: 'Rendas & Peças Nobres',
      description: 'Envelopes e nécessaires em PVC cristal que valorizam rendas delicadas e detalhes finos sem amassar.',
      image: '/images/floreal/lingerie-01.webp',
    },
    {
      name: 'Calcinhas',
      badge: 'Multi-pack & Unitária',
      description: 'Formatos compactos com solda eletrônica lateral reforçada, ideais para exposição vertical em gôndolas e araras.',
      image: '/images/floreal/calcinha-01.webp',
    },
    {
      name: 'Sutiãs',
      badge: 'Proteção de Bojo',
      description: 'Bolsas estruturadas que preservam a anatomia e o bojo, evitando deformações no transporte e estoque.',
      image: '/images/floreal/linha-intima-02.jpg',
    },
    {
      name: 'Cuecas',
      badge: 'Linha Underwear',
      description: 'Acondicionamento premium para underwear masculino, com visor translúcido ou cristal de alta nitidez.',
      image: '/images/floreal/cuecas-01.webp',
    },
    {
      name: 'Underwear',
      badge: 'Básicos & Essenciais',
      description: 'Embalagens desenvolvidas para linhas essenciais com fechamento prático e identificação de tamanho.',
      image: '/images/floreal/cuecas-02.webp',
    },
    {
      name: 'Conjuntos',
      badge: 'Apresentação Coordenada',
      description: 'Estojos com capacidade dimensional para acomodar conjuntos completos de forma alinhada e atraente.',
      image: '/images/floreal/linha-intima-01.jpg',
    },
    {
      name: 'Kits',
      badge: 'Volume Promocional',
      description: 'Soluções econômicas e sofisticadas para kits promocionais, datas comemorativas e lotes atacadistas.',
      image: '/images/floreal/calcinha-02.webp',
    },
  ];

  // Itens de Linha Praia com fotos oficiais Floreal
  const beachwearItems = [
    {
      name: 'Biquínis',
      badge: 'Resistente à Umidade',
      description: 'Envelopes impermeáveis e nécessaires com zíper hermético ou botão, ideais para praia e piscina.',
      image: '/images/floreal/bikini-01.webp',
    },
    {
      name: 'Maiôs',
      badge: 'Formato Alongado',
      description: 'Dimensões alongadas para cortes inteiros, peças com metais e amarrações sem marcas vincadas.',
      image: '/images/floreal/praia-01.webp',
    },
    {
      name: 'Sungas',
      badge: 'Compacta & Prática',
      description: 'Modelos compactos de alta densidade visual, com fechamento prático para coleções masculinas.',
      image: '/images/floreal/linha-praia-01.jpg',
    },
    {
      name: 'Saídas de praia',
      badge: 'Leveza & Transparência',
      description: 'Capacidade volumétrica para acomodar cangas, kaftans e saídas leves sem atrito.',
      image: '/images/floreal/linha-praia-02.jpg',
    },
    {
      name: 'Conjuntos',
      badge: 'Coordenação Visual',
      description: 'Estojos para acomodar tops, tangas e saídas coordenadas em um mesmo invólucro limpo.',
      image: '/images/floreal/bikini-02.webp',
    },
    {
      name: 'Kits e Coleções',
      badge: 'Lançamentos de Verão',
      description: 'Projetos sob medida com espessuras e formatos pensados para valorizar coleções da alta temporada.',
      image: '/images/floreal/praia-02.webp',
    },
  ];

  // Estados dos itens ativos em cada categoria
  const [activeIntimateIdx, setActiveIntimateIdx] = useState<number>(0);
  const [activeBeachIdx, setActiveBeachIdx] = useState<number>(0);

  const currentIntimate = intimateItems[activeIntimateIdx];
  const currentBeach = beachwearItems[activeBeachIdx];

  const handleCtaClick = (category: CategoryType, productName: string) => {
    trackCategorySelect(category, 'split_panels_cta');
    onSelectCategory(category);
    if (onSelectProduct) {
      onSelectProduct(category, productName);
    }
    const el = document.querySelector('#orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="solucoes" className="relative bg-[#f2f0ea] py-16 lg:py-24 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho da Seção de Divisão */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-neutral-700 text-xs font-mono uppercase tracking-widest font-semibold border border-neutral-200/80 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-neutral-500" />
            <span>Segmentação de Soluções</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
            Embalagens personalizadas por categoria
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            Selecione uma aplicação abaixo para visualizar a embalagem em PVC ideal para a sua confecção.
          </p>
        </div>

        {/* Dois Grandes Painéis Editoriais Interativos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* =========================================
              PAINEL 01: MODA ÍNTIMA (INTERATIVO)
             ========================================= */}
          <div className="rounded-3xl overflow-hidden bg-white border border-neutral-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            {/* Banner com Foto Dinâmica e Animação Fluida */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-stone-100">
              <img
                key={currentIntimate.image}
                src={currentIntimate.image}
                alt={currentIntimate.name}
                className="w-full h-full object-cover filter contrast-105 animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Tag Superior */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-neutral-200 shadow-sm text-xs font-semibold text-neutral-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-neutral-900" />
                  <span>Moda Íntima</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-white uppercase font-medium">
                  {currentIntimate.badge}
                </span>
              </div>

              {/* Título Sobreposto na Foto */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-300 block">
                  Aplicação Selecionada:
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  Embalagens para {currentIntimate.name}
                </h3>
              </div>
            </div>

            {/* Corpo do Card com Seletores de Produto */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-sm text-neutral-600 leading-relaxed font-light min-h-[44px]">
                  {currentIntimate.description}
                </p>

                {/* Seletores / Botões dos Produtos de Moda Íntima */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                    Escolha o produto para pré-visualizar:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {intimateItems.map((item, idx) => {
                      const isActive = activeIntimateIdx === idx;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setActiveIntimateIdx(idx)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-neutral-950 text-white shadow-md scale-105'
                              : 'bg-stone-100 hover:bg-stone-200/80 text-neutral-700 border border-neutral-200/60'
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botão de Ação CTA para o Formulário */}
              <div className="pt-4 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => handleCtaClick('moda-intima', currentIntimate.name)}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
                >
                  <span>Solicitar orçamento para {currentIntimate.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* =========================================
              PAINEL 02: LINHA PRAIA (INTERATIVO)
             ========================================= */}
          <div className="rounded-3xl overflow-hidden bg-white border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            {/* Banner com Foto Dinâmica e Animação Fluida */}
            <div className="relative h-64 sm:h-80 overflow-hidden bg-amber-50/60">
              <img
                key={currentBeach.image}
                src={currentBeach.image}
                alt={currentBeach.name}
                className="w-full h-full object-cover filter contrast-105 animate-in fade-in zoom-in-95 duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

              {/* Tag Superior */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-amber-200 shadow-sm text-xs font-semibold text-amber-950 flex items-center gap-2">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  <span>Linha Praia</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-amber-200 uppercase font-medium">
                  {currentBeach.badge}
                </span>
              </div>

              {/* Título Sobreposto na Foto */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-mono tracking-widest uppercase text-amber-200/90 block">
                  Aplicação Selecionada:
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight">
                  Embalagens para {currentBeach.name}
                </h3>
              </div>
            </div>

            {/* Corpo do Card com Seletores de Produto */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                <p className="text-sm text-neutral-600 leading-relaxed font-light min-h-[44px]">
                  {currentBeach.description}
                </p>

                {/* Seletores / Botões dos Produtos de Linha Praia */}
                <div className="space-y-2 pt-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 font-semibold block">
                    Escolha o produto para pré-visualizar:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {beachwearItems.map((item, idx) => {
                      const isActive = activeBeachIdx === idx;
                      return (
                        <button
                          key={item.name}
                          type="button"
                          onClick={() => setActiveBeachIdx(idx)}
                          className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? 'bg-amber-800 text-white shadow-md scale-105'
                              : 'bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200/70'
                          }`}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botão de Ação CTA para o Formulário */}
              <div className="pt-4 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => handleCtaClick('linha-praia', currentBeach.name)}
                  className="w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none"
                >
                  <span>Solicitar orçamento para {currentBeach.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
