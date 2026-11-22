import React, { useState, useMemo } from 'react';
import { Search, X, Check, Type } from 'lucide-react';
import { FONTS_CATALOG, FONT_CATEGORIES, FontOption } from '../../config/fonts';

interface FontPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectFont: (fontName: string) => void;
  currentFont: string;
}

export const FontPickerModal: React.FC<FontPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectFont,
  currentFont,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewText, setPreviewText] = useState('Texto de Exemplo 123');

  const filteredFonts = useMemo(() => {
    return FONTS_CATALOG.filter((f) => {
      const matchesCategory =
        selectedCategory === 'Todas' || f.category === selectedCategory;
      const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Type className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Escolha uma Fonte Tipográfica
              </h3>
              <p className="text-xs text-slate-400">
                Sincronizada com o catálogo de fontes compatíveis com OpenSCAD.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Controls: Search & Custom Preview Text */}
        <div className="p-4 border-b border-slate-800/80 space-y-3 bg-slate-900/50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Input de Busca */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar fonte..."
                className="w-full pl-9 pr-3 py-2 bg-slate-800/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Texto de Pré-visualização Customizado */}
            <div>
              <input
                type="text"
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                placeholder="Digite para testar nas fontes..."
                className="w-full px-3 py-2 bg-slate-800/90 border border-slate-700/70 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 font-medium"
              />
            </div>
          </div>

          {/* Categorias */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {FONT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-brand-600 text-white'
                    : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Fontes */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2.5 divide-y divide-slate-800/50">
          {filteredFonts.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Nenhuma fonte encontrada para "{searchQuery}".
            </div>
          ) : (
            filteredFonts.map((font) => {
              const isSelected = currentFont === font.name;
              return (
                <div
                  key={font.name}
                  onClick={() => {
                    onSelectFont(font.name);
                    onClose();
                  }}
                  className={`pt-2.5 first:pt-0 group flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-brand-900/30 border border-brand-500/50'
                      : 'hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="space-y-1 overflow-hidden pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-300">
                        {font.name}
                      </span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {font.category}
                      </span>
                    </div>
                    {/* Visualização da Fonte em Tempo Real */}
                    <div
                      className="text-lg text-white truncate group-hover:text-brand-300 transition-colors"
                      style={{ fontFamily: `"${font.name}", ${font.fallback}` }}
                    >
                      {previewText || font.name}
                    </div>
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <div className="w-7 h-7 rounded-full bg-brand-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full border border-slate-700 group-hover:border-slate-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Check className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
