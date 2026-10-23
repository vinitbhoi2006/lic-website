import React, { useState } from 'react';
import { Hero } from '../components/Hero';
import { ProductCatalog } from '../features/products/ProductCatalog';
import { InsuranceCalculator } from '../features/calculator/InsuranceCalculator';
import { AboutAdvisor } from '../components/AboutAdvisor';
import { ServicesSection } from '../components/ServicesSection';
import { ClaimAssistance } from '../components/ClaimAssistance';
import { FAQSection } from '../components/FAQSection';
import { EnquiryForm } from '../features/enquiries/EnquiryForm';
import { ProductCategory } from '../types';

export const HomePage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('TERM_INSURANCE');
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');

  const handleRequestGuidance = (cat: ProductCategory, planTitle: string) => {
    setSelectedCategory(cat);
    setPrefilledMessage(
      `Hello Advisor Dnyaneshwar Bhoi, I am interested in learning more about ${planTitle}. Please guide me on eligibility, features, and required documents.`
    );
    const formEl = document.getElementById('contact');
    if (formEl) {
      formEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCalculatorPrefill = (calculatorSummary: string) => {
    setPrefilledMessage(calculatorSummary);
  };

  return (
    <div>
      <Hero />
      <ProductCatalog onRequestGuidance={handleRequestGuidance} />
      <InsuranceCalculator onPrefillEnquiry={handleCalculatorPrefill} />
      <AboutAdvisor />
      <ServicesSection />
      <ClaimAssistance />
      <FAQSection />
      <EnquiryForm initialCategory={selectedCategory} initialMessage={prefilledMessage} />
    </div>
  );
};
