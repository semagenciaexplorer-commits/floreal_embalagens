import React, { useState } from 'react';
import { CategoryType } from './types/landing';
import { Header } from './components/floreal/Header';
import { Hero } from './components/floreal/Hero';
import { CategorySplitPanels } from './components/floreal/CategorySplitPanels';
import { FinishesSection } from './components/floreal/FinishesSection';
import { B2BBenefitsSection } from './components/floreal/B2BBenefitsSection';
import { OperationalCriteriaSection } from './components/floreal/OperationalCriteriaSection';
import { AboutSection } from './components/floreal/AboutSection';
import { QuoteFormSection } from './components/floreal/QuoteFormSection';
import { FAQSection } from './components/floreal/FAQSection';
import { ClosingCTASection } from './components/floreal/ClosingCTASection';
import { Footer } from './components/floreal/Footer';
import { WhatsAppFloating } from './components/floreal/WhatsAppFloating';

export const App: React.FC = () => {
  // Categoria ativa no momento (controla formulário e WhatsApp contextual)
  const [activeCategory, setActiveCategory] = useState<CategoryType>('moda-intima');
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const handleSelectCategory = (category: CategoryType) => {
    setActiveCategory(category);
  };

  const handleSelectProduct = (category: CategoryType, productName: string) => {
    setActiveCategory(category);
    setSelectedProduct(productName);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-neutral-900 selection:bg-neutral-900 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* 1. Header Minimalista com Logo Oficial */}
      <Header onSelectCategory={handleSelectCategory} />

      <main>
        {/* 2. Hero Editorial B2B (Mantido) */}
        <Hero />

        {/* 3. Segmentação de Soluções: Painéis Interativos com Troca de Fotos em Animação */}
        <CategorySplitPanels
          onSelectCategory={handleSelectCategory}
          onSelectProduct={handleSelectProduct}
        />

        {/* 4. Versatilidade Construtiva Floreal (Acabamentos com Zíper & Botão) */}
        <FinishesSection />

        {/* 5. Impacto Operacional & Logístico (Benefícios B2B) (Mantido) */}
        <B2BBenefitsSection />

        {/* 6. Critérios Operacionais do Setor (Sessão Única & Objetiva) */}
        <OperationalCriteriaSection />

        {/* 7. Indústria Nacional de Embalagens (Sobre a Floreal • Desde 1961) (Mantido) */}
        <AboutSection />

        {/* 8. Atendimento B2B Direto da Fábrica (Formulário Objetivo com os 5 campos solicitados) */}
        <QuoteFormSection
          selectedCategory={activeCategory}
          initialProduct={selectedProduct}
          onCategoryChange={handleSelectCategory}
        />

        {/* 9. Esclarecimentos Comerciais (Dúvidas Frequentes) (Mantido) */}
        <FAQSection />

        {/* 10. Floreal Embalagens • Desde 1961 (Encerramento Marcante) (Mantido) */}
        <ClosingCTASection />
      </main>

      {/* 11. Rodapé Institucional */}
      <Footer />

      {/* 12. WhatsApp Flutuante com Mensagem Contextual */}
      <WhatsAppFloating activeCategory={activeCategory} />
    </div>
  );
};

export default App;
