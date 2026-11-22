import React from 'react';
import { Factory, Calendar, MapPin, Truck, Check } from 'lucide-react';
import { FLOREAL_CONFIG } from '../../config/floreal';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="relative py-16 lg:py-28 bg-[#f2f0ea] text-neutral-900 border-b border-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Coluna Visual: Fabricação e Tradição com Moldura Arredondada */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative bg-white rounded-3xl border border-neutral-200/80 p-4 sm:p-5 shadow-xl shadow-neutral-900/5">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src="/images/floreal/fabrica-01.jpg"
                  alt="Instalações fabris da Floreal Embalagens no Bom Retiro, São Paulo"
                  className="w-full h-full object-cover filter contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Placa Industrial de Tradição em Card Flutuante Arredondado */}
                <div className="absolute bottom-5 left-5 right-5 p-5 bg-white/95 rounded-2xl border border-neutral-200 backdrop-blur-md space-y-2 shadow-lg">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                    <span>Parque Fabril</span>
                    <span className="text-emerald-700 flex items-center gap-1 font-bold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Ativo
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-neutral-950">
                    Bom Retiro, São Paulo - SP
                  </h4>
                  <p className="text-xs text-neutral-600 font-normal leading-relaxed">
                    Instalações estruturadas para corte, solda eletrônica de alta frequência e conformação de embalagens em PVC.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Textual Institucional */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
                <Factory className="w-3.5 h-3.5 text-neutral-500" />
                <span>Indústria Nacional de Embalagens</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight leading-[1.15]">
                Desde 1961, experiência na fabricação de embalagens.
              </h2>
              
              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                A Floreal possui fabricação própria no Bom Retiro, em São Paulo, e atua no desenvolvimento de embalagens em PVC para empresas de diferentes segmentos.
              </p>
              
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-light">
                Para marcas e confecções de moda íntima e linha praia, oferece possibilidades de soluções personalizadas, considerando as características dos produtos e as necessidades de apresentação e fornecimento.
              </p>
            </div>

            {/* 4 Destaques Elegantes da Marca em Cards Arredondados */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-neutral-200">
              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <Calendar className="w-4 h-4 text-neutral-700" />
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">1961</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Desde 1961</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <Factory className="w-4 h-4 text-neutral-700" />
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">Própria</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Fabricação própria</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <MapPin className="w-4 h-4 text-neutral-700" />
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">São Paulo</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Bom Retiro / SP</span>
                </div>
              </div>

              <div className="p-4 bg-white rounded-2xl border border-neutral-200 shadow-sm space-y-2">
                <Truck className="w-4 h-4 text-neutral-700" />
                <div>
                  <span className="block font-serif text-2xl sm:text-3xl text-neutral-950 font-bold">Brasil</span>
                  <span className="text-xs text-neutral-500 uppercase tracking-wider block font-medium">Atendimento nacional</span>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs font-mono text-neutral-600 flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Fornecimento estruturado para confecções, marcas e redes de distribuição</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


