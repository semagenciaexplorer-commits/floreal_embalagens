import React from 'react';
import { Layers, ShieldCheck, Eye, Sparkles, CheckCircle2, Box } from 'lucide-react';

export const OperationalCriteriaSection: React.FC = () => {
  const criteria = [
    {
      number: '01',
      title: 'Separação por Modelo e Tamanho',
      description:
        'Apoio direto à organização de estoque, separação por grade e identificação ágil de referências no ponto de venda e expedição.',
      icon: Layers,
    },
    {
      number: '02',
      title: 'Apresentação Uniforme e Consistente',
      description:
        'Visor translúcido em PVC cristal de alta nitidez que valoriza rendas, tecidos finos e estampas sem que a peça seja exposta ao toque constante.',
      icon: Eye,
    },
    {
      number: '03',
      title: 'Proteção Integral contra Manuseio',
      description:
        'Menor exposição das peças à sujidade, umidade e atrito durante o armazenamento, logística entre filiais e transporte interestadual.',
      icon: ShieldCheck,
    },
    {
      number: '04',
      title: 'Padronização de Coleções e Lotes',
      description:
        'Possibilidade de manter padrões visuais homogêneos em diferentes coleções, fortalecendo a identidade da marca no atacado e varejo.',
      icon: Box,
    },
    {
      number: '05',
      title: 'Adequação ao Formato de Cada Peça',
      description:
        'Estruturação sob medida considerando a anatomia de bojos, amarrações e tecidos sensíveis, evitando deformações e vincos permanentes.',
      icon: Sparkles,
    },
  ];

  return (
    <section id="criterios" className="relative py-16 lg:py-24 bg-white text-neutral-900 border-b border-neutral-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho Editorial */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-neutral-700 text-xs font-mono uppercase tracking-widest font-semibold border border-neutral-200/80 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            <span>Exigências Práticas da Indústria</span>
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
            Critérios Operacionais do Setor
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 font-normal">
            As embalagens Floreal são desenvolvidas para solucionar os desafios reais da rotina de confecções, marcas e distribuidores.
          </p>
        </div>

        {/* Grid Objetivo com 5 Critérios em Cards Arredondados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {criteria.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 sm:p-8 bg-white rounded-3xl border border-neutral-200/90 shadow-sm hover:shadow-md transition-all duration-300 space-y-4 flex flex-col justify-between ${
                  idx === 0 ? 'lg:col-span-1' : ''
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      CRITÉRIO {item.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-neutral-950">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs font-mono text-neutral-500">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Solução de fábrica Floreal</span>
                </div>
              </div>
            );
          })}

          {/* Card Resumo / Chamada Direta B2B */}
          <div className="p-6 sm:p-8 bg-neutral-950 rounded-3xl text-white shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-[10px] font-mono tracking-widest uppercase text-neutral-300">
                Engenharia de Embalagens
              </span>
              <h3 className="font-serif text-2xl font-bold">
                Desenvolva o formato ideal para sua coleção
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                Nossa equipe avalia as medidas das suas peças para indicar a espessura de PVC, tipo de fechamento e volumetria adequados.
              </p>
            </div>

            <a
              href="#orcamento"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-neutral-950 font-semibold text-xs uppercase tracking-widest hover:bg-neutral-100 transition-colors shadow-md"
            >
              <span>Consultar Viabilidade</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
