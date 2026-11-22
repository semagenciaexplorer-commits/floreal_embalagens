import {
  IntimateProductType,
  BeachwearProductType,
  QuantityBracketType,
  FinishOptionType,
  CategoryType
} from '../types/landing';

export const FLOREAL_CONFIG = {
  brand: {
    name: 'Floreal Embalagens',
    legalName: 'Floreal Embalagens Plásticas Ltda.',
    since: 1961,
    tagline: 'Fabricação própria de embalagens em PVC em São Paulo desde 1961',
    address: 'Bom Retiro, São Paulo - SP',
    coverage: 'Atendimento a marcas e indústrias em todo o Brasil',
    phone: '+55 11 3331-0000', // Comercial Floreal
    whatsappNumber: '5511999999999', // WhatsApp comercial
  },
  whatsappMessages: {
    'moda-intima':
      'Olá! Vim pela Landing Page de Moda Íntima da Floreal e gostaria de solicitar informações sobre embalagens para minha empresa.',
    'linha-praia':
      'Olá! Vim pela Landing Page de Linha Praia da Floreal e gostaria de solicitar informações sobre embalagens para minha empresa.',
    general:
      'Olá! Vim pela Landing Page da Floreal e gostaria de solicitar informações sobre embalagens para minha empresa.',
  },
  products: {
    'moda-intima': [
      'Lingerie',
      'Calcinha',
      'Sutiã',
      'Cueca',
      'Conjunto',
      'Kit',
      'Outro produto de moda íntima',
    ] as IntimateProductType[],
    'linha-praia': [
      'Biquíni',
      'Maiô',
      'Sunga',
      'Conjunto de praia',
      'Kit',
      'Outro produto de linha praia',
    ] as BeachwearProductType[],
  },
  quantities: [
    'Até 999 unidades',
    '1.000 a 2.999 unidades',
    '3.000 a 4.999 unidades',
    '5.000 a 9.999 unidades',
    '10.000 unidades ou mais',
    'Ainda não definido',
  ] as QuantityBracketType[],
  finishes: [
    'Botão',
    'Zíper',
    'Personalizado',
    'Preciso de orientação',
  ] as FinishOptionType[],
  states: [
    'SP', 'RJ', 'MG', 'RS', 'SC', 'PR', 'BA', 'CE', 'PE', 'GO',
    'ES', 'DF', 'MT', 'MS', 'AM', 'PA', 'RN', 'PB', 'AL', 'SE',
    'PI', 'MA', 'TO', 'RO', 'AC', 'AP', 'RR'
  ],
  faqs: [
    {
      question: 'A Floreal fabrica embalagens para lingerie e biquínis?',
      answer:
        'Sim. Moda íntima e linha praia estão entre os segmentos atendidos pela Floreal, com soluções dedicadas e formatos desenvolvidos para cada aplicação comercial.',
    },
    {
      question: 'É possível desenvolver embalagens com medidas personalizadas?',
      answer:
        'A Floreal avalia projetos conforme as características do produto, medidas, acabamento e quantidade, viabilizando soluções técnicas sob medida.',
    },
    {
      question: 'Posso solicitar embalagens com botão ou zíper?',
      answer:
        'Sim. São possibilidades de acabamento que podem ser avaliadas conforme a necessidade e a operação logística de cada projeto.',
    },
    {
      question: 'A Floreal atende empresas fora de São Paulo?',
      answer:
        'Sim. A empresa atende marcas e confecções em todo o Brasil. As condições de envio e frete são definidas durante a negociação comercial.',
    },
  ],
};

export function getWhatsAppUrl(category?: CategoryType | null): string {
  const message = category
    ? FLOREAL_CONFIG.whatsappMessages[category]
    : FLOREAL_CONFIG.whatsappMessages.general;
  return `https://wa.me/${FLOREAL_CONFIG.brand.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
