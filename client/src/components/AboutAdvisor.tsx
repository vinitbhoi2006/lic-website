import React from 'react';
import { Shield, Phone, Mail, MapPin, CheckCircle, HeartHandshake, Compass } from 'lucide-react';

export const AboutAdvisor: React.FC = () => {
  return (
    <div id="about" className="py-20 bg-surface-bg border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual representation */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="w-full bg-gradient-to-br from-navy-900 to-primary rounded-3xl p-8 text-white shadow-premium relative overflow-hidden border border-navy-700">
                <div className="absolute right-0 bottom-0 translate-x-8 translate-y-8 w-48 h-48 bg-accent-gold/15 rounded-full blur-2xl" />

                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-3xl text-accent-gold mb-6 shadow-inner">
                  DYB
                </div>

                <h3 className="text-2xl font-extrabold text-white">
                  Dnyaneshwar Yedu Bhoi
                </h3>
                <p className="text-accent-gold-light text-xs font-semibold mt-1">
                  Life Insurance Advisor & Consultant
                </p>

                <div className="mt-6 pt-6 border-t border-white/15 space-y-3 text-xs text-gray-200">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>+91 9923835939 / +91 7972131176</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>licdybhoi@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent-gold shrink-0" />
                    <span>Maharashtra, India (In-person & Digital Pan-India)</span>
                  </div>
                </div>
              </div>

              {/* Advisory Badge */}
              <div className="absolute -bottom-5 -right-5 bg-white rounded-2xl p-4 shadow-premium border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-navy-800 block">
                    Client-Centric Planning
                  </span>
                  <span className="text-[11px] text-content-secondary">
                    Ethical, Need-Based Recommendations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography & Philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Professional Profile</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight leading-tight">
              Committed to Safeguarding Your Family’s Financial Milestones
            </h2>

            <p className="text-sm text-content-secondary leading-relaxed">
              I am <strong>Dnyaneshwar Yedu Bhoi</strong>, an authorized Life Insurance Advisor. My practice is built on a clear foundation: providing Indian families and business owners with transparent, fact-based insurance guidance without misleading return claims or aggressive selling tactics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-navy-800 font-bold text-xs">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Transparent Assessment</span>
                </div>
                <p className="text-[11px] text-content-secondary">
                  Calculating real living expense gaps and debt liabilities before recommending policy tenures.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-subtle space-y-1.5">
                <div className="flex items-center gap-2 text-navy-800 font-bold text-xs">
                  <CheckCircle className="w-4 h-4 text-status-success" />
                  <span>End-to-End Documentation</span>
                </div>
                <p className="text-[11px] text-content-secondary">
                  Rigorous assistance through proposal filling, medical checkups, KYC, and nominee validation.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-subtle text-xs text-content-secondary space-y-2">
              <strong className="text-navy-800 font-semibold block text-sm">
                Service Areas & Availability:
              </strong>
              <p>
                • <strong>Maharashtra:</strong> In-person consultations available across Pune, Nashik, and Mumbai metropolitan areas.
              </p>
              <p>
                • <strong>Pan-India:</strong> Video consultations and digital onboarding assistance across all Indian states and Union Territories in <strong>English, Marathi, and Hindi</strong>.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#contact"
                className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl text-xs font-semibold shadow-sm transition"
              >
                Schedule Discussion With Advisor
              </a>
              <a
                href="tel:9923835939"
                className="text-xs font-bold text-navy-800 hover:text-primary transition"
              >
                Call Directly: 9923835939
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
