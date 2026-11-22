import React, { useState } from 'react';
import { RotateCcw, Type, Palette } from 'lucide-react';
import { ParameterDefinition } from '../../types/model';
import { FontPickerModal } from './FontPickerModal';
import { ColorPickerModal } from './ColorPickerModal';

interface ParameterControlProps {
  param: ParameterDefinition;
  value: any;
  onChange: (id: string, value: any) => void;
  onReset: (id: string) => void;
}

export const ParameterControl: React.FC<ParameterControlProps> = ({
  param,
  value,
  onChange,
  onReset,
}) => {
  const [isFontModalOpen, setIsFontModalOpen] = useState(false);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const isChanged = value !== param.default;

  return (
    <div className="space-y-1.5 p-3 rounded-xl bg-slate-800/40 border border-slate-700/40 hover:border-slate-700/80 transition-colors">
      {/* Header com Label e Reset individual */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
          <span>{param.name}</span>
          {param.unit && (
            <span className="text-[10px] text-slate-500 font-mono">({param.unit})</span>
          )}
        </label>

        {isChanged && (
          <button
            onClick={() => onReset(param.id)}
            className="text-[10px] text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors px-1 py-0.5 rounded hover:bg-slate-700/50"
            title="Restaurar valor padrão"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Padrão</span>
          </button>
        )}
      </div>

      {param.description && (
        <p className="text-[11px] text-slate-400 leading-tight">
          {param.description}
        </p>
      )}

      {/* Renderização do Campo por Tipo */}
      {/* 1. SLIDER & NÚMERO */}
      {param.type === 'number' && (
        <div className="space-y-2 pt-1">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={param.min ?? 0}
              max={param.max ?? 100}
              step={param.step ?? 1}
              value={value ?? param.default}
              onChange={(e) => onChange(param.id, parseFloat(e.target.value))}
              className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <input
              type="number"
              min={param.min}
              max={param.max}
              step={param.step ?? 1}
              value={value ?? param.default}
              onChange={(e) => onChange(param.id, parseFloat(e.target.value) || 0)}
              className="w-16 px-2 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-right text-white focus:outline-none focus:border-brand-500"
            />
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>{param.min ?? 0}{param.unit}</span>
            <span>{param.max ?? 100}{param.unit}</span>
          </div>
        </div>
      )}

      {/* 2. TEXTO (STRING) */}
      {param.type === 'string' && (
        <div className="pt-1">
          <input
            type="text"
            value={value ?? param.default}
            onChange={(e) => onChange(param.id, e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
            maxLength={32}
          />
        </div>
      )}

      {/* 3. FONTE TIPOGRÁFICA (FONT) */}
      {param.type === 'font' && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsFontModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl text-left transition-colors group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <Type className="w-4 h-4 text-brand-400 shrink-0" />
              <span 
                className="text-xs sm:text-sm text-white font-medium truncate"
                style={{ fontFamily: `"${value || param.default}", sans-serif` }}
              >
                {value || param.default}
              </span>
            </div>
            <span className="text-[11px] text-brand-400 group-hover:underline">
              Alterar
            </span>
          </button>

          <FontPickerModal
            isOpen={isFontModalOpen}
            onClose={() => setIsFontModalOpen(false)}
            onSelectFont={(fontName) => onChange(param.id, fontName)}
            currentFont={value || param.default}
          />
        </div>
      )}

      {/* 4. COR (FILAMENTO PLA) */}
      {param.type === 'color' && (
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setIsColorModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-700 hover:border-slate-600 rounded-xl transition-colors group"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-5 h-5 rounded-md border border-slate-600 shadow-sm"
                style={{ backgroundColor: value || param.default }}
              />
              <span className="text-xs font-mono font-medium text-white uppercase">
                {value || param.default}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-brand-400 group-hover:underline">
              <Palette className="w-3.5 h-3.5" />
              <span>Paleta</span>
            </div>
          </button>

          <ColorPickerModal
            isOpen={isColorModalOpen}
            onClose={() => setIsColorModalOpen(false)}
            onSelectColor={(hex) => onChange(param.id, hex)}
            currentColor={value || param.default}
            title={`Cor: ${param.name}`}
          />
        </div>
      )}

      {/* 5. BOOLEAN (TOGGLE SWITCH) */}
      {param.type === 'boolean' && (
        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-slate-400">
            {value ? 'Ativado' : 'Desativado'}
          </span>
          <button
            type="button"
            onClick={() => onChange(param.id, !value)}
            className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
              value ? 'bg-brand-600' : 'bg-slate-700'
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                value ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      )}

      {/* 6. SELECT (DROPDOWN) */}
      {param.type === 'select' && (
        <div className="pt-1">
          <select
            value={value ?? param.default}
            onChange={(e) => onChange(param.id, e.target.value)}
            className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500 cursor-pointer"
          >
            {(param.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};
