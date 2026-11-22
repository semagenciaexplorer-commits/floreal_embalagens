import React from 'react';
import { Eye, ShieldCheck, LayoutGrid, CheckCheck, Sparkles, Building2 } from 'lucide-react';

export const B2BBenefitsSection: React.FC = () => {
  return (
    <section className="relative py-16 lg:py-28 bg-[#f2f0ea] text-neutral-900 overflow-hidden border-b border-neutral-300">
      {/* Luz ambiente de fundo suave */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-stone-200/50 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-14 lg:space-y-20">
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-neutral-500" />
            <span>Impacto Operacional & Logístico</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15]">
            Uma embalagem adequada também facilita a rotina de quem produz e comercializa.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light">
            Para indústrias e confecções, a embalagem em PVC não é apenas um invólucro estético: é uma ferramenta funcional que preserva o padrão de qualidade da fábrica até o lojista.
          </p>
        </div>

        {/* Grade Editorial Assimétrica com Cards Modernos e Cantos Arredondados (rounded-3xl) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* BLOCO 01 (Destaque Maior): Apresentação */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-12 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-semibold tracking-wider uppercase text-neutral-700">
                  Pilar 01
                </span>
                <span className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <Eye className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal">
                Apresentação
              </h3>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-xl">
                Consistência visual para diferentes produtos e coleções. A transparência do PVC de alto brilho valoriza tecidos nobres, rendas, cores solares e acabamentos da peça sem distorção óptica.
              </p>
            </div>

            <div className="pt-8 mt-6 border-t border-neutral-100 grid grid-cols-2 gap-4 text-xs font-mono text-neutral-500">
              <div className="space-y-1">
                <span className="text-neutral-900 block font-sans font-semibold text-sm">Valorização em PDV</span>
                <span>Destaque imediato em araras e vitrines</span>
              </div>
              <div className="space-y-1">
                <span className="text-neutral-900 block font-sans font-semibold text-sm">Percepção de Marca</span>
                <span>Sofisticação percebida pelo lojista</span>
              </div>
            </div>
          </div>

          {/* BLOCO 02: Proteção */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-semibold tracking-wider uppercase text-neutral-700">
                  Pilar 02
                </span>
                <span className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-serif text-2xl text-neutral-950 font-normal">
                Proteção
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                Menor exposição das peças ao manuseio durante armazenamento e transporte. Cria uma barreira eficaz contra poeira, atrito de caixas, marcas de dedos e umidade eventual durante o trajeto logístico.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 text-xs font-mono text-neutral-500 font-medium">
              <span>Redução de perdas e devoluções no estoque</span>
            </div>
          </div>

          {/* BLOCO 03: Organização */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-semibold tracking-wider uppercase text-neutral-700">
                  Pilar 03
                </span>
                <span className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-serif text-2xl text-neutral-950 font-normal">
                Organização
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                Apoio à separação e identificação de modelos e tamanhos. A visibilidade total agiliza o trabalho das equipes de expedição e dos vendedores nas lojas, facilitando a contagem de inventário.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 text-xs font-mono text-neutral-500 font-medium">
              <span>Agilidade no picking e conferência de pedidos</span>
            </div>
          </div>

          {/* BLOCO 04: Padronização */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-neutral-200/80 p-8 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-neutral-900/5 transition-all duration-400 group">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-neutral-100 text-xs font-mono font-semibold tracking-wider uppercase text-neutral-700">
                  Pilar 04
                </span>
                <span className="w-10 h-10 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-900 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                  <CheckCheck className="w-5 h-5" />
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-neutral-950 font-normal">
                Padronização
              </h3>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed font-light max-w-xl">
                Possibilidade de manter padrões de embalagem em diferentes coleções e lotes. Garante que reposições futuras mantenham exatamente as mesmas dimensões, soldas e acabamentos das remessas anteriores.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-500">
              <span className="text-neutral-700 font-semibold">Repetibilidade fabril garantida</span>
              <span className="text-neutral-400">• Fabricação Própria Floreal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


