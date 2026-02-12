
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext.tsx';
import { IconMap } from '../components/Icons.tsx';
import { SERVICES, DOCTORS, LOCATIONS, CLINIC_IMAGES, CLINIC_SOCIALS } from '../constants.ts';
import { DoctorCard } from '../components/DoctorCard.tsx';
import { HeroCanvas } from '../components/HeroCanvas.tsx';
import { GeometryBackground } from '../components/GeometryBackground.tsx';

export const Home: React.FC = () => {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col relative">
      <GeometryBackground />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="container-wide">
          <div className="hero-split">
            <div className="hero-content">
              <div className="open-indicator">
                <div className="open-dot"></div>
                Currently Open
              </div>
              
              <h1>
                {t('heroTitle').split(' ').map((word, i) => (
                  <span key={i} className={i >= 2 && i <= 3 ? "gradient-text" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              
              <p>
                {t('heroSubtitle')}
              </p>
              
              <div className="hero-ctas">
                <Link to="/contact" className="hero-cta-primary">
                  <IconMap.Calendar className="w-5 h-5" />
                  Book Free Consultation
                </Link>
                <a href={CLINIC_SOCIALS.whatsapp} target="_blank" rel="noopener noreferrer" className="hero-cta-secondary">
                  <IconMap.MessageCircle className="w-5 h-5" />
                  WhatsApp Us
                </a>
              </div>
              
              <div className="trust-badges">
                <div className="trust-badge">
                  <IconMap.Star className="trust-badge-icon" />
                  <span className="trust-badge-text">4.9★ Google Rating</span>
                </div>
                <div className="trust-badge">
                  <IconMap.MapPin className="trust-badge-icon" />
                  <span className="trust-badge-text">2 Locations</span>
                </div>
                <div className="trust-badge">
                  <IconMap.Shield className="trust-badge-icon" />
                  <span className="trust-badge-text">Painless Treatment</span>
                </div>
                <div className="trust-badge">
                  <IconMap.Award className="trust-badge-icon" />
                  <span className="trust-badge-text">15+ Years</span>
                </div>
              </div>
            </div>
            
            <div className="hero-visual">
              <div className="hero-image-wrapper">
                <img 
                  src={CLINIC_IMAGES.hero} 
                  alt="New Marian Dental Pala Interior" 
                  className="hero-image"
                />
                <div className="hero-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-bar">
        <div className="container-wide">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number highlight">4.9★</div>
              <div className="stat-label">Google Rating</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">2</div>
              <div className="stat-label">Clinic Centres</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5k+</div>
              <div className="stat-label">Happy Patients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services">
        <div className="container-wide">
          <div className="section-header">
            <span className="badge">{t('ourServices')}</span>
            <h2 className="text-display">
              Precision Care for <span className="gradient-text">Every Smile.</span>
            </h2>
            <p>World-class dental treatments with advanced technology and compassionate care.</p>
          </div>

          <div className="services-grid">
            {SERVICES.filter(s => s.featured).map((service, index) => (
              <div key={service.id} className={`service-card ${index < 2 ? 'service-card-flagship' : ''}`}>
                {index === 0 && <div className="popular-badge">Most Popular</div>}
                <div className="service-card-icon">
                  {React.createElement(IconMap[service.icon], { className: "w-8 h-8" })}
                </div>
                <h3>{service.name}</h3>
                <p>{service.longDesc}</p>
              </div>
            ))}
          </div>
          
          <div className="services-scroll">
            <div className="services-scroll-container">
              {SERVICES.map(service => (
                <div key={service.id} className="service-pill">
                  {service.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Before/After Gallery */}
      <section className="py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 space-y-6">
            <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">{t('transformation')}</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold text-white">{t('transformation')}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{t('transformationSub')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Implants', 'RCT', 'Cosmetic', 'Whitening'].map((label, i) => (
              <div key={i} className="group relative rounded-[32px] overflow-hidden aspect-[4/5] bg-white/5 border border-white/10">
                <img 
                  src={CLINIC_IMAGES.gallery[i]} 
                  alt={label} 
                  className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">Case Study</span>
                  <h4 className="text-xl font-display font-bold text-white">{label}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <div className="section-header">
            <span className="badge">{t('meetDoctors')}</span>
            <h2 className="text-display">Expertise Meets Empathy.</h2>
            <p>Our experienced dentists combine advanced skills with compassionate care.</p>
          </div>

          <div className="space-y-16 max-w-5xl mx-auto">
            {DOCTORS.map(doc => (
              <div key={doc.id} className="doctor-card">
                <div className="doctor-card-layout">
                  <div className="doctor-photo-section">
                    <img 
                      src={doc.image} 
                      alt={doc.name}
                      className="doctor-photo"
                    />
                  </div>
                  <div className="doctor-info-section">
                    <h3 className="doctor-name">{doc.name}</h3>
                    <div className="doctor-qualifications">
                      <span className="qualification-badge">BDS</span>
                      <span className="qualification-badge">MDS</span>
                    </div>
                    <p className="doctor-bio">{doc.bio}</p>
                    <div className="doctor-contact">
                      <button className="contact-btn">
                        <IconMap.Phone className="w-5 h-5" />
                      </button>
                      <button className="contact-btn">
                        <IconMap.MessageCircle className="w-5 h-5" />
                      </button>
                      <button className="contact-btn">
                        <IconMap.Mail className="w-5 h-5" />
                      </button>
                      <button className="contact-btn">
                        <IconMap.MapPin className="w-5 h-5" />
                      </button>
                    </div>
                    <button className="doctor-cta">
                      Book with Dr. {doc.name.split(' ')[1]}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container-wide">
          <div className="testimonials-header">
            <span className="badge">Patient Stories</span>
            <h2>What Our Patients Say</h2>
            <p>Real experiences from real patients who trust us with their smiles.</p>
          </div>
          
          <div className="location-tabs">
            <button className="location-tab active">New Marian (4.9★)</button>
            <button className="location-tab">Marian (4.3★)</button>
          </div>
          
          <div className="testimonials-carousel">
            <div className="testimonials-track">
              {[
                {
                  name: "Rahul M.",
                  location: "New Marian",
                  treatment: "Dental Implants",
                  content: "The implant procedure was completely painless. Dr. Marian explained everything clearly and the results exceeded my expectations.",
                  rating: 5
                },
                {
                  name: "Priya K.",
                  location: "New Marian", 
                  treatment: "Root Canal",
                  content: "I was terrified of RCT but the team made me feel comfortable. No pain during or after the procedure. Highly recommend!",
                  rating: 5
                },
                {
                  name: "Thomas J.",
                  location: "New Marian",
                  treatment: "Teeth Whitening",
                  content: "Amazing results! My teeth are several shades brighter and the confidence boost has been incredible.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <div key={index} className={`testimonial-card ${index === 1 ? 'active' : ''}`}>
                  <div className="testimonial-header">
                    <div className="testimonial-avatar">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="testimonial-info">
                      <div className="testimonial-name">{testimonial.name}</div>
                      <div className="testimonial-location">{testimonial.location}</div>
                      <div className="testimonial-treatment">{testimonial.treatment}</div>
                      <div className="google-badge">
                        <svg className="google-badge-icon" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Verified Google Review
                      </div>
                    </div>
                  </div>
                  <div className="testimonial-content">
                    "{testimonial.content}"
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <IconMap.Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="carousel-controls">
            <button className="carousel-btn">
              <IconMap.ChevronLeft className="w-5 h-5" />
            </button>
            <div className="carousel-dots">
              <div className="carousel-dot active"></div>
              <div className="carousel-dot"></div>
              <div className="carousel-dot"></div>
            </div>
            <button className="carousel-btn">
              <IconMap.ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="locations">
        <div className="container-wide">
          <div className="testimonials-header">
            <span className="badge">Visit Us</span>
            <h2>Two Convenient Locations</h2>
            <p>State-of-the-art facilities strategically located to serve you better.</p>
          </div>
          
          <div className="locations-grid">
            {[
              {
                name: "New Marian Dental",
                rating: 4.9,
                address: "Main Road, Pala, Kerala 686001",
                phone: "+91 88481 98200",
                email: "info@newmarian.com",
                hours: "Mon-Sat: 9:00 AM - 8:00 PM",
                isOpen: true,
                landmarks: ["Near Pala Bus Stand", "Opp. St. Thomas Church"],
                mapUrl: "https://maps.google.com/maps?q=New+Marian+Dental+Pala"
              },
              {
                name: "Marian Dental Centre",
                rating: 4.3,
                address: "Town Centre, Pala, Kerala 686001", 
                phone: "+91 88481 98201",
                email: "info@marian.com",
                hours: "Mon-Sat: 10:00 AM - 7:00 PM",
                isOpen: true,
                landmarks: ["Above City Bank", "Near Market"],
                mapUrl: "https://maps.google.com/maps?q=Marian+Dental+Centre+Pala"
              }
            ].map((location, index) => (
              <div key={index} className="location-card">
                <div className="location-map">
                  <iframe 
                    src={location.mapUrl}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="location-info">
                  <h3 className="location-name">
                    <IconMap.MapPin className="w-5 h-5" />
                    {location.name}
                  </h3>
                  
                  <div className="location-rating">
                    <div className="rating-stars">
                      {[...Array(5)].map((_, i) => (
                        <IconMap.Star key={i} className={`w-4 h-4 ${i < Math.floor(location.rating) ? 'fill-current' : ''}`} />
                      ))}
                    </div>
                    <span className="rating-number">{location.rating}★</span>
                  </div>
                  
                  <div className={`location-status ${location.isOpen ? 'open' : 'closed'}`}>
                    <div className="status-dot"></div>
                    {location.isOpen ? 'Open Now' : 'Closed'}
                  </div>
                  
                  <div className="location-details">
                    <div className="location-detail">
                      <IconMap.MapPin className="location-detail-icon" />
                      <span className="location-detail-text">{location.address}</span>
                    </div>
                    <div className="location-detail">
                      <IconMap.Phone className="location-detail-icon" />
                      <span className="location-detail-text">{location.phone}</span>
                    </div>
                    <div className="location-detail">
                      <IconMap.Mail className="location-detail-icon" />
                      <span className="location-detail-text">{location.email}</span>
                    </div>
                    <div className="location-detail">
                      <IconMap.Clock className="location-detail-icon" />
                      <span className="location-detail-text">{location.hours}</span>
                    </div>
                  </div>
                  
                  <div className="location-landmarks">
                    {location.landmarks.map((landmark, i) => (
                      <span key={i} className="landmark-chip">{landmark}</span>
                    ))}
                  </div>
                  
                  <a 
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="location-cta"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
