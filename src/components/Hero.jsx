import React, { useState, useRef, useEffect } from 'react';
import { Play, X } from 'lucide-react';

export default function Hero() {
  const [showreelOpen, setShowreelOpen] = useState(false);
  const showreelUrl = "https://assets.mixkit.co/videos/preview/mixkit-girl-running-on-treadmill-in-a-dark-gym-41712-large.mp4";
  const videoRef = useRef(null);

  // Programmatically trigger play with catch to handle browser autoplay policies robustly
  useEffect(() => {
    if (showreelOpen && videoRef.current) {
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Hero showreel autoplay unmuted blocked, trying muted play...", err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(e => {
                console.error("Hero showreel muted autoplay also blocked:", e);
              });
            }
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showreelOpen]);

  return (
    <section className="section theme-dark" id="hero" style={{ borderBottom: '1px solid rgba(230, 235, 239, 0.08)' }}>
      <div className="section-container hero-container">
        <div className="hero-grid-split">

          {/* Column 1: Left Text (Left-aligned) */}
          <div className="hero-left-col">
            <span className="hero-name-label">
              Ranjeet Mishra
            </span>
            <h1 className="hero-huge-text">
              STORYTELLER
            </h1>
          </div>

          {/* Column 2: Center Portrait */}
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="hero-portrait-frame" onClick={() => setShowreelOpen(true)}>
              <img
                src={`${import.meta.env.BASE_URL}profile_editor.png`}
                alt="Ranjeet - Video Editor Portrait"
                className="hero-portrait-img"
              />

              {/* Large Play Button Overlay */}
              <div className="hero-play-overlay">
                <Play size={36} fill="#0A0D0F" stroke="none" style={{ marginLeft: '4px' }} />
              </div>
            </div>

            {/* Social Links Row */}
            <div className="hero-socials-row">
              <a href="https://www.instagram.com/ranjeeetstories?igsh=MTQ3N3l4em0yMXJmZA==" target="_blank" rel="noopener noreferrer" className="hero-social-link">Insta</a>
              <span className="hero-social-divider">•</span>
              <a href="https://www.linkedin.com/in/ranjeetmishra1720?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="hero-social-link">LinkedIn</a>
              {/* <span className="hero-social-divider">•</span>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hero-social-link">Twitter</a> */}
            </div>
          </div>

          {/* Column 3: Right Text (Left-aligned) */}
          <div className="hero-right-col">
            <h1 className="hero-huge-text">
              VIDEO EDITOR
            </h1>
            <p className="hero-desc-paragraph">
              I edit high retention shortform vertical content that scales brand engagement.
            </p>
          </div>

        </div>
      </div>

      {/* Showreel Video Modal */}
      {showreelOpen && (
        <div className="modal-overlay" onClick={() => setShowreelOpen(false)}>
          <div className="modal-content-frame" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowreelOpen(false)} aria-label="Close showreel">
              <X size={18} />
            </button>
            <div className="modal-video-wrapper">
              <video
                ref={videoRef}
                src={showreelUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
