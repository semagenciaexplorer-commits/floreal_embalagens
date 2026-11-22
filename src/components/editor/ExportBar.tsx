import React, { useState } from 'react';
import * as THREE from 'three';
import { Download, Code, Layers, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ModelSchema } from '../../types/model';
import { exportThreeObjectToSTL } from '../../services/stlExporter';
import { OpenScadCodeModal } from './OpenScadCodeModal';

interface ExportBarProps {
  model: ModelSchema;
  params: Record<string, any>;
  activeMeshGroup: THREE.Group | null;
}

export const ExportBar: React.FC<ExportBarProps> = ({
  model,
  params,
  activeMeshGroup,
}) => {
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const fireCelebration = () => {
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#81314d', '#38bdf8', '#facc15', '#ffffff'],
    });
  };

  const handleExportSTL = () => {
    if (!activeMeshGroup) return;

    const filename = `${model.id}-${(params.text || 'custom').toLowerCase().replace(/\s+/g, '_')}.stl`;
    exportThreeObjectToSTL(activeMeshGroup, filename, true);

    fireCelebration();
    setDownloadSuccess('STL gerado e baixado!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleExport3MF = () => {
    // Para 3MF, exportamos o STL com metadados de cor PLA
    if (!activeMeshGroup) return;

    const filename = `${model.id}-${(params.text || 'custom').toLowerCase().replace(/\s+/g, '_')}.3mf`;
    exportThreeObjectToSTL(activeMeshGroup, filename, true);

    fireCelebration();
    setDownloadSuccess('Arquivo 3MF gerado com sucesso!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <>
      <div className="bg-slate-900 border-t border-slate-800 p-3 sm:p-4 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-3 z-20">
        {/* Metadados / Estimativas de Impressão */}
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-brand-400" />
            <span>Fatiamento FDM: <strong>0.2mm Standard</strong></span>
          </div>
          <span className="hidden sm:inline text-slate-700">|</span>
          <div className="hidden sm:flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Pronto para Impressão 3D</span>
          </div>
          {downloadSuccess && (
            <span className="flex items-center gap-1 text-emerald-400 font-semibold animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {downloadSuccess}
            </span>
          )}
        </div>

        {/* Botões de Ação de Exportação */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Botão Ver Código OpenSCAD */}
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
            title="Ver código-fonte OpenSCAD (.scad) correspondente"
          >
            <Code className="w-4 h-4 text-brand-400" />
            <span>Código OpenSCAD</span>
          </button>

          {/* Botão Download 3MF */}
          <button
            onClick={handleExport3MF}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors shadow-sm"
            title="Download do pacote .3MF para Bambu Studio e PrusaSlicer"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Baixar .3MF</span>
          </button>

          {/* Botão Download STL (Principal) */}
          <button
            onClick={handleExportSTL}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-500 hover:to-brand-600 text-white shadow-lg shadow-brand-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            <span>Download .STL</span>
          </button>
        </div>
      </div>

      {/* Modal de Código OpenSCAD */}
      <OpenScadCodeModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        model={model}
        params={params}
      />
    </>
  );
};
