import React from 'react';
import { Shield, Phone, Mail, MapPin, ExternalLink, MessageSquare } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-navy-900 text-gray-300 pt-16 pb-8 border-t border-navy-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-navy-700">
          {/* Col 1: Advisory Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white">
                <Shield className="w-6 h-6 text-accent-gold" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">
                  LIC Advisory Services
                </h3>
                <p className="text-xs text-accent-gold-light">
                  Dnyaneshwar Yedu Bhoi
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Dedicated life insurance planning, needs analysis, documentation assistance, and ongoing claim guidance across Maharashtra and India.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://wa.me/919923835939?text=Hello%20Dnyaneshwar%20Ji,%20I%20would%20like%20guidance%20regarding%20LIC%20Life%20Insurance%20plans."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#25D366]/40 transition"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Advisor (9923835939)
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-accent-gold pl-2">
              Key Sections
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#plans" className="hover:text-white transition">Verified Insurance Plans</a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition">Insurance Needs Calculator</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition">About Advisor Dnyaneshwar Bhoi</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">Advisory & Servicing Scope</a>
              </li>
              <li>
                <a href="#claims" className="hover:text-white transition">Claim Settlement Assistance</a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-white transition">Insurance FAQs</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Resources & Verification */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-accent-gold pl-2">
              Official Insurer Portals
            </h4>
            <p className="text-xs text-gray-400 mb-3">
              Direct official verification and online policy premium payments:
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://licindia.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-accent-gold-light hover:text-white transition"
                >
                  LIC Corporate Portal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://ebiz.licindia.in/D2CPM/#Register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-accent-gold-light hover:text-white transition"
                >
                  LIC Customer Portal Login <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://licindia.in/web/guest/pay-premium-online"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-accent-gold-light hover:text-white transition"
                >
                  Official Direct Premium Payment <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 border-l-2 border-accent-gold pl-2">
              Advisor Contact Details
            </h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block text-white font-medium">+91 9923835939</span>
                  <span className="block text-gray-400">+91 7972131176</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <a href="mailto:licdybhoi@gmail.com" className="text-white hover:underline">
                  licdybhoi@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent-gold shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Maharashtra, India (Serving nationwide via video & tele-consultation)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Compliance Notice Banner */}
        <div className="mt-8 bg-navy-800/80 rounded-xl p-5 border border-navy-700 text-xs text-gray-400 space-y-2">
          <div className="flex items-center gap-2 text-accent-gold font-semibold">
            <Shield className="w-4 h-4" />
            <span>Statutory Disclaimer & DPDP Compliance Statement</span>
          </div>
          <p className="leading-relaxed">
            {t.disclaimer.nonCorporateDisclaimer}
          </p>
          <p className="leading-relaxed text-gray-500 text-[11px]">
            {t.disclaimer.noGuaranteedReturns} Insurance is the subject matter of solicitation. Policy terms, conditions, exclusions, and premium rates are subject to underwriting guidelines issued by Life Insurance Corporation of India. Inquiries submitted via this portal are strictly handled in accordance with Digital Personal Data Protection standards.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-2">
          <p>© {new Date().getFullYear()} LIC Insurance Advisory Services (Advisor: Dnyaneshwar Yedu Bhoi). All rights reserved.</p>
          <p>Designed for Professional Financial Planning & Guidance</p>
        </div>
      </div>
    </footer>
  );
};
