
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext.tsx';
import { useTheme } from './ThemeContext.tsx';
import { IconMap } from './Icons.tsx';

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
              <IconMap.Plus className="w-5 h-5" />
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
          <div className="hidden lg:flex items-center gap-4">
            {/* Location Dropdown */}
            <div className="location-dropdown">
              <button
                onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
                className="location-trigger"
              >
                <IconMap.MapPin className="w-4 h-4" />
                <span>{selectedLocation.name}</span>
                <IconMap.ChevronDown className="w-4 h-4" />
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
            <Link
              to="/contact"
              className="btn btn-green"
            >
              Book Appointment
            </Link>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-slider">
                {theme === 'light' ? (
                  <IconMap.Sun className="w-3 h-3" />
                ) : (
                  <IconMap.Moon className="w-3 h-3" />
                )}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2"
          >
            {isMenuOpen ? <IconMap.X /> : <IconMap.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Bottom Sheet */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-[100]" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
            <button 
              onClick={() => setIsMenuOpen(false)} 
              className="absolute top-6 right-6"
            >
              <IconMap.X className="w-6 h-6" />
            </button>
            
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block py-3 text-lg font-semibold ${
                    location.pathname === link.path ? 'text-medical-blue' : 'text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full bg-medical-green text-white text-center py-4 rounded-2xl font-bold block"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
