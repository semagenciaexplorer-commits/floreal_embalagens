import React from 'react';
import { ArrowUpRight, Sun, Droplets, Shield, Compass, Waves } from 'lucide-react';
import { trackCategorySelect } from '../../services/analytics';

interface BeachwearSectionProps {
  onSelectCategory: (category: 'linha-praia') => void;
}

export const BeachwearSection: React.FC<BeachwearSectionProps> = ({ onSelectCategory }) => {
  const handleCtaClick = () => {
    trackCategorySelect('linha-praia', 'section_beachwear_cta');
    onSelectCategory('linha-praia');
    const el = document.querySelector('#orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 aplicações visuais com fotos estritamente de Linha Praia
  const beachwearApplications = [
    {
      title: 'Embalagens para biquínis',
      description: 'Envelopes impermeáveis e nécessaires com zíper hermético ou botão, ideais para o pós-compra e uso em praia/piscina.',
      image: 'https://images.unsplash.com/photo-1576188973526-0e5d7047b0cf?q=80&w=800&auto=format&fit=crop',
      badge: 'Resistente à Umidade',
    },
    {
      title: 'Embalagens para maiôs',
      description: 'Estruturas em dimensões alongadas que acomodam cortes inteiros, peças com metais e amarrações sem marcas vincadas.',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop',
      badge: 'Formato Alongado',
    },
    {
      title: 'Embalagens para sungas',
      description: 'Modelos compactos de alta densidade visual, com fechamento prático para coleções masculinas de beachwear.',
      image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop',
      badge: 'Compacta & Prática',
    },
    {
      title: 'Embalagens para conjuntos de praia',
      description: 'Estojos com capacidade volumétrica para acomodar tops, tangas e saídas coordenadas em um mesmo invólucro limpo.',
      image: 'https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop',
      badge: 'Capacidade Coordenada',
    },
    {
      title: 'Embalagens para kits',
      description: 'Soluções desenvolvidas para combos de verão, kits família e composições de atacado com excelente apresentação.',
      image: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=800&auto=format&fit=crop',
      badge: 'Kits & Combos Verão',
    },
    {
      title: 'Embalagens para coleções de moda praia',
      description: 'Projetos sob medida com espessuras e formatos pensados para valorizar os lançamentos da alta temporada.',
      image: 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?q=80&w=800&auto=format&fit=crop',
      badge: 'Coleções Sazonais',
    },
  ];

  // 5 necessidades comerciais da categoria Linha Praia
  const commercialNeeds = [
    {
      title: 'Organização das coleções',
      description: 'Visibilidade imediata das estampas, texturas de poliamida e detalhes de amarrações das linhas de verão.',
    },
    {
      title: 'Separação por modelo e tamanho',
      description: 'Agilidade na montagem de pedidos e distribuição para pontos de venda e redes de revenda multimarcas.',
    },
    {
      title: 'Apresentação consistente',
      description: 'Alinhamento visual da marca nas lojas de litoral, boutiques de resort e canais de e-commerce.',
    },
    {
      title: 'Proteção durante armazenamento e transporte',
      description: 'Proteção contra poeira de estoque, umidade ambiente e atritos durante o transporte logístico interestadual.',
    },
    {
      title: 'Adequação da embalagem ao formato das peças',
      description: 'Espaço interno calculado para respeitar ferragens, argolas, bojos e tecidos delicados de praia.',
    },
  ];

  return (
    <section id="linha-praia" className="relative py-16 lg:py-28 bg-gradient-to-b from-amber-50/40 via-stone-50/60 to-[#fafaf9] text-neutral-900 overflow-hidden border-t border-neutral-200">
      {/* Luz ambiente natural com tons suaves */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-24">
        {/* Cabeçalho da Categoria Linha Praia */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-amber-200/80">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-amber-300 text-xs font-semibold tracking-wider uppercase text-amber-900 shadow-sm">
              <Sun className="w-3.5 h-3.5 text-amber-600" />
              <span>Categoria 02 • Atendimento Especializado</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-950 tracking-tight">
              Embalagens para Linha Praia
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
              Soluções em PVC para marcas e confecções de biquínis, maiôs, sungas e coleções de moda praia, considerando a apresentação, a proteção e a organização de cada linha.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-2.5 px-7 py-4 bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-amber-900/15 hover:shadow-xl hover:shadow-amber-900/25 transition-all duration-300 focus:outline-none"
            >
              <span>Solicitar orçamento para Linha Praia</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Galeria Editorial de Aplicações com Cards Arredondados */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-amber-900/80 uppercase tracking-widest font-semibold">
            <span>Aplicações Comerciais de Embalagem</span>
            <span>Luminosidade Natural • Proteção Impermeável</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {beachwearApplications.map((app, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border border-amber-200/70 hover:border-amber-300 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-400 flex flex-col justify-between overflow-hidden p-3"
              >
                {/* Imagem com iluminação natural e cantos arredondados */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradiente solar suave */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Tag do acabamento em pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-amber-200 text-[11px] font-semibold tracking-wider text-amber-900 uppercase">
                      {app.badge}
                    </span>
                  </div>
                </div>

                {/* Conteúdo textual da aplicação */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-amber-950 group-hover:text-amber-900 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mt-1.5">
                      {app.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-amber-100 flex items-center justify-between text-xs font-medium text-amber-800">
                    <span>Sob demanda técnica</span>
                    <span className="group-hover:underline">Consulte formatos →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destaque das Necessidades Comerciais Próprias da Linha Praia em Card Arredondado */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="space-y-8 relative z-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-800">
                Critérios Operacionais do Setor
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-amber-950 font-normal">
                Necessidades comerciais atendidas no segmento beachwear
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {commercialNeeds.map((need, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-amber-50/50 rounded-2xl border border-amber-200/60 hover:bg-amber-50 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-700 text-white flex items-center justify-center text-xs font-mono font-bold">
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-amber-950">{need.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light pl-8">
                    {need.description}
                  </p>
                </div>
              ))}

              {/* Card de Chamada Rápida */}
              <div className="p-6 bg-amber-900 rounded-2xl text-white flex flex-col justify-between space-y-4 shadow-lg shadow-amber-900/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-amber-300">Coleção Verão</span>
                  <h4 className="text-sm font-semibold text-white">Preparando o lançamento da temporada?</h4>
                  <p className="text-xs text-amber-100 font-light">
                    Planeje com antecedência a produção de embalagens em volume para garantir entrega pontual aos lojistas.
                  </p>
                </div>
                <button
                  onClick={handleCtaClick}
                  className="w-full py-3 bg-white hover:bg-amber-50 text-amber-950 font-semibold text-xs uppercase tracking-wider text-center rounded-full transition-colors"
                >
                  Configurar orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


