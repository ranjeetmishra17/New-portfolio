import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'About', href: '#hero' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
  ];

  return (
    <>
      <div className="navbar-pill-wrapper">
        <nav className={`navbar-pill ${scrolled ? 'navbar-pill-scrolled' : ''}`}>
          
          {/* Avatar Profile Link (Left) */}
          <a href="#" className="nav-avatar-wrapper" onClick={() => setMobileMenuOpen(false)}>
            <img src={`${import.meta.env.BASE_URL}profile_editor.png`} alt="Ranjeet Profile" className="nav-avatar" />
            <span className="nav-logo-text">RANJEET</span>
          </a>

          {/* Right Side Group */}
          <div className="nav-right-group">
            {/* Desktop Links (Hidden on mobile via CSS) */}
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="nav-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Solid Contact Button (Always visible) */}
            <a href="#contact" className="nav-contact-btn" onClick={() => setMobileMenuOpen(false)}>
              Contact
            </a>

            {/* Hamburger Button (Only visible on mobile via CSS) */}
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-menu-container" onClick={(e) => e.stopPropagation()}>
          <ul className="mobile-menu-links">
            {navLinks.map((link) => (
              <li key={link.name} className="mobile-menu-item">
                <a 
                  href={link.href} 
                  className="mobile-menu-link" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li className="mobile-menu-item" style={{ marginTop: '16px' }}>
              <a 
                href="#contact" 
                className="nav-contact-btn" 
                style={{ display: 'inline-block', fontSize: '1.1rem', padding: '12px 32px' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Me
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
