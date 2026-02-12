
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { LanguageProvider, useLanguage } from './components/LanguageContext.tsx';
import { ThemeProvider } from './components/ThemeContext.tsx';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Home } from './pages/Home.tsx';
import { Gallery } from './pages/Gallery.tsx';
import { Contact } from './pages/Contact.tsx';
import { Admin } from './pages/Admin.tsx';
import { IconMap } from './components/Icons.tsx';
import { SERVICES, LOCATIONS, DOCTORS, CLINIC_SOCIALS } from './constants.ts';

// --- Dedicated Services Page ---
const ServicesPage = () => {
  const { language } = useLanguage();
  return (
    <div className="py-32 px-4 bg-gray-50 dark:bg-dark min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-display font-bold text-gray-900 dark:text-white transition-colors">Clinical Excellence</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">Serving the Pala community with advanced diagnostic tools and painless treatment protocols.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="glass p-10 rounded-[48px] group hover:border-medical-blue/30 dark:hover:border-primary/50 transition-all duration-500">
              <div className="w-20 h-20 bg-medical-blue/10 dark:bg-primary/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-medical-blue dark:group-hover:bg-primary group-hover:text-white transition-all">
                {React.createElement(IconMap[service.icon], { className: "w-10 h-10 text-medical-blue dark:text-primary group-hover:text-white" })}
              </div>
              <h3 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4 transition-colors">{service.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm transition-colors">{service.longDesc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Dedicated About Page ---
const AboutPage = () => (
  <div className="py-32 px-4 bg-white dark:bg-dark min-h-screen transition-colors duration-300">
    <div className="max-w-7xl mx-auto space-y-32">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <span className="text-medical-blue dark:text-primary font-bold text-xs uppercase tracking-[0.3em] transition-colors">OUR MISSION</span>
          <h1 className="text-5xl md:text-8xl font-display font-bold text-gray-900 dark:text-white transition-colors">The Legacy of <br/><span className="italic font-serif text-medical-blue dark:text-primary-light">New Marian.</span></h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            Founded in 2008, New Marian Dental Clinic was established with a singular goal: to revolutionize dental healthcare in Central Kerala by combining cutting-edge technology with empathetic patient care.
          </p>
          <div className="flex gap-12 pt-8">
            <div>
              <p className="text-gray-900 dark:text-white text-5xl font-black mb-2 transition-colors">15+</p>
              <p className="text-gray-500 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Years of Trust</p>
            </div>
            <div>
              <p className="text-gray-900 dark:text-white text-5xl font-black mb-2 transition-colors">50k+</p>
              <p className="text-gray-500 dark:text-gray-500 text-[10px] font-bold uppercase tracking-widest transition-colors">Smile Makeovers</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-medical-blue/10 dark:bg-primary/10 blur-[120px] rounded-full -z-10 transition-colors" />
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop" 
            className="rounded-[60px] shadow-2xl border border-gray-200 dark:border-white/5 grayscale hover:grayscale-0 transition-all duration-700" 
            alt="Clinic Team" 
          />
        </div>
      </div>
    </div>
  </div>
);

// --- Scroll Logic ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).lenis) {
      (window as any).lenis.resize(); // Force recalculation of content height on route change
      (window as any).lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname]);
  return null;
};

const EmergencyBanner: React.FC = () => {
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="bg-red-600 text-white py-3 px-4 sticky top-0 z-[100] flex items-center justify-center gap-6 backdrop-blur-md bg-opacity-90">
      <div className="flex items-center gap-3">
        <IconMap.AlertCircle className="w-5 h-5" />
        <span className="text-xs md:text-sm font-bold uppercase tracking-[0.1em]">24/7 EMERGENCY: +91 88481 98200</span>
      </div>
      <button onClick={() => setShow(false)} className="hover:opacity-70 transition-opacity">
        <IconMap.X className="w-5 h-5" />
      </button>
    </div>
  );
};

const App: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    if (typeof Lenis !== 'undefined') {
      // @ts-ignore
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      (window as any).lenis = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
      
      // Auto-resize on content changes
      const resizeObserver = new ResizeObserver(() => {
        lenis.resize();
      });
      resizeObserver.observe(document.body);
      
      return () => {
        lenis.destroy();
        resizeObserver.disconnect();
        delete (window as any).lenis;
      };
    }
  }, []);

  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen bg-white transition-colors duration-300">
            <EmergencyBanner />
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/locations" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </main>
            <Footer />
            
            {/* Mobile Sticky Booking Bar */}
            <div className="mobile-booking-bar">
              <div className="mobile-booking-content">
                <div className="mobile-booking-info">
                  <div className="mobile-booking-title">Book Your Appointment</div>
                  <div className="mobile-booking-subtitle">Free consultation available</div>
                </div>
                <a href="/contact" className="mobile-booking-btn">
                  Book Now
                </a>
              </div>
            </div>
            
            <a href={CLINIC_SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce">
              <IconMap.MessageCircle className="w-8 h-8" />
            </a>
          </div>
          <Analytics />
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
