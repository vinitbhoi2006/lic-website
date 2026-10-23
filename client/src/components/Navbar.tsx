import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Shield,
  Phone,
  Menu,
  X,
  User,
  Globe,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { Language } from '../i18n/translations';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { user, isAdmin, isCustomer, logout } = useAuth();
  const location = useLocation();

  const handleLangChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  const navLinks = [
    { name: t.nav.home, path: '/' },
    { name: t.nav.plans, path: '/#plans' },
    { name: t.nav.calculator, path: '/#calculator' },
    { name: t.nav.about, path: '/#about' },
    { name: t.nav.services, path: '/#services' },
    { name: t.nav.claims, path: '/#claims' },
    { name: t.nav.faqs, path: '/#faqs' },
    { name: t.nav.contact, path: '/#contact' },
  ];

  return (
    <>
      {/* Top Advisory Notice Bar */}
      <div className="bg-navy-900 text-gray-200 text-xs py-2 px-4 border-b border-navy-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-gold"></span>
            <span className="font-medium text-gray-300">
              Advisor: <strong className="text-white">Dnyaneshwar Yedu Bhoi</strong> | LIC Insurance Advisory Services
            </span>
            <span className="hidden md:inline text-gray-400">
              (Independent Insurance Advisor)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:9923835939"
              className="flex items-center gap-1.5 text-accent-gold-light hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="tabular-nums font-medium">+91 9923835939 / 7972131176</span>
            </a>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 bg-navy-800 hover:bg-navy-700 text-white px-2 py-1 rounded text-xs border border-navy-600 transition"
              >
                <Globe className="w-3 h-3 text-accent-gold" />
                <span className="uppercase font-semibold">{language}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-1 w-28 bg-white text-content-primary rounded shadow-lg border border-gray-200 z-50 py-1 text-xs">
                  <button
                    onClick={() => handleLangChange('en')}
                    className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center justify-between ${
                      language === 'en' ? 'font-bold text-primary' : ''
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLangChange('mr')}
                    className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center justify-between ${
                      language === 'mr' ? 'font-bold text-primary' : ''
                    }`}
                  >
                    मराठी
                  </button>
                  <button
                    onClick={() => handleLangChange('hi')}
                    className={`w-full text-left px-3 py-1.5 hover:bg-gray-100 flex items-center justify-between ${
                      language === 'hi' ? 'font-bold text-primary' : ''
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-subtle border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-navy-800 to-primary flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                <Shield className="w-7 h-7 text-accent-gold" />
              </div>
              <div>
                <span className="block text-lg font-bold text-navy-800 tracking-tight leading-tight">
                  LIC Advisory Services
                </span>
                <span className="block text-xs font-medium text-content-secondary">
                  Dnyaneshwar Yedu Bhoi • Advisor
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium text-content-secondary">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  className="hover:text-primary transition-colors py-1"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions: Portal Login & CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2">
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="flex items-center gap-1.5 bg-navy-800 hover:bg-navy-900 text-white px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition"
                    >
                      <Lock className="w-3.5 h-3.5 text-accent-gold" />
                      {t.nav.adminPortal}
                    </Link>
                  ) : (
                    <Link
                      to="/customer"
                      className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 px-3.5 py-2 rounded-lg text-xs font-semibold transition"
                    >
                      <User className="w-3.5 h-3.5" />
                      {user.name.split(' ')[0]} ({t.nav.dashboard})
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="text-xs text-content-secondary hover:text-status-error px-2 py-1"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 text-navy-800 hover:text-primary text-xs font-semibold px-3 py-2 rounded-lg border border-gray-300 hover:border-primary transition"
                >
                  <User className="w-3.5 h-3.5" />
                  {t.nav.login}
                </button>
              )}

              <a
                href="#contact"
                className="bg-primary hover:bg-primary-dark text-white px-4 py-2.5 rounded-lg text-xs font-semibold shadow-sm transition hover:shadow-md"
              >
                {t.nav.ctaButton}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="p-2 text-content-secondary hover:text-primary"
                title="Account"
              >
                <User className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-content-secondary hover:text-primary"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-6 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md text-base font-medium text-content-primary hover:bg-surface-bg hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
              {user ? (
                <>
                  {isAdmin ? (
                    <Link
                      to="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center bg-navy-800 text-white py-2.5 rounded-lg text-sm font-semibold"
                    >
                      {t.nav.adminPortal}
                    </Link>
                  ) : (
                    <Link
                      to="/customer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full text-center bg-primary/10 text-primary py-2.5 rounded-lg text-sm font-semibold"
                    >
                      {t.nav.dashboard}
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-center text-status-error py-2 text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth();
                  }}
                  className="w-full bg-surface-muted text-navy-800 py-2.5 rounded-lg text-sm font-semibold"
                >
                  {t.nav.login}
                </button>
              )}

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-primary text-white py-2.5 rounded-lg text-sm font-semibold"
              >
                {t.nav.ctaButton}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
