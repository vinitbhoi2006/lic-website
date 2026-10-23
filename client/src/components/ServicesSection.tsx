import React from 'react';
import {
  BookOpen,
  PieChart,
  CreditCard,
  FileCheck,
  LifeBuoy,
  UserCheck,
  FileSpreadsheet,
  Bell,
  AlertCircle,
} from 'lucide-react';

const services = [
  {
    icon: BookOpen,
    title: 'Insurance Plan Education',
    desc: 'Unbiased explanations of Term, Endowment, Money Back, ULIP, and Pension structures so you choose with complete clarity.',
  },
  {
    icon: PieChart,
    title: 'Needs Assessment',
    desc: 'Actuarial evaluation of your family liabilities, ongoing home loans, and dependents education requirements.',
  },
  {
    icon: CreditCard,
    title: 'Premium Payment Guidance',
    desc: 'Assistance setting up official LIC direct NACH / e-mandates and verifying online receipts through official channels.',
  },
  {
    icon: FileCheck,
    title: 'Policy Documentation Assistance',
    desc: 'Step-by-step guidance on proposal form completion, medical underwriting scheduling, and KYC document verification.',
  },
  {
    icon: LifeBuoy,
    title: 'Policy Servicing Guidance',
    desc: 'Guidance on address changes, policy revival for lapsed policies, policy loan applications, and status inquiries.',
  },
  {
    icon: UserCheck,
    title: 'Nominee Update Guidance',
    desc: 'Assisting policyholders in updating or changing nominees legally under Section 39 of the Insurance Act.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Claim Process Assistance',
    desc: 'Handholding grieving families through maturity or death claim document compilation and branch submission.',
  },
  {
    icon: Bell,
    title: 'Renewal Reminders',
    desc: 'Timely reminders before your premium grace period expires, dispatched only with your explicit consent.',
  },
];

export const ServicesSection: React.FC = () => {
  return (
    <div id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>Advisory & Servicing Scope</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            Comprehensive Life Insurance Services
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            From initial plan selection to lifelong policy servicing and claim coordination, Advisor Dnyaneshwar Yedu Bhoi provides dedicated assistance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => {
            const Icon = svc.icon;
            return (
              <div
                key={idx}
                className="bg-surface-bg p-6 rounded-2xl border border-gray-200 hover:border-primary/40 hover:shadow-subtle transition flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-800 text-sm mb-2">
                    {svc.title}
                  </h3>
                  <p className="text-xs text-content-secondary leading-relaxed">
                    {svc.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Compliance Notice */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-5 border border-gray-200 text-xs text-content-secondary flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Important Servicing Clarification:</strong> While Advisor Dnyaneshwar Yedu Bhoi provides full documentation, coordination, and guidance, all policy issuance, policy revival, loan approvals, and claim settlements remain subject to the official underwriting procedures and contractual terms of Life Insurance Corporation of India (LIC).
          </p>
        </div>
      </div>
    </div>
  );
};
