import React from 'react';
import { 
  Camera, 
  SunMedium, 
  Grid, 
  Maximize2, 
  RotateCcw, 
  AlertTriangle 
} from 'lucide-react';

export type CameraPreset = 'iso' | 'top' | 'front' | 'side';
export type LightingPreset = 'studio' | 'soft' | 'bright' | 'dramatic';

interface ViewportControlsProps {
  cameraPreset: CameraPreset;
  onSelectCamera: (preset: CameraPreset) => void;
  lightingPreset: LightingPreset;
  onSelectLighting: (preset: LightingPreset) => void;
  showGrid: boolean;
  onToggleGrid: () => void;
  wireframe: boolean;
  onToggleWireframe: () => void;
  onResetView: () => void;
  dimensions: { width: number; height: number; depth: number };
}

export const ViewportControls: React.FC<ViewportControlsProps> = ({
  cameraPreset,
  onSelectCamera,
  lightingPreset,
  onSelectLighting,
  showGrid,
  onToggleGrid,
  wireframe,
  onToggleWireframe,
  onResetView,
  dimensions,
}) => {
  const isThin = dimensions.depth < 1.0;

  return (
    <>
      {/* Top Floating Bar: Câmeras e Iluminação */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        {/* Dimensões em Tempo Real */}
        <div className="bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-700/70 shadow-lg pointer-events-auto flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-slate-500 font-sans font-semibold">L:</span>
            <span className="text-white font-bold">{dimensions.width}</span>
            <span className="text-slate-500">mm</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-slate-500 font-sans font-semibold">A:</span>
            <span className="text-white font-bold">{dimensions.height}</span>
            <span className="text-slate-500">mm</span>
          </div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1 text-slate-300">
            <span className="text-slate-500 font-sans font-semibold">P:</span>
            <span className="text-white font-bold">{dimensions.depth}</span>
            <span className="text-slate-500">mm</span>
          </div>

          {/* Thin wall warning (Inspirado no Mafagrafos) */}
          {isThin && (
            <div 
              className="flex items-center gap-1 text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 text-[11px]"
              title="Aviso: Espessura baixa detectada. Paredes muito finas podem não imprimir bem em bicos 0.4mm."
            >
              <AlertTriangle className="w-3 h-3" />
              <span>Parede Fina</span>
            </div>
          )}
        </div>

        {/* Presets de Câmera */}
        <div className="bg-slate-900/85 backdrop-blur-md p-1 rounded-xl border border-slate-700/70 shadow-lg pointer-events-auto flex items-center gap-1">
          <button
            onClick={() => onSelectCamera('iso')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              cameraPreset === 'iso'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Vista Isométrica"
          >
            Iso
          </button>
          <button
            onClick={() => onSelectCamera('top')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              cameraPreset === 'top'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Vista Superior"
          >
            Topo
          </button>
          <button
            onClick={() => onSelectCamera('front')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              cameraPreset === 'front'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Vista Frontal"
          >
            Frente
          </button>
          <button
            onClick={() => onSelectCamera('side')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              cameraPreset === 'side'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
            title="Vista Lateral"
          >
            Lado
          </button>
        </div>
      </div>

      {/* Bottom Floating Bar: Modos de Visualização e Reset */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2 pointer-events-none z-10">
        <div className="bg-slate-900/85 backdrop-blur-md p-1.5 rounded-xl border border-slate-700/70 shadow-lg pointer-events-auto flex items-center gap-1.5">
          {/* Alternar Grade (Mesa de Impressão) */}
          <button
            onClick={onToggleGrid}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              showGrid 
                ? 'bg-slate-800 text-brand-400 border border-brand-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title={showGrid ? 'Ocultar Mesa de Impressão' : 'Mostrar Mesa de Impressão'}
          >
            <Grid className="w-4 h-4" />
          </button>

          {/* Wireframe */}
          <button
            onClick={onToggleWireframe}
            className={`p-2 rounded-lg text-xs font-medium transition-colors ${
              wireframe 
                ? 'bg-slate-800 text-brand-400 border border-brand-500/30' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            title="Alternar Modo Wireframe (Malha Poligonal)"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Preset de Iluminação */}
          <button
            onClick={() => {
              const lights: LightingPreset[] = ['studio', 'soft', 'bright', 'dramatic'];
              const nextIndex = (lights.indexOf(lightingPreset) + 1) % lights.length;
              onSelectLighting(lights[nextIndex]);
            }}
            className="p-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            title={`Iluminação: ${lightingPreset.toUpperCase()} (Clique para alternar)`}
          >
            <SunMedium className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-slate-700 mx-0.5" />

          {/* Resetar Câmera */}
          <button
            onClick={onResetView}
            className="p-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Resetar Posição da Câmera"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </>
  );
};
