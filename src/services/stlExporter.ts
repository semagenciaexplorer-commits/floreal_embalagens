import * as THREE from 'three';
import { STLExporter } from 'three-stdlib';

/**
 * Exporta uma malha ou grupo Three.js diretamente para download como arquivo .STL (ASCII ou Binário)
 */
export function exportThreeObjectToSTL(
  object: THREE.Object3D,
  filename: string = 'modelo-3d.stl',
  binary: boolean = true
) {
  const exporter = new STLExporter();
  
  // Clona o objeto para resetar rotações temporárias se necessário
  const cloned = object.clone(true);
  
  const result = binary
    ? exporter.parse(cloned, { binary: true })
    : exporter.parse(cloned, { binary: false });

  const blob = new Blob([result as any], {
    type: binary ? 'application/octet-stream' : 'text/plain',
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename.endsWith('.stl') ? filename : `${filename}.stl`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
