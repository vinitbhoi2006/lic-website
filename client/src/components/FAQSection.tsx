import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';

const faqsData = [
  {
    q: 'What is life insurance?',
    a: 'Life insurance is a legally binding contract between a policyholder and Life Insurance Corporation of India (LIC). In exchange for regular or single premium payments, the insurer guarantees to pay a predetermined sum assured to designated nominees upon the policyholder’s unfortunate demise, or a maturity corpus if the policyholder survives the term.',
  },
  {
    q: 'How can I choose an appropriate policy?',
    a: 'Choosing a policy depends on your primary life objective: if you require high financial risk protection at economical rates, Pure Term Insurance is ideal. If you want disciplined savings with guaranteed returns, Endowment or Money-Back plans suit you. For child milestone education, dedicated plans like LIC Amritbaal offer yearly guaranteed additions.',
  },
  {
    q: 'What documents may be required to purchase a policy?',
    a: 'Standard documents under IRDAI guidelines include: 1) Identity Proof (Aadhaar Card, Passport, or Voter ID), 2) Address Proof, 3) Age Proof (Birth Certificate, School Leaving Certificate, or PAN), 4) Income Proof for high sum assured (ITR / Form 16 / Salary Slips for 3 months), and 5) Recent passport-sized photographs.',
  },
  {
    q: 'How are premiums paid?',
    a: 'Premiums can be paid directly through official LIC online payment gateways via Net Banking, UPI, Credit/Debit cards, or by registering a NACH / e-mandate for automated deduction. Premiums can also be deposited in cash or cheque at any authorized LIC branch cash counter across India.',
  },
  {
    q: 'How can I check my policy status?',
    a: 'You can check your active policy status, accrued bonuses, and loan eligibility anytime via the official LIC Customer Portal (ebiz.licindia.in), through the official LIC WhatsApp service, or by contacting Advisor Dnyaneshwar Yedu Bhoi with your policy number.',
  },
  {
    q: 'How do I update my nominee on an existing policy?',
    a: 'Under Section 39 of the Insurance Act, a policyholder can change or update a nominee anytime during the policy term by submitting Form No. 3750 along with the original policy bond and nominee identification to the home servicing branch. Our office assists clients in preparing and validating this form.',
  },
  {
    q: 'How can I start a claim process?',
    a: 'For a maturity claim, discharge Form 3825 is sent by the servicing branch prior to maturity; submit it along with original policy bond and NEFT mandate. For a death claim, the nominee must immediately notify the branch or advisor with Form 3783, original death certificate, and policy document. Our office provides step-by-step handholding.',
  },
  {
    q: 'How can I contact Advisor Dnyaneshwar Yedu Bhoi?',
    a: 'You can reach out directly via phone or WhatsApp at +91 9923835939 or +91 7972131176, email at licdybhoi@gmail.com, or submit an inquiry using the contact form on this portal. Both in-person meetings across Maharashtra and virtual video consultations are available.',
  },
];

export const FAQSection: React.FC = () => {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = faqsData.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div id="faqs" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            Clear Answers to Common Questions
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            Get factual answers on policy choices, documentation requirements, and servicing procedures.
          </p>

          {/* Search Box */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search questions or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-subtle"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-surface-bg hover:bg-gray-100/70 transition"
                >
                  <span className="font-bold text-navy-800 text-xs sm:text-sm pr-4">
                    {faq.q}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 py-4 bg-white border-t border-gray-100 text-xs text-content-secondary leading-relaxed animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-xs text-content-secondary">
              No matching questions found. You can ask Advisor Dnyaneshwar Bhoi directly via the contact form below.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
