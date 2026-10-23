import React, { useState } from 'react';
import {
  Calculator,
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { calculateInsuranceNeeds, CalculatorInputs } from './calculatorEngine';
import { formatINR, formatShortINR } from '../../lib/utils';

export const InsuranceCalculator: React.FC<{ onPrefillEnquiry?: (message: string) => void }> = ({
  onPrefillEnquiry,
}) => {
  const { t } = useLanguage();

  const defaultInputs: CalculatorInputs = {
    age: 32,
    annualIncome: 1200000, // ₹12 Lakh
    existingCover: 2500000, // ₹25 Lakh
    dependents: 2,
    outstandingLoans: 4000000, // ₹40 Lakh Home Loan
    estimatedAnnualExpenses: 600000, // ₹6 Lakh
    protectionPeriodYears: 20,
  };

  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState(() => calculateInsuranceNeeds(defaultInputs));

  const handleInputChange = (field: keyof CalculatorInputs, value: number) => {
    const updated = { ...inputs, [field]: value };
    setInputs(updated);
    setResults(calculateInsuranceNeeds(updated));
  };

  const handleReset = () => {
    setInputs(defaultInputs);
    setResults(calculateInsuranceNeeds(defaultInputs));
  };

  const handleDiscussWithAdvisor = () => {
    const note = `I used the Insurance Calculator: Age ${inputs.age}, Annual Income ${formatShortINR(
      inputs.annualIncome
    )}, Loans ${formatShortINR(inputs.outstandingLoans)}, Dependents: ${
      inputs.dependents
    }. My estimated net protection gap is ${formatShortINR(results.estimatedCoverNeeded)}.`;

    if (onPrefillEnquiry) {
      onPrefillEnquiry(note);
    }

    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="calculator" className="py-20 bg-surface-bg border-t border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Planning Tool</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            {t.calculator.title}
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            {t.calculator.subtitle}
          </p>
        </div>

        {/* Two-Column Grid: Inputs & Results */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Inputs */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl shadow-subtle border border-gray-200 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-navy-800 text-base flex items-center gap-2">
                <span>Enter Financial Profile</span>
              </h3>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-content-secondary hover:text-primary transition font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.calculator.resetBtn}</span>
              </button>
            </div>

            {/* Input: Age */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-content-primary mb-1.5">
                <label>{t.calculator.ageLabel}</label>
                <span className="tabular-nums text-primary font-bold">{inputs.age} Years</span>
              </div>
              <input
                type="range"
                min="18"
                max="65"
                step="1"
                value={inputs.age}
                onChange={(e) => handleInputChange('age', Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input: Annual Income */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-content-primary mb-1.5">
                <label>{t.calculator.annualIncomeLabel}</label>
                <span className="tabular-nums text-primary font-bold">
                  {formatINR(inputs.annualIncome)}
                </span>
              </div>
              <input
                type="range"
                min="200000"
                max="10000000"
                step="50000"
                value={inputs.annualIncome}
                onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input: Estimated Annual Expenses */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-content-primary mb-1.5">
                <label>{t.calculator.expensesLabel}</label>
                <span className="tabular-nums text-primary font-bold">
                  {formatINR(inputs.estimatedAnnualExpenses)}
                </span>
              </div>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="25000"
                value={inputs.estimatedAnnualExpenses}
                onChange={(e) => handleInputChange('estimatedAnnualExpenses', Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input: Outstanding Loans */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-content-primary mb-1.5">
                <label>{t.calculator.loansLabel}</label>
                <span className="tabular-nums text-primary font-bold">
                  {formatINR(inputs.outstandingLoans)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20000000"
                step="100000"
                value={inputs.outstandingLoans}
                onChange={(e) => handleInputChange('outstandingLoans', Number(e.target.value))}
                className="w-full accent-primary h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>

            {/* Input: Number of Dependents */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  {t.calculator.dependentsLabel}
                </label>
                <input
                  type="number"
                  min="0"
                  max="8"
                  value={inputs.dependents}
                  onChange={(e) => handleInputChange('dependents', Math.max(0, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1">
                  {t.calculator.periodLabel}
                </label>
                <input
                  type="number"
                  min="5"
                  max="40"
                  value={inputs.protectionPeriodYears}
                  onChange={(e) =>
                    handleInputChange('protectionPeriodYears', Math.max(5, Number(e.target.value)))
                  }
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            {/* Input: Existing Cover */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-content-primary mb-1.5">
                <label>{t.calculator.existingCoverLabel}</label>
                <span className="tabular-nums text-content-secondary font-bold">
                  {formatINR(inputs.existingCover)}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="20000000"
                step="100000"
                value={inputs.existingCover}
                onChange={(e) => handleInputChange('existingCover', Number(e.target.value))}
                className="w-full accent-navy-700 h-2 bg-gray-200 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Output Card & Insights */}
          <div className="lg:col-span-6 space-y-6">
            {/* Primary Result Banner */}
            <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-2xl p-6 sm:p-8 shadow-premium border border-navy-700 relative overflow-hidden">
              <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-40 h-40 bg-accent-gold/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Actuarial Protection Estimate</span>
              </div>

              <h4 className="text-sm text-gray-300">
                {t.calculator.estimatedCover}
              </h4>

              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl sm:text-5xl font-black text-accent-gold-light tabular-nums tracking-tight">
                  {formatShortINR(results.estimatedCoverNeeded)}
                </span>
                <span className="text-xs text-gray-400">
                  ({formatINR(results.estimatedCoverNeeded)})
                </span>
              </div>

              <p className="mt-4 text-xs text-gray-300 leading-relaxed">
                {results.explanation}
              </p>

              {/* Component Summary Badges */}
              <div className="mt-6 pt-5 border-t border-navy-700/80 grid grid-cols-2 gap-3 text-xs">
                <div className="bg-navy-800/80 p-2.5 rounded-lg border border-navy-700">
                  <span className="block text-gray-400 text-[11px]">Living Expense Need:</span>
                  <strong className="text-white tabular-nums font-semibold">
                    {formatShortINR(results.incomeReplacementCover)}
                  </strong>
                </div>
                <div className="bg-navy-800/80 p-2.5 rounded-lg border border-navy-700">
                  <span className="block text-gray-400 text-[11px]">Debt Liquidation:</span>
                  <strong className="text-white tabular-nums font-semibold">
                    {formatShortINR(results.liabilitiesCover)}
                  </strong>
                </div>
                <div className="bg-navy-800/80 p-2.5 rounded-lg border border-navy-700">
                  <span className="block text-gray-400 text-[11px]">Dependents Fund:</span>
                  <strong className="text-white tabular-nums font-semibold">
                    {formatShortINR(results.dependentsBuffer)}
                  </strong>
                </div>
                <div className="bg-navy-800/80 p-2.5 rounded-lg border border-navy-700">
                  <span className="block text-gray-400 text-[11px]">Existing Deducted:</span>
                  <strong className="text-accent-gold tabular-nums font-semibold">
                    - {formatShortINR(results.existingCoverDeducted)}
                  </strong>
                </div>
              </div>

              <button
                onClick={handleDiscussWithAdvisor}
                className="mt-6 w-full bg-accent-gold hover:bg-accent-gold-light text-navy-900 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Discuss This Estimate With Advisor Dnyaneshwar Bhoi</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Educational Disclaimer Card */}
            <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="font-semibold block">Educational Disclaimer</strong>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  {t.calculator.educationalNotice}
                </p>
              </div>
            </div>

            {/* Discussion Points Accordion / List */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-subtle space-y-3">
              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wide flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-primary" />
                <span>{t.calculator.discussionTitle}</span>
              </h4>
              <ul className="space-y-2 text-xs text-content-secondary">
                {results.discussionPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
