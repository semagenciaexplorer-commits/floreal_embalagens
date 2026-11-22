import React from 'react';
import { ArrowUpRight, Check, Layers, Shield, Sparkles, Box, SlidersHorizontal, PackageCheck } from 'lucide-react';
import { trackCategorySelect } from '../../services/analytics';

interface IntimateFashionSectionProps {
  onSelectCategory: (category: 'moda-intima') => void;
}

export const IntimateFashionSection: React.FC<IntimateFashionSectionProps> = ({ onSelectCategory }) => {
  const handleCtaClick = () => {
    trackCategorySelect('moda-intima', 'section_intimate_cta');
    onSelectCategory('moda-intima');
    const el = document.querySelector('#orcamento');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 6 aplicações visuais com fotos estritamente de Moda Íntima
  const intimateApplications = [
    {
      title: 'Embalagens para lingerie',
      description: 'Envelopes e nécessaires em PVC cristal que valorizam rendas delicadas e detalhes finos sem amassar a peça.',
      image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=800&auto=format&fit=crop',
      badge: 'Zíper ou Botão',
    },
    {
      title: 'Embalagens para calcinhas',
      description: 'Formatos compactos com excelente solda lateral, ideais para exposição vertical em gôndolas e araras.',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
      badge: 'Multi-pack ou Unitária',
    },
    {
      title: 'Embalagens para sutiãs',
      description: 'Bolsas estruturadas que preservam a anatomia e o bojo, evitando deformações no transporte e estoque.',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=800&auto=format&fit=crop',
      badge: 'Proteção de Bojo',
    },
    {
      title: 'Embalagens para cuecas',
      description: 'Acondicionamento premium para underwear masculino, com visor translúcido ou cristal de alta nitidez.',
      image: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?q=80&w=800&auto=format&fit=crop',
      badge: 'Organização Varejo',
    },
    {
      title: 'Embalagens para conjuntos',
      description: 'Estojos com divisórias ou capacidade dimensional para acomodar conjuntos completos de forma alinhada.',
      image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop',
      badge: 'Apresentação Coordenada',
    },
    {
      title: 'Embalagens para kits',
      description: 'Soluções econômicas e sofisticadas para kits promocionais, datas comemorativas e lotes atacadistas.',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
      badge: 'Volume Promocional',
    },
  ];

  // 5 necessidades comerciais da categoria Moda Íntima
  const commercialNeeds = [
    {
      title: 'Organização por modelo e tamanho',
      description: 'Transparência cristalina que acelera o manuseio no estoque e facilita a separação de grades de cores e numerações.',
    },
    {
      title: 'Apresentação uniforme das peças',
      description: 'Padronização estética impecável nas araras, gavetas e vitrines do lojista multimarcas.',
    },
    {
      title: 'Proteção contra manuseio',
      description: 'Barreira eficaz contra poeira, oleosidade e atrito constante nos pontos de venda.',
    },
    {
      title: 'Padronização de coleções',
      description: 'Consistência dimensional e visual mantida lote a lote, fundamental para marcas consolidadas.',
    },
    {
      title: 'Embalagens adequadas ao varejo e atacado',
      description: 'Resistência calculada para suportar tanto o transporte fracionado quanto o armazenamento em centros de distribuição.',
    },
  ];

  return (
    <section id="moda-intima" className="relative py-16 lg:py-28 bg-[#fafaf9] text-neutral-900 overflow-hidden">
      {/* Luz difusa de fundo */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-stone-200/50 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 lg:space-y-24">
        {/* Cabeçalho da Categoria com Tipografia Editorial */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-neutral-200">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-neutral-900" />
              <span>Categoria 01 • Atendimento Especializado</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
              Embalagens para Moda Íntima
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
              Soluções em PVC para marcas e confecções de lingerie, calcinhas, sutiãs, cuecas e conjuntos que precisam de apresentação consistente, proteção e organização.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-2.5 px-7 py-4 bg-neutral-900 hover:bg-black text-white font-semibold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-neutral-900/15 hover:shadow-xl hover:shadow-neutral-900/25 transition-all duration-300 focus:outline-none"
            >
              <span>Solicitar orçamento para Moda Íntima</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Galeria Editorial de Aplicações com Cards Arredondados */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 uppercase tracking-widest font-semibold">
            <span>Aplicações Comerciais de Embalagem</span>
            <span>Estúdio Editorial • PVC Cristal</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {intimateApplications.map((app, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 flex flex-col justify-between overflow-hidden p-3"
              >
                {/* Imagem com enquadramento de estúdio e cantos arredondados */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100">
                  <img
                    src={app.image}
                    alt={app.title}
                    className="w-full h-full object-cover filter contrast-105 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Gradiente translúcido */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  
                  {/* Tag do acabamento em pill */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-sm border border-neutral-200 text-[11px] font-semibold tracking-wider text-neutral-800 uppercase">
                      {app.badge}
                    </span>
                  </div>
                </div>

                {/* Conteúdo textual da aplicação */}
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-neutral-950 group-hover:text-neutral-800 transition-colors">
                      {app.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light mt-1.5">
                      {app.description}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-medium text-neutral-500">
                    <span>Sob demanda técnica</span>
                    <span className="text-neutral-900 group-hover:underline">Consulte formatos →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Destaque das Necessidades Comerciais Próprias da Moda Íntima em Card Arredondado */}
        <div className="bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-10 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="space-y-8 relative z-10">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-500">
                Critérios Operacionais do Setor
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal">
                Necessidades comerciais atendidas na confecção íntima
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
              {commercialNeeds.map((need, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-stone-50 rounded-2xl border border-neutral-200/60 hover:bg-stone-100/60 transition-colors space-y-3"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-mono font-bold">
                      0{idx + 1}
                    </span>
                    <h4 className="text-sm font-semibold text-neutral-900">{need.title}</h4>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-light pl-8">
                    {need.description}
                  </p>
                </div>
              ))}

              {/* Card de Chamada Rápida */}
              <div className="p-6 bg-neutral-900 rounded-2xl text-white flex flex-col justify-between space-y-4 shadow-lg shadow-neutral-900/10">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">Personalização</span>
                  <h4 className="text-sm font-semibold text-white">Precisa de medidas específicas para sua coleção?</h4>
                  <p className="text-xs text-neutral-300 font-light">
                    Desenvolvemos protótipos e gabaritos em PVC conforme as dimensões exatas das suas peças.
                  </p>
                </div>
                <button
                  onClick={handleCtaClick}
                  className="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-950 font-semibold text-xs uppercase tracking-wider text-center rounded-full transition-colors"
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


