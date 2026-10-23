tsx
import React from 'react';
import {
  Phone,
  ArrowRight,
  CheckCircle2,
  FileText,
  Headphones,
  Award,
  Sparkles,
  ShieldCheck,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#071426] via-[#102746] to-[#071426] text-white">
      {/* Animated Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#E8C777_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber-400/15 blur-3xl animate-pulse" />

        <div
          className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">

          {/* Main Content */}
          <div className="animate-[fadeInUp_0.8s_ease-out_both] text-center lg:col-span-7 lg:text-left">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-wide text-amber-200 shadow-lg shadow-black/10 backdrop-blur-md transition duration-300 hover:border-amber-300/50 hover:bg-white/10">
              <Sparkles className="h-4 w-4 text-amber-300" />
              {t.hero.authorizedAgentTag}
            </div>

            <h1 className="text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {t.hero.headline}
              <span className="mt-2 block bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent">
                Financial Protection
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
              {t.hero.subheadline}
            </p>

            {/* Action Buttons */}
            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#plans"
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-amber-300 to-yellow-500 px-7 py-4 text-sm font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/30 active:translate-y-0"
              >
                {t.hero.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="tel:9923835939"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/[0.06] px-7 py-4 text-sm font-bold text-white backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-amber-300/50 hover:bg-white/10"
              >
                <Phone className="h-4 w-4 text-amber-300" />
                {t.hero.secondaryCta}
              </a>
            </div>

            {/* Service Highlights */}
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 text-left sm:grid-cols-3">
              {[
                {
                  icon: CheckCircle2,
                  title: t.hero.highlight1,
                  desc: 'Personalized needs analysis',
                },
                {
                  icon: FileText,
                  title: t.hero.highlight2,
                  desc: 'Application guidance',
                },
                {
                  icon: Headphones,
                  title: t.hero.highlight3,
                  desc: 'Direct advisor support',
                },
              ].map(({ icon: Icon, title, desc }, index) => (
                <div
                  key={title}
                  className="group flex items-start gap-3 rounded-xl p-3 transition duration-300 hover:bg-white/[0.06]"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="rounded-lg border border-amber-300/20 bg-amber-300/10 p-2 transition duration-300 group-hover:scale-110 group-hover:bg-amber-300/20">
                    <Icon className="h-4 w-4 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-white">{title}</h3>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Advisor Profile */}
          <div className="animate-[fadeInUp_1s_ease-out_0.15s_both] lg:col-span-5">
            <div className="group relative mx-auto max-w-md rounded-[2rem] border border-white/15 bg-white/[0.07] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl transition duration-500 hover:-translate-y-2 hover:border-amber-300/40 hover:shadow-amber-500/10">

              <div className="absolute -inset-px -z-10 rounded-[2rem] bg-gradient-to-br from-amber-300/20 via-transparent to-blue-400/10 opacity-70 blur-xl transition duration-500 group-hover:opacity-100" />

              <div className="rounded-[1.6rem] bg-gradient-to-br from-white to-slate-100 p-6 text-slate-900 sm:p-8">

                <div className="mb-7 flex items-center justify-between gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                    Your Insurance Advisor
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-800">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    LIC Advisor
                  </span>
                </div>

                <div className="flex items-center gap-4 border-b border-slate-200 pb-6">
                  <div className="relative flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#102746] to-[#071426] text-xl font-black text-amber-300 shadow-lg ring-4 ring-amber-100 transition duration-300 group-hover:rotate-2">
                    DYB
                    <span className="absolute -bottom-2 -right-2 rounded-full border-2 border-white bg-emerald-500 p-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-white" />
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                      Dnyaneshwar Yedu Bhoi
                    </h2>
                    <p className="mt-2 text-xs font-semibold leading-5 text-slate-600">
                      LIC Insurance Advisor
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 py-6">
                  <a
                    href="tel:9923835939"
                    className="group/contact flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition duration-300 hover:border-amber-300 hover:bg-amber-50/60"
                  >
                    <span className="rounded-lg bg-slate-100 p-2.5 transition group-hover/contact:bg-amber-100">
                      <Phone className="h-4 w-4 text-slate-700" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Primary Contact
                      </span>
                      <span className="mt-1 block text-sm font-bold tabular-nums">
                        +91 9923835939
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover/contact:translate-x-1 group-hover/contact:text-amber-600" />
                  </a>

                  <a
                    href="tel:7972131176"
                    className="group/contact flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition duration-300 hover:border-amber-300 hover:bg-amber-50/60"
                  >
                    <span className="rounded-lg bg-slate-100 p-2.5 transition group-hover/contact:bg-amber-100">
                      <Phone className="h-4 w-4 text-slate-700" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Secondary Contact
                      </span>
                      <span className="mt-1 block text-sm font-bold tabular-nums">
                        +91 7972131176
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover/contact:translate-x-1 group-hover/contact:text-amber-600" />
                  </a>

                  <a
                    href="mailto:licdybhoi@gmail.com"
                    className="group/contact flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3.5 transition duration-300 hover:border-amber-300 hover:bg-amber-50/60"
                  >
                    <span className="rounded-lg bg-slate-100 p-2.5 transition group-hover/contact:bg-amber-100">
                      <Mail className="h-4 w-4 text-slate-700" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[10px] font-medium uppercase tracking-wider text-slate-500">
                        Business Email
                      </span>
                      <span className="mt-1 block break-all text-xs font-bold sm:text-sm">
                        licdybhoi@gmail.com
                      </span>
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover/contact:translate-x-1 group-hover/contact:text-amber-600" />
                  </a>
                </div>

                <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-4">
                  <div className="mb-2 flex items-center gap-2 text-xs font-extrabold text-slate-800">
                    <Award className="h-4 w-4 text-amber-600" />
                    Personalised Guidance
                  </div>
                  <p className="text-xs leading-6 text-slate-600">
                    Understand policy features, eligibility and documentation
                    before making your insurance decision.
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#102746] px-3 py-3.5 text-xs font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#071426]"
                  >
                    Get Guidance
                    <ArrowRight className="h-4 w-4 text-amber-300" />
                  </a>

                  <a
                    href="https://wa.me/919923835939"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-3.5 text-xs font-bold text-emerald-800 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-100"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <p className="mt-5 text-center text-[11px] leading-5 text-slate-400">
              Insurance is subject to applicable policy terms and conditions.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};