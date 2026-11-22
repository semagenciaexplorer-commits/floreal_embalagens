import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  User,
  Mail,
  Phone,
  Package,
  FileText,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Copy,
  Check,
} from 'lucide-react';
import { FLOREAL_CONFIG, getWhatsAppUrl } from '../../config/floreal';
import { CategoryType } from '../../types/landing';
import {
  getUrlTrackingData,
  trackFormStart,
  trackGenerateLead,
  trackWhatsAppClick,
} from '../../services/analytics';

interface QuoteFormSectionProps {
  selectedCategory?: CategoryType;
  initialProduct?: string;
  onCategoryChange?: (category: CategoryType) => void;
}

export type SimplifiedQuantityBracket =
  | '1.000 a 4.999 peças'
  | '5.000 a 9.999 peças'
  | '10.000 unidades ou mais';

export const QuoteFormSection: React.FC<QuoteFormSectionProps> = ({
  selectedCategory = 'moda-intima',
  initialProduct = '',
}) => {
  // Apenas os 5 campos solicitados pelo cliente:
  const [name, setName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [projectDetails, setProjectDetails] = useState<string>('');
  const [quantity, setQuantity] = useState<SimplifiedQuantityBracket>('1.000 a 4.999 peças');

  // Estados de controle e feedback
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    whatsapp: string;
    email: string;
    projectDetails: string;
    quantity: string;
  } | null>(null);

  // Preenche detalhe do projeto caso o usuário venha de um clique nos seletores
  useEffect(() => {
    if (initialProduct && !projectDetails) {
      const catLabel = selectedCategory === 'moda-intima' ? 'Moda Íntima' : 'Linha Praia';
      setProjectDetails(`Interesse em embalagens para ${initialProduct} (${catLabel}).`);
    }
  }, [initialProduct, selectedCategory]);

  // Dispara form_start na primeira interação
  const handleFirstInteraction = () => {
    if (!hasStarted) {
      setHasStarted(true);
      trackFormStart(selectedCategory);
    }
  };

  // Máscara de WhatsApp brasileiro (DDD + 9 dígitos)
  const handlePhoneChange = (val: string) => {
    handleFirstInteraction();
    const digits = val.replace(/\D/g, '').slice(0, 11);
    let formatted = digits;
    if (digits.length > 2) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }
    if (digits.length > 7) {
      formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
    }
    setWhatsapp(formatted);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (!whatsapp.trim() || whatsapp.replace(/\D/g, '').length < 10) {
      setErrorMsg('Informe um número de WhatsApp/celular válido com DDD.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Informe um e-mail válido.');
      return;
    }
    if (!projectDetails.trim()) {
      setErrorMsg('Por favor, descreva brevemente os detalhes do seu projeto.');
      return;
    }

    setIsSubmitting(true);
    const tracking = getUrlTrackingData();

    const payload = {
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      projectDetails: projectDetails.trim(),
      quantity,
    };

    // Dispara evento de conversão no GTM / Google Ads dataLayer
    trackGenerateLead({
      category: selectedCategory,
      product: initialProduct || 'Projeto Sob Medida',
      quantity,
      finish: 'Sob Avaliação Técnica',
      company: name.trim(),
    });

    setTimeout(() => {
      setSubmittedData(payload);
      setIsSuccess(true);
      setIsSubmitting(false);
    }, 600);
  };

  const getWhatsAppDirectUrl = () => {
    if (!submittedData) return getWhatsAppUrl(selectedCategory);
    const text =
      `*Solicitação de Orçamento - Floreal Embalagens*\n\n` +
      `*Nome:* ${submittedData.name}\n` +
      `*WhatsApp:* ${submittedData.whatsapp}\n` +
      `*E-mail:* ${submittedData.email}\n` +
      `*Quantidade:* ${submittedData.quantity}\n` +
      `*Detalhes:* ${submittedData.projectDetails}\n\n` +
      `Gostaria de agilizar a proposta com a equipe comercial.`;
    return `https://wa.me/${FLOREAL_CONFIG.brand.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleCopySummary = () => {
    if (!submittedData) return;
    const text =
      `Orçamento Floreal Embalagens\n` +
      `Nome: ${submittedData.name}\n` +
      `WhatsApp: ${submittedData.whatsapp}\n` +
      `E-mail: ${submittedData.email}\n` +
      `Quantidade: ${submittedData.quantity}\n` +
      `Detalhes: ${submittedData.projectDetails}`;
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <section id="orcamento" className="relative py-16 lg:py-24 bg-white text-neutral-900 overflow-hidden border-b border-neutral-300/80">
      {/* Luz ambiente sutil */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Cabeçalho do Formulário */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-xs font-semibold tracking-wider uppercase text-neutral-700 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600" />
            <span>Atendimento B2B Direto da Fábrica</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-neutral-950 tracking-tight">
            Solicite um orçamento sob medida
          </h2>

          <p className="text-sm sm:text-base text-neutral-600 leading-relaxed max-w-xl mx-auto font-light">
            Preencha os dados abaixo para que nossa equipe técnica avalie seu projeto e apresente a proposta mais adequada para a sua confecção.
          </p>
        </div>

        {/* ========================================================
            CARD DE SUCESSO APÓS ENVIO
           ======================================================== */}
        {isSuccess && submittedData ? (
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 shadow-2xl shadow-neutral-900/10 space-y-8 animate-in fade-in duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-950">
                Solicitação registrada com sucesso!
              </h3>
              <p className="text-sm sm:text-base text-neutral-600 max-w-md mx-auto font-normal">
                Obrigado, <strong className="text-neutral-900 font-semibold">{submittedData.name}</strong>. Nossa equipe técnica e comercial entrará em contato com a melhor proposta para o seu volume.
              </p>
            </div>

            {/* Espelho dos dados enviados */}
            <div className="bg-stone-50 rounded-2xl border border-neutral-200 p-6 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-neutral-500 font-semibold">
                <span>RESUMO DA SOLICITAÇÃO</span>
                <span className="text-emerald-700">STATUS: AGUARDANDO COMERCIAL</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-neutral-800 pt-1 font-sans">
                <div>
                  <span className="text-neutral-500 block text-[11px] font-mono">NOME:</span>
                  <span className="font-semibold text-neutral-950">{submittedData.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] font-mono">WHATSAPP:</span>
                  <span className="font-semibold text-neutral-950">{submittedData.whatsapp}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] font-mono">E-MAIL:</span>
                  <span className="font-semibold text-neutral-950">{submittedData.email}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[11px] font-mono">QUANTIDADE APROXIMADA:</span>
                  <span className="font-semibold text-neutral-950">{submittedData.quantity}</span>
                </div>
                <div className="sm:col-span-2 pt-1 border-t border-neutral-200/60">
                  <span className="text-neutral-500 block text-[11px] font-mono">DETALHES DO PROJETO:</span>
                  <span className="text-neutral-900">{submittedData.projectDetails}</span>
                </div>
              </div>
            </div>

            {/* Ações de Sucesso */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={getWhatsAppDirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(selectedCategory, 'quote_success_screen')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest rounded-full shadow-lg shadow-emerald-600/25 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agilizar atendimento no WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopySummary}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 bg-stone-100 hover:bg-stone-200 text-neutral-800 font-medium text-xs uppercase tracking-wider rounded-full transition-colors border border-neutral-200"
              >
                {copiedSummary ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copiedSummary ? 'Copiado!' : 'Copiar resumo'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================
             FORMULÁRIO OBJETIVO (5 CAMPOS SOLICITADOS)
             ======================================================== */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl border border-neutral-200/90 p-7 sm:p-10 shadow-xl shadow-neutral-900/5 space-y-6"
          >
            {/* Mensagem de Erro */}
            {errorMsg && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-800 text-xs animate-in fade-in">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Campo 1: Nome */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-neutral-500" />
                <span>Nome completo / Responsável *</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  handleFirstInteraction();
                  setName(e.target.value);
                }}
                placeholder="Ex.: Carlos Souza (Confecções Primavera)"
                className="w-full px-4 py-3 bg-stone-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-sm"
              />
            </div>

            {/* Linha com WhatsApp e E-mail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Campo 2: WhatsApp / Celular com DDD */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-500" />
                  <span>WhatsApp / Celular com DDD *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 bg-stone-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-sm"
                />
              </div>

              {/* Campo 3: E-mail */}
              <div className="space-y-1.5">
                <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-500" />
                  <span>E-mail corporativo ou pessoal *</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    handleFirstInteraction();
                    setEmail(e.target.value);
                  }}
                  placeholder="contato@suaempresa.com.br"
                  className="w-full px-4 py-3 bg-stone-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-sm"
                />
              </div>
            </div>

            {/* Campo 4: Quantidade Aproximada (Exatamente as 3 opções solicitadas) */}
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold flex items-center gap-2">
                <Package className="w-3.5 h-3.5 text-neutral-500" />
                <span>Quantidade aproximada *</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(
                  [
                    '1.000 a 4.999 peças',
                    '5.000 a 9.999 peças',
                    '10.000 unidades ou mais',
                  ] as SimplifiedQuantityBracket[]
                ).map((opt) => {
                  const isSelected = quantity === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        handleFirstInteraction();
                        setQuantity(opt);
                      }}
                      className={`p-3 rounded-2xl border text-xs font-medium text-center transition-all ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white shadow-md'
                          : 'border-neutral-200 bg-stone-50 hover:bg-stone-100 text-neutral-800'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Campo 5: Detalhe do projeto */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-neutral-700 font-semibold flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-neutral-500" />
                <span>Detalhe do projeto *</span>
              </label>
              <textarea
                rows={3}
                required
                value={projectDetails}
                onChange={(e) => {
                  handleFirstInteraction();
                  setProjectDetails(e.target.value);
                }}
                placeholder="Informe quais peças deseja embalar (ex.: biquínis, cuecas, conjuntos), se prefere botão ou zíper, medidas estimadas ou qualquer requisito da sua coleção..."
                className="w-full px-4 py-3 bg-stone-50 border border-neutral-200 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition-all shadow-sm leading-relaxed"
              />
            </div>

            {/* Botão de Envio */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-neutral-950 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-widest rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-neutral-900/15 hover:shadow-xl disabled:opacity-50 focus:outline-none"
              >
                {isSubmitting ? (
                  <span>Registrando solicitação...</span>
                ) : (
                  <>
                    <span>Solicitar Orçamento B2B</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-center text-neutral-500 font-mono">
              Floreal Embalagens • Fabricação própria em São Paulo desde 1961 • Atendimento nacional
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
