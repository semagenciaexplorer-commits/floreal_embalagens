import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Box, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { ModelSchema } from '../../types/model';
import { MODELS_CATALOG } from '../../data/models';

interface ModelGalleryProps {
  onSelectModel: (model: ModelSchema) => void;
  onRequestModel: () => void;
}

export const ModelGallery: React.FC<ModelGalleryProps> = ({
  onSelectModel,
  onRequestModel,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = useMemo(() => {
    const cats = new Set(MODELS_CATALOG.map((m) => m.category));
    return ['Todos', ...Array.from(cats)];
  }, []);

  const filteredModels = useMemo(() => {
    return MODELS_CATALOG.filter((model) => {
      const matchesCategory =
        selectedCategory === 'Todos' || model.category === selectedCategory;
      const matchesSearch =
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      {/* Hero Banner Inspirado no Mafagrafos */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-brand-950/80 to-slate-900 border border-slate-800 p-8 sm:p-12 shadow-2xl">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engenharia Paramétrica 3D em Tempo Real</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Personalize modelos 3D <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-rose-300">
              direto no navegador.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Ajuste dimensões, tipografias sincronizadas com o OpenSCAD, textos e cores de filamento. Baixe arquivos STL prontos para impressão 3D em segundos.
          </p>
        </div>
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Categorias */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Input de Pesquisa */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar modelos, tags..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-brand-500"
          />
        </div>
      </div>

      {/* Grid de Cards de Modelos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            className="group rounded-2xl bg-slate-900 border border-slate-800/80 hover:border-brand-500/50 overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col"
          >
            {/* Thumbnail */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950">
              <img
                src={model.thumbnail}
                alt={model.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              
              <div className="absolute top-3 left-3">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-[11px] font-semibold text-brand-300 border border-slate-700/70">
                  {model.category}
                </span>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-brand-300 transition-colors">
                  {model.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {model.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {model.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-slate-400 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botão de Ação */}
              <button
                onClick={() => onSelectModel(model)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-brand-600 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all group-hover:shadow-md"
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Personalizar Modelo</span>
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Banner de Solicitação de Modelo Personalizado */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm sm:text-base">
              Não encontrou o modelo paramétrico que precisa?
            </h4>
            <p className="text-xs text-slate-400">
              Envie fotos, rascunhos e as variáveis desejadas. Nossa equipe cria e disponibiliza no catálogo!
            </p>
          </div>
        </div>

        <button
          onClick={onRequestModel}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold shadow-md transition-all shrink-0"
        >
          Fazer Solicitação
        </button>
      </div>
    </div>
  );
};
