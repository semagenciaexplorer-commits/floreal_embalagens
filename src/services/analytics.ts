import { CategoryType, TrackingData } from '../types/landing';

declare global {
  interface Window {
    dataLayer?: Array<Record<string, any>>;
  }
}

/**
 * Extrai parâmetros UTM e GCLID da URL atual
 */
export function getUrlTrackingData(): TrackingData {
  if (typeof window === 'undefined') {
    return {
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_term: '',
      utm_content: '',
      gclid: '',
    };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || '',
    utm_medium: params.get('utm_medium') || '',
    utm_campaign: params.get('utm_campaign') || '',
    utm_term: params.get('utm_term') || '',
    utm_content: params.get('utm_content') || '',
    gclid: params.get('gclid') || '',
  };
}

/**
 * Envia evento padronizado para o dataLayer (compatível com GTM / GA4 / Google Ads)
 */
export function pushToDataLayer(event: string, payload: Record<string, any> = {}): void {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  const eventData = {
    event,
    timestamp: new Date().toISOString(),
    landing_page: 'moda-intima-linha-praia',
    ...payload,
  };

  window.dataLayer.push(eventData);

  // Log informativo para validação de testes e auditoria
  console.info(`[Floreal Analytics] Evento disparado: "${event}"`, eventData);
}

/**
 * Evento: início de preenchimento do formulário
 */
export function trackFormStart(category: CategoryType): void {
  pushToDataLayer('form_start', {
    form_name: 'orcamento_embalagens_pvc',
    category,
  });
}

/**
 * Evento: seleção / alternância de categoria
 */
export function trackCategorySelect(category: CategoryType, origin: string): void {
  pushToDataLayer('category_select', {
    category,
    origin,
  });
}

/**
 * Evento: clique no botão de WhatsApp
 */
export function trackWhatsAppClick(category?: CategoryType | null, placement: string = 'floating'): void {
  pushToDataLayer('whatsapp_click', {
    category: category || 'geral',
    placement,
  });
}

/**
 * Evento: geração de Lead confirmada
 * ATENÇÃO: Disparado exclusivamente após envio e validação bem-sucedida do formulário
 */
export function trackGenerateLead(leadData: {
  category: CategoryType;
  product: string;
  quantity: string;
  finish: string;
  company: string;
}): void {
  pushToDataLayer('generate_lead', {
    currency: 'BRL',
    value: 1.0, // Conversão de lead qualificado B2B
    lead_category: leadData.category,
    lead_product: leadData.product,
    lead_quantity: leadData.quantity,
    lead_finish: leadData.finish,
    lead_company: leadData.company,
  });
}

