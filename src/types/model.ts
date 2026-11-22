export type ParameterType = 'number' | 'string' | 'font' | 'color' | 'boolean' | 'select';

export interface ParameterDefinition {
  id: string;
  name: string;
  description?: string;
  type: ParameterType;
  default: any;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: string[];
}

export interface SectionDefinition {
  id: string;
  title: string;
  description?: string;
  parameters: ParameterDefinition[];
}

export interface ModelSchema {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  thumbnail: string;
  sections: SectionDefinition[];
  generateScad: (params: Record<string, any>) => string;
  calculateDimensions: (params: Record<string, any>) => { width: number; height: number; depth: number };
}

export type ParametersState = Record<string, any>;

export interface ModelRequest {
  id: string;
  title: string;
  description: string;
  variables: string;
  userEmail: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}
