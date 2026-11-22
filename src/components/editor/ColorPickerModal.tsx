import React, { useState } from 'react';
import { X, Check, Palette, Sparkles } from 'lucide-react';
import { PLA_PRESETS, FilamentColor } from '../../config/filaments';

interface ColorPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectColor: (hex: string) => void;
  currentColor: string;
  title?: string;
}

export const ColorPickerModal: React.FC<ColorPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectColor,
  currentColor,
  title = 'Seletor de Cores de Filamento',
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [customHex, setCustomHex] = useState(currentColor || '#81314D');

  if (!isOpen) return null;

  const handleApplyCustom = () => {
    if (/^#[0-9A-F]{6}$/i.test(customHex)) {
      onSelectColor(customHex);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">{title}</h3>
              <p className="text-xs text-slate-400">
                Cores realistas baseadas em carretéis de filamento PLA para impressão 3D.
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

        {/* Tabs */}
        <div className="flex border-b border-slate-800 px-4 pt-3 gap-2 bg-slate-900/50">
          <button
            onClick={() => setActiveTab('presets')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'presets'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Filamentos PLA Populares
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'custom'
                ? 'border-brand-500 text-brand-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5" />
            Cor Personalizada (HEX)
          </button>
        </div>

        {/* Content */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {activeTab === 'presets' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {PLA_PRESETS.map((filament: FilamentColor) => {
                const isSelected =
                  currentColor.toUpperCase() === filament.hex.toUpperCase();
                return (
                  <button
                    key={filament.hex}
                    onClick={() => {
                      onSelectColor(filament.hex);
                      onClose();
                    }}
                    className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-brand-500 shadow-sm shadow-brand-500/20'
                        : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg border border-slate-600/50 shadow-inner flex items-center justify-center shrink-0"
                      style={{ backgroundColor: filament.hex }}
                    >
                      {isSelected && (
                        <Check
                          className={`w-4 h-4 ${
                            ['#FFFFFF', '#F5F2E8', '#CBD5E1', '#FACC15'].includes(
                              filament.hex.toUpperCase()
                            )
                              ? 'text-slate-900'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-slate-200 truncate">
                        {filament.name.split('(')[0]}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {filament.hex}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => setCustomHex(e.target.value.toUpperCase())}
                  className="w-14 h-14 rounded-xl cursor-pointer border border-slate-700 bg-transparent p-1"
                />
                <div className="flex-1 space-y-1">
                  <label className="text-xs font-semibold text-slate-300">
                    Código Hexadecimal
                  </label>
                  <input
                    type="text"
                    value={customHex}
                    onChange={(e) => setCustomHex(e.target.value.toUpperCase())}
                    placeholder="#81314D"
                    maxLength={7}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <button
                onClick={handleApplyCustom}
                className="w-full py-2.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-brand-900/40"
              >
                Aplicar Cor
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
