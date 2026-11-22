import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, ArrowUp } from 'lucide-react';
import { FLOREAL_CONFIG } from '../../config/floreal';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#eae8e3] text-neutral-700 border-t border-neutral-300 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Coluna Marca e Tradição */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/floreal-logo.png"
                srcSet="/floreal-logo.png 1x, /floreal-logo@2x.png 2x"
                alt="Floreal Embalagens"
                className="h-9 sm:h-10 w-auto object-contain"
              />
              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase border-l border-neutral-300 pl-3 py-1">
                Desde 1961 • SP
              </span>
            </div>

            <p className="text-neutral-600 font-light leading-relaxed max-w-sm">
              Fabricação própria de embalagens em PVC desde 1961 no Bom Retiro, São Paulo. Soluções estruturadas para confecções de moda íntima e marcas de moda praia em todo o território nacional.
            </p>

            <div className="pt-2 text-[11px] font-mono text-neutral-500 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Fornecimento exclusivo B2B em volume</span>
            </div>
          </div>

          {/* Coluna Navegação Segmentada */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-semibold block">
              Categorias & Soluções
            </span>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => handleNavClick('#solucoes')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Embalagens para Moda Íntima
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#solucoes')}
                  className="hover:text-amber-700 transition-colors"
                >
                  Embalagens para Linha Praia
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#acabamentos')}
                  className="hover:text-neutral-950 transition-colors"
                >
                  Acabamentos com Zíper & Botão
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#orcamento')}
                  className="hover:text-neutral-950 transition-colors font-medium text-neutral-900"
                >
                  Solicitar Proposta B2B
                </button>
              </li>
            </ul>
          </div>

          {/* Coluna Institucional & Contato Fabril */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-900 font-semibold block">
              Unidade Fabril & Atendimento
            </span>
            <div className="space-y-2.5 text-neutral-600 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-neutral-500 flex-shrink-0 mt-0.5" />
                <span>Bom Retiro, São Paulo - SP • Atendimento em todo o Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                <span>Segunda a Sexta, das 08h às 17h30</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-neutral-200/80 text-neutral-600 hover:text-neutral-950 hover:border-neutral-300 transition-all font-mono text-[11px] uppercase tracking-wider shadow-sm"
                >
                  <span>Voltar ao topo</span>
                  <ArrowUp className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé Legal e LGPD */}
        <div className="pt-8 border-t border-neutral-200/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            © {new Date().getFullYear()} {FLOREAL_CONFIG.brand.legalName} • Todos os direitos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span>Privacidade & LGPD Conforme</span>
            <span>•</span>
            <span>Desde 1961</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

