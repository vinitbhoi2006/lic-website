import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Phone, AlertTriangle } from 'lucide-react';

export const ClaimAssistance: React.FC = () => {
  return (
    <div id="claims" className="py-20 bg-surface-bg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-semibold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dedicated Beneficiary Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            Claim Settlement Assistance
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            When it matters most, our advisory office guides policyholders and grieving families through every document requirement and branch submission.
          </p>
        </div>

        {/* Claim Types Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Maturity & Survival Claims */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Policy Maturity / Survival Benefits
                </span>
                <span className="text-xs text-content-secondary font-medium">Standard Payout</span>
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">
                Maturity & Periodic Survival Payouts
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed mb-4">
                Assistance with pre-maturity intimation discharge forms, NEFT bank registration, and bonus calculations.
              </p>

              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wide mb-2.5">
                Standard Documentation Required:
              </h4>
              <ul className="space-y-2 text-xs text-content-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Original LIC Policy Document</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Discharge Form (Form No. 3825) signed across revenue stamp</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>NEFT Mandate Form with original cancelled cheque</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Self-attested PAN and Aadhaar copy</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100">
              <a
                href="#contact"
                className="w-full bg-surface-muted hover:bg-gray-200 text-navy-800 text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <span>Request Maturity Guidance</span>
              </a>
            </div>
          </div>

          {/* Card 2: Death Claims */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-status-error bg-red-50 px-3 py-1 rounded-full">
                  Bereavement / Death Claim
                </span>
                <span className="text-xs text-content-secondary font-medium">Nominee Support</span>
              </div>
              <h3 className="text-lg font-bold text-navy-800 mb-2">
                Compassionate Death Claim Assistance
              </h3>
              <p className="text-xs text-content-secondary leading-relaxed mb-4">
                Immediate guidance to nominees on assembling legal death certificates, attending doctor statements, and submission to the servicing branch.
              </p>

              <h4 className="text-xs font-bold text-navy-800 uppercase tracking-wide mb-2.5">
                Key Document Checklist:
              </h4>
              <ul className="space-y-2 text-xs text-content-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Original Policy Bond & Death Certificate issued by Municipal Authority</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Claimant’s Statement (Form 3783)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Nominee’s KYC (Aadhaar, PAN) and NEFT Bank Details</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-status-success shrink-0 mt-0.5" />
                  <span>Medical Attendant Certificate / Hospital Records (where applicable)</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
              <a
                href="tel:9923835939"
                className="w-full bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold py-2.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-accent-gold" />
                <span>Call Advisor For Urgent Claim Guidance</span>
              </a>
            </div>
          </div>
        </div>

        {/* Claim Authority Disclaimer */}
        <div className="mt-8 bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Statutory Disclosure:</strong> As an authorized insurance advisor, Dnyaneshwar Yedu Bhoi facilitates proper documentation, verified intimation, and branch follow-up. Approval, settlement, repudiation, or investigation of all claims is executed solely by the competent authority of Life Insurance Corporation of India (LIC) according to policy terms and Section 45 of the Insurance Act.
          </p>
        </div>
      </div>
    </div>
  );
};
