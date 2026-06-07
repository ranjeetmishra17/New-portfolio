import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="app-wrapper">
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-top-right"></div>
      <div className="ambient-glow glow-bottom-left"></div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main style={{ flex: '1 0 auto' }}>
        <Hero />
        <Projects />
        <Testimonials />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-logo">RANJEET</span>

          <span className="footer-copy">&copy; {currentYear} Ranjeet Mishra. All rights reserved.</span>

          <nav className="footer-nav">
            <a href="#hero" className="footer-nav-link">About</a>
            <a href="#projects" className="footer-nav-link">Projects</a>
            <a href="#testimonials" className="footer-nav-link">Testimonials</a>
            <a href="#contact" className="footer-nav-link">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
