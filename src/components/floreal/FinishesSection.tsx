import React from 'react';
import { Sliders, CheckCircle2, Sparkles } from 'lucide-react';

export const FinishesSection: React.FC = () => {
  const finishes = [
    {
      title: 'Embalagens com zíper',
      subtitle: 'Fechamento prático & Reutilização',
      description:
        'Alternativa para projetos que necessitam de fechamento prático, organização e possibilidade de reutilização pelo cliente final. O zíper desliza com suavidade e oferece vedação contra resíduos externos.',
      details: [
        'Cursor de fácil deslizamento',
        'Solda eletrônica perimetral reforçada',
        'Excelente apelo para nécessaires e viagens',
      ],
      image: '/images/floreal/ziper-01.webp',
      technicalTag: 'Opção de Fechamento A',
    },
    {
      title: 'Embalagens com botão',
      subtitle: 'Estrutura clássica & Encaixe seguro',
      description:
        'Opção de fechamento para diferentes formatos de apresentação e acondicionamento. Proporciona um fechamento seguro através de botão de pressão metálico ou plástico de alto padrão.',
      details: [
        'Botão de pressão resistente a tração',
        'Acabamento discreto e funcional',
        'Ideal para envelopes de lingerie e sungas',
      ],
      image: '/images/floreal/botao-01.webp',
      technicalTag: 'Opção de Fechamento B',
    },
    {
      title: 'Formatos personalizados',
      subtitle: 'Engenharia sob medida',
      description:
        'Soluções desenvolvidas considerando dimensões, características da peça e necessidades comerciais do projeto. Desde furação para cabides até folgas específicas para tecidos volumosos.',
      details: [
        'Desenvolvimento de gabarito próprio',
        'Espessuras de PVC cristal ou translúcido',
        'Avaliação dimensional caso a caso',
      ],
      image: '/images/floreal/transparente-01.webp',
      technicalTag: 'Engenharia de Projeto',
    },
  ];

  return (
    <section id="acabamentos" className="relative py-16 lg:py-24 bg-white text-neutral-900 border-b border-neutral-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 lg:space-y-16">
        {/* Cabeçalho da Seção de Acabamentos */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
            <Sliders className="w-3.5 h-3.5 text-neutral-500" />
            <span>Versatilidade Construtiva Floreal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
            O acabamento acompanha a necessidade de cada produto.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
            Tanto na moda íntima quanto na linha praia, a escolha do fecho e do formato depende da rotina de manuseio no ponto de venda e da experiência pretendida pela marca.
          </p>
        </div>

        {/* Grade de Acabamentos com Detalhes Macro em Cards Arredondados */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {finishes.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 flex flex-col justify-between overflow-hidden p-3.5 group"
            >
              {/* Imagem Macro com Cantos Arredondados */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full shadow-sm border border-neutral-200 text-[10px] font-mono tracking-wider text-neutral-800 uppercase font-semibold">
                  {item.technicalTag}
                </span>
              </div>

              {/* Corpo Textual */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-1.5">
                  <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider block font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-neutral-950 group-hover:text-neutral-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Lista de Recursos Técnicos */}
                <div className="pt-4 border-t border-neutral-100 space-y-2">
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-neutral-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


