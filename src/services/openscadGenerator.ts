import { ModelSchema } from '../types/model';

/**
 * Gera o arquivo de código fonte OpenSCAD (.scad) a partir do modelo e seus parâmetros
 */
export function generateOpenScadScript(model: ModelSchema, params: Record<string, any>): string {
  return model.generateScad(params);
}

/**
 * Dispara o download do arquivo .scad para o computador do usuário
 */
export function downloadOpenScadFile(model: ModelSchema, params: Record<string, any>) {
  const code = generateOpenScadScript(model, params);
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${model.id}-customizado.scad`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
