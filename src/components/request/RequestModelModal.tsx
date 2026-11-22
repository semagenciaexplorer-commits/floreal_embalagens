import React, { useState } from 'react';
import { X, Upload, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface RequestModelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RequestModelModal: React.FC<RequestModelModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [variables, setVariables] = useState('');
  const [email, setEmail] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !variables || !email) return;

    // Simulação de persistência / envio para API
    setSubmitted(true);
    setTimeout(() => {
      // Limpa formulário após sucesso
      setTitle('');
      setDescription('');
      setVariables('');
      setEmail('');
      setImageFile(null);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white">
                Solicitar Novo Modelo Paramétrico
              </h3>
              <p className="text-xs text-slate-400">
                Tem uma ideia de peça? Criamos o código OpenSCAD e publicamos no catálogo!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">Pedido Enviado com Sucesso!</h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Nossa equipe de modelagem 3D analisará os parâmetros solicitados. Você receberá um e-mail assim que o modelo estiver ativo no site.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors"
            >
              Fechar Janela
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
            {/* Título do Modelo */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200">
                Título ou Nome da Peça *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Suporte de Fone com Gancho de Mesa"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Descrição */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200">
                Descrição da Necessidade / Como pretende usar *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva a finalidade, tipo de fixação ou detalhes ergonômicos..."
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500 resize-none"
              />
            </div>

            {/* Variáveis Desejadas */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200">
                Variáveis Desejadas para Customização *
              </label>
              <input
                type="text"
                required
                value={variables}
                onChange={(e) => setVariables(e.target.value)}
                placeholder="Ex: Espessura da mesa (15-50mm), largura do fone, texto gravado"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Upload de Imagem ou Rascunho */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200">
                Fotos, Desenhos ou Rascunhos de Referência (Opcional)
              </label>
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-brand-500 rounded-2xl p-4 cursor-pointer transition-colors bg-slate-800/40">
                <Upload className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs text-slate-300 font-medium">
                  {imageFile ? imageFile.name : 'Clique ou arraste uma imagem (PNG, JPG, SVG)'}
                </span>
                <span className="text-[10px] text-slate-500 mt-0.5">
                  Máximo 10MB
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) setImageFile(e.target.files[0]);
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {/* E-mail de Contato */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-200">
                Seu E-mail para Aviso de Publicação *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu-email@exemplo.com"
                className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Botão de Envio */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all hover:scale-[1.01]"
            >
              Enviar Solicitação de Modelo
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
