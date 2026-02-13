
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext.tsx';
import { useTheme } from './ThemeContext.tsx';
// import { IconMap } from './Icons.tsx'; // FORCED FIX: Broken import

const IconMap = {
  Tooth: () => <span>🦷</span>,
  MapPin: () => <span>📍</span>,
  ChevronDown: () => <span>▼</span>,
  Sun: () => <span>☀️</span>,
  Moon: () => <span>🌙</span>,
  Menu: () => <span>☰</span>,
  X: () => <span>✕</span>,
};

const LOCATIONS = [
  {
    id: 'new-marian',
    name: 'New Marian',
    address: 'Main Road, Pala',
    phone: '+91 88481 98200'
  },
  {
    id: 'marian',
    name: 'Marian',
    address: 'Town Centre, Pala',
    phone: '+91 88481 98201'
  }
];

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(LOCATIONS[0]);
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
    <header className={`main-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-flex">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span>🦷</span>
            </div>
            <div>
              <div className="font-bold">NEW MARIAN</div>
              <div className="text-xs opacity-70">Dental & Implant Centre</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="nav-links hidden lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative ${
                  location.pathname === link.path ? 'active' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Actions */}
          <div className="header-actions">
            {/* Location Dropdown */}
            <div className="location-dropdown">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="location-trigger"
              >
                <IconMap.MapPin className="w-4 h-4" />
                <span>📍</span>
                <IconMap.ChevronDown className="w-4 h-4" />
                <span>▼</span>
              </button>
              <div className={`location-menu ${locationDropdownOpen ? 'show' : ''}`}>
                {LOCATIONS.map((loc) => (
                  <div
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setLocationDropdownOpen(false);
                    }}
                    className="location-option"
                  >
                    <div className="location-name">{loc.name}</div>
                    <div className="location-address">{loc.address}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Book Appointment CTA */}
            <a href="/contact" className="btn btn-green">
              Book Appointment
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-slider">
                {theme === 'light' ? (
                  <span>☀️</span>
                ) : (
                  <span>🌙</span>
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mobile-menu-btn"
          >
            <span>☰</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Bottom Sheet */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="mobile-menu-sheet"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="mobile-menu-close"
            >
              <IconMap.X className="w-6 h-6" />
            </button>
            
            <div className="mobile-menu-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-menu-link"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="mobile-menu-cta">
                <a
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="mobile-menu-cta-btn"
                >
                  Book Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
