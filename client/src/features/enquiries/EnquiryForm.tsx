import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle,
  AlertCircle,
  Shield,
  Phone,
  Mail,
  Clock,
  Globe,
  RotateCcw,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ProductCategory } from '../../types';
import { apiClient } from '../../api/client';

interface EnquiryFormProps {
  initialCategory?: ProductCategory;
  initialMessage?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialCategory = 'TERM_INSURANCE',
  initialMessage = '',
}) => {
  const { t } = useLanguage();

  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState<ProductCategory>(initialCategory);
  const [preferredTime, setPreferredTime] = useState('Anytime');
  const [preferredLanguage, setPreferredLanguage] = useState<'English' | 'Marathi' | 'Hindi'>('English');
  const [message, setMessage] = useState(initialMessage);
  const [consentGiven, setConsentGiven] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successReference, setSuccessReference] = useState<string | null>(null);

  useEffect(() => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Client-side validation: Indian Mobile 10-digits
    const phoneClean = mobileNumber.trim();
    if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      setError('Please enter a valid 10-digit Indian mobile number (e.g. 9820123456).');
      return;
    }

    if (!consentGiven) {
      setError('You must check the consent box to allow the advisor to contact you.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiClient.submitEnquiry({
        fullName,
        mobileNumber: phoneClean,
        email: email.trim(),
        city: city.trim(),
        category,
        preferredTime,
        preferredLanguage,
        message: message.trim(),
        consentGiven: true,
      });

      if (res.data?.referenceNumber) {
        setSuccessReference(res.data.referenceNumber);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit enquiry. Please check your inputs and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFullName('');
    setMobileNumber('');
    setEmail('');
    setCity('');
    setMessage('');
    setError(null);
    setSuccessReference(null);
  };

  return (
    <div id="contact" className="py-20 bg-surface-bg border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Consultation Request & Advisory Form</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-800 tracking-tight">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-sm text-content-secondary leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-premium border border-gray-200 overflow-hidden">
          {successReference ? (
            /* Success Confirmation Screen */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-status-success flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-navy-800">
                  {t.contact.successTitle}
                </h3>
                <p className="text-sm text-content-secondary mt-2 max-w-lg mx-auto">
                  {t.contact.successMessage}
                </p>
              </div>

              <div className="inline-block bg-surface-bg border border-gray-200 rounded-xl px-6 py-4 shadow-subtle">
                <span className="block text-xs uppercase tracking-wider text-content-secondary font-semibold">
                  {t.contact.referenceNumber}
                </span>
                <span className="text-xl sm:text-2xl font-mono font-black text-primary tracking-wide">
                  {successReference}
                </span>
              </div>

              <div className="text-xs text-gray-500 max-w-md mx-auto space-y-1">
                <p>
                  An email confirmation has been dispatched. Advisor <strong>Dnyaneshwar Yedu Bhoi</strong> will contact you via phone or WhatsApp at <strong>{mobileNumber}</strong>.
                </p>
              </div>

              <div className="pt-4 flex justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="bg-navy-800 hover:bg-navy-900 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
                >
                  {t.contact.newEnquiryBtn}
                </button>
                <a
                  href={`https://wa.me/919923835939?text=Hello%20Dnyaneshwar%20Ji,%20I%20have%20submitted%20inquiry%20${successReference}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-sm flex items-center gap-1.5"
                >
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            /* Contact Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
              {error && (
                <div className="bg-red-50 text-status-error text-xs p-3.5 rounded-xl flex items-start gap-2.5 border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.fullName} <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Deshpande"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.phone} <span className="text-status-error">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-gray-500 font-medium">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="9820123456"
                      maxLength={10}
                      className="w-full pl-12 pr-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.email} <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@gmail.com"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.city} <span className="text-status-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Pune / Mumbai / Nashik"
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.category}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProductCategory)}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    <option value="TERM_INSURANCE">Term Insurance (Pure Risk Protection)</option>
                    <option value="WHOLE_LIFE">Whole Life Insurance (Jeevan Umang)</option>
                    <option value="ENDOWMENT">Endowment Plans (Jeevan Labh)</option>
                    <option value="MONEY_BACK">Money-Back Plans (Periodic Survival Benefit)</option>
                    <option value="CHILD_FOCUSED">Child Education Plans (Amritbaal)</option>
                    <option value="RETIREMENT_PENSION">Retirement & Annuity (Saral Pension)</option>
                    <option value="ULIP">Unit-Linked Plans (ULIP)</option>
                    <option value="GROUP_INSURANCE">Group Insurance Schemes</option>
                  </select>
                </div>

                {/* Preferred Contact Time */}
                <div>
                  <label className="block text-xs font-semibold text-content-primary mb-1.5">
                    {t.contact.preferredTime}
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
                  >
                    <option value="Morning (10 AM - 1 PM)">Morning (10 AM - 1 PM)</option>
                    <option value="Afternoon (1 PM - 5 PM)">Afternoon (1 PM - 5 PM)</option>
                    <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                    <option value="Anytime">Anytime during business hours</option>
                  </select>
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  {t.contact.preferredLanguage}
                </label>
                <div className="flex gap-4">
                  {(['English', 'Marathi', 'Hindi'] as const).map((lang) => (
                    <label
                      key={lang}
                      className="flex items-center gap-1.5 text-xs text-content-secondary cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="prefLang"
                        value={lang}
                        checked={preferredLanguage === lang}
                        onChange={() => setPreferredLanguage(lang)}
                        className="accent-primary"
                      />
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-content-primary mb-1.5">
                  {t.contact.message} <span className="text-status-error">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your coverage goals, family structure, or specific LIC plan you want guidance on..."
                  className="w-full px-3.5 py-2.5 text-xs border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
              </div>

              {/* DPDP Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-content-secondary">
                  <input
                    type="checkbox"
                    checked={consentGiven}
                    onChange={(e) => setConsentGiven(e.target.checked)}
                    className="mt-0.5 accent-primary h-4 w-4 rounded"
                  />
                  <span className="leading-relaxed text-[11px]">
                    {t.contact.consentText} (Compliance with Indian Digital Personal Data Protection standards. No spam guarantee).
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary hover:bg-primary-dark text-white py-3.5 rounded-xl text-xs font-bold shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <span>{t.contact.submittingBtn}</span>
                  ) : (
                    <>
                      <span>{t.contact.submitBtn}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
