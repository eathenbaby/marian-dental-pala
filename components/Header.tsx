
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext.tsx';
import { useTheme } from './ThemeContext.tsx';
import { IconMap } from './Icons.tsx';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Locations', path: '/locations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4' : 'py-8'}`}>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'glass rounded-3xl' : ''}`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-medical-blue dark:bg-primary p-2.5 rounded-xl shadow-lg shadow-medical-blue/20 dark:shadow-primary/20 group-hover:rotate-12 transition-all">
              <IconMap.Plus className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl text-gray-900 dark:text-white leading-tight block transition-colors">NEW MARIAN</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-500 font-bold uppercase tracking-[0.2em] transition-colors">Dental & Implant Centre</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-bold uppercase tracking-widest transition-all hover:text-medical-blue dark:hover:text-primary relative group ${
                  location.pathname === link.path ? 'text-medical-blue dark:text-primary' : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-medical-blue dark:bg-primary transition-all group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <IconMap.Moon className="w-4 h-4" /> : <IconMap.Sun className="w-4 h-4" />}
            </button>
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
              className="px-4 py-2 border border-gray-200 dark:border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
            >
              {language === 'en' ? 'മലയാളം' : 'English'}
            </button>
            <Link
              to="/contact"
              className="bg-medical-green dark:bg-cta text-white px-7 py-3 rounded-2xl text-xs font-bold shadow-xl shadow-medical-green/20 dark:shadow-cta/20 hover:scale-105 transition-all"
            >
              {t('bookNow')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-900 dark:text-white transition-colors"
          >
            {isMenuOpen ? <IconMap.X /> : <IconMap.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white dark:bg-dark z-[100] animate-in fade-in duration-300 transition-colors">
          <div className="flex flex-col h-full p-8 pt-24 space-y-8">
            <button onClick={() => setIsMenuOpen(false)} className="absolute top-8 right-8 text-gray-900 dark:text-white transition-colors"><IconMap.X className="w-8 h-8" /></button>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-4xl font-display font-bold text-gray-900 dark:text-white py-2 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="flex flex-col gap-6 pt-12 border-t border-gray-200 dark:border-white/10">
              <button
                onClick={toggleTheme}
                className="w-full py-5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3 transition-all"
              >
                {theme === 'light' ? <IconMap.Moon className="w-5 h-5" /> : <IconMap.Sun className="w-5 h-5" />}
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </button>
              <button
                onClick={() => {
                  setLanguage(language === 'en' ? 'ml' : 'en');
                  setIsMenuOpen(false);
                }}
                className="w-full py-5 border border-gray-200 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 dark:text-white transition-all"
              >
                {language === 'en' ? 'മലയാളം -ലേക്ക് മാറുക' : 'Switch to English'}
              </button>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-medical-green dark:bg-cta text-white text-center py-6 rounded-2xl font-bold text-lg transition-all"
              >
                {t('bookNow')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
