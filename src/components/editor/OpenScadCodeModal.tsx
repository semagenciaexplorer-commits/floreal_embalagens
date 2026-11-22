import React, { useState } from 'react';
import { X, Copy, Check, Download, Code2, Terminal } from 'lucide-react';
import { ModelSchema } from '../../types/model';
import { generateOpenScadScript, downloadOpenScadFile } from '../../services/openscadGenerator';

interface OpenScadCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: ModelSchema;
  params: Record<string, any>;
}

export const OpenScadCodeModal: React.FC<OpenScadCodeModalProps> = ({
  isOpen,
  onClose,
  model,
  params,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const code = generateOpenScadScript(model, params);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    downloadOpenScadFile(model, params);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 text-brand-400 flex items-center justify-center">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Código Fonte OpenSCAD (.scad)
              </h3>
              <p className="text-xs text-slate-400">
                Código paramétrico com biblioteca BOSL2 compatível com CLI e OpenSCAD GUI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white shadow-md shadow-brand-900/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .scad</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs text-emerald-400 leading-relaxed select-text">
          <pre className="whitespace-pre">{code}</pre>
        </div>

        {/* Footer com instruções do terminal CLI */}
        <div className="p-3.5 border-t border-slate-800 bg-slate-900/70 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-brand-400" />
            <span>
              Compilação via terminal:{' '}
              <code className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[11px]">
                openscad -o output.stl {model.id}.scad
              </code>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
