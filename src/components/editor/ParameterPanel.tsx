import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Layers 
} from 'lucide-react';
import { ModelSchema } from '../../types/model';
import { ParameterControl } from './ParameterControl';

interface ParameterPanelProps {
  model: ModelSchema;
  params: Record<string, any>;
  onChangeParam: (id: string, value: any) => void;
  onResetParam: (id: string) => void;
  onResetAll: () => void;
}

export const ParameterPanel: React.FC<ParameterPanelProps> = ({
  model,
  params,
  onChangeParam,
  onResetParam,
  onResetAll,
}) => {
  // Inicialmente todas as seções abertas
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <aside className="w-full lg:w-96 bg-slate-900 border-l border-slate-800 flex flex-col h-full overflow-hidden">
      {/* Header do Painel */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-white">Parâmetros do Modelo</h2>
            <span className="text-[11px] text-slate-400 font-medium">
              Ajuste em tempo real
            </span>
          </div>
        </div>

        <button
          onClick={onResetAll}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-700/60 transition-colors"
          title="Restaurar todos os parâmetros para os valores originais"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Geral</span>
        </button>
      </div>

      {/* Lista de Seções com Accordion */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {model.sections.map((section) => {
          const isCollapsed = !!collapsedSections[section.id];

          return (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-sm"
            >
              {/* Cabeçalho da Seção */}
              <button
                type="button"
                onClick={() => toggleSection(section.id)}
                className="w-full p-3.5 flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/70 transition-colors text-left"
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-brand-400" />
                    {section.title}
                  </span>
                  {section.description && (
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {section.description}
                    </p>
                  )}
                </div>

                <div className="p-1 text-slate-400">
                  {isCollapsed ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronUp className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Controles de Parâmetros dentro da Seção */}
              {!isCollapsed && (
                <div className="p-3.5 space-y-3 bg-slate-900/30">
                  {section.parameters.map((param) => (
                    <ParameterControl
                      key={param.id}
                      param={param}
                      value={params[param.id]}
                      onChange={onChangeParam}
                      onReset={onResetParam}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Dica Informativa tipo Mafagrafos */}
        <div className="p-3 rounded-xl bg-brand-950/40 border border-brand-800/30 text-xs text-brand-200 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Cada ajuste de parâmetro gera o código OpenSCAD correspondente de forma instantânea, pronto para fatiar no Bambu Studio, OrcaSlicer ou Cura.
          </p>
        </div>
      </div>
    </aside>
  );
};
