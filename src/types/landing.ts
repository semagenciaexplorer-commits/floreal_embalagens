export type CategoryType = 'moda-intima' | 'linha-praia';

export type IntimateProductType =
  | 'Lingerie'
  | 'Calcinha'
  | 'Sutiã'
  | 'Cueca'
  | 'Conjunto'
  | 'Kit'
  | 'Outro produto de moda íntima';

export type BeachwearProductType =
  | 'Biquíni'
  | 'Maiô'
  | 'Sunga'
  | 'Conjunto de praia'
  | 'Kit'
  | 'Outro produto de linha praia';

export type QuantityBracketType =
  | 'Até 999 unidades'
  | '1.000 a 2.999 unidades'
  | '3.000 a 4.999 unidades'
  | '5.000 a 9.999 unidades'
  | '10.000 unidades ou mais'
  | 'Ainda não definido';

export type FinishOptionType =
  | 'Botão'
  | 'Zíper'
  | 'Personalizado'
  | 'Preciso de orientação';

export interface LeadFormData {
  category: CategoryType;
  product: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  city: string;
  state: string;
  quantity: QuantityBracketType;
  finish: FinishOptionType;
  projectDetails: string;
  lgpdConsent: boolean;
  // Tracking & UTMs
  source: string;
  landing_page: string;
  categoria_interesse: string;
  produto_interesse: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
}

export interface TrackingData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
}
