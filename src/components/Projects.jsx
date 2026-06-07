import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Play, ArrowLeft, ArrowRight, X } from 'lucide-react';

const PROJECTS_DATA = [
  {
    id: 1,
    title: "Kaabil Kids Chess Growth",
    category: "E-Learning Promo",
    thumbnail: "/thumbnails/reel1.jpg",
    videoUrl: "/videos/reel1.mp4",
    metrics: "185K Views · High Retention",
    software: ["Premiere Pro", "After Effects", "Photoshop"]
  },
  {
    id: 2,
    title: "Nanak Healthy Home Living",
    category: "Clean Air Commercial",
    thumbnail: "/thumbnails/reel2.jpg",
    videoUrl: "/videos/reel2.mp4",
    metrics: "140K Views · 72K Likes",
    software: ["Premiere Pro", "CapCut Pro"]
  },
  {
    id: 3,
    title: "Clean Air, Safe Spaces",
    category: "Home Service Reel",
    thumbnail: "/thumbnails/reel3.jpg",
    videoUrl: "/videos/reel3.mp4",
    metrics: "95K Views · 48K Shares",
    software: ["DaVinci Resolve", "Premiere Pro"]
  },
  {
    id: 4,
    title: "Khamang Chiwda Sensation",
    category: "Food & Beverage Promo",
    thumbnail: "/thumbnails/reel4.jpg",
    videoUrl: "/videos/reel4.mp4",
    metrics: "250K Views · Viral Hook",
    software: ["Premiere Pro", "After Effects"]
  },
  {
    id: 5,
    title: "Canada HST Rebate Guide",
    category: "Real Estate Guide",
    thumbnail: "/thumbnails/reel5.jpg",
    videoUrl: "/videos/reel5.mp4",
    metrics: "115K Views · Finance Hook",
    software: ["Premiere Pro", "Audition"]
  }
].map(p => ({
  ...p,
  thumbnail: `${import.meta.env.BASE_URL}${p.thumbnail.startsWith('/') ? p.thumbnail.slice(1) : p.thumbnail}`,
  videoUrl: `${import.meta.env.BASE_URL}${p.videoUrl.startsWith('/') ? p.videoUrl.slice(1) : p.videoUrl}`
}));

const total = PROJECTS_DATA.length;

// Modulo that handles negatives
function mod(n, m) {
  return ((n % m) + m) % m;
}export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [modalProject, setModalProject] = useState(null);
  const [direction, setDirection] = useState(null); // 'left' | 'right'
  const videoRef = useRef(null);

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const prev = useCallback(() => {
    setDirection('left');
    setActiveIndex(i => mod(i - 1, total));
  }, []);

  const next = useCallback(() => {
    setDirection('right');
    setActiveIndex(i => mod(i + 1, total));
  }, []);

  const goTo = useCallback((idx) => {
    setDirection(idx > activeIndex ? 'right' : 'left');
    setActiveIndex(idx);
  }, [activeIndex]);

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.targetTouches[0].clientX;
    touchEndY.current = e.targetTouches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    const threshold = 50;

    if (Math.abs(diffX) > threshold && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) {
        next();
      } else {
        prev();
      }
    }
  }, [next, prev]);

  // Programmatically trigger play with catch to handle browser autoplay policies robustly
  useEffect(() => {
    if (modalProject && videoRef.current) {
      // Small timeout to ensure browser media engine has loaded the source
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Autoplay unmuted blocked. Trying muted autoplay...", err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              videoRef.current.play().catch(e => {
                console.error("Muted autoplay also blocked:", e);
              });
            }
          });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [modalProject]);

  // Compute 5 positions to render: -2 | -1 | 0 (center) | +1 | +2
  const getCardStyle = (offset) => {
    const abs = Math.abs(offset);

    if (abs === 0) {
      // Center card — full size (scaled up to stand out)
      return {
        transform: 'translateX(0) scale(var(--card-scale-0, 1.15))',
        filter: 'none',
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'auto',
      };
    } else if (abs === 1) {
      // ±1 side cards — slightly narrower, scaled down
      const sign = offset < 0 ? -1 : 1;
      return {
        transform: `translateX(calc(var(--card-shift-1, 68%) * ${sign})) scaleX(var(--card-scale-x-1, 0.85)) scaleY(var(--card-scale-y-1, 0.92))`,
        filter: 'blur(1px) brightness(0.72)',
        opacity: 0.88,
        zIndex: 5,
        pointerEvents: 'auto',
        cursor: 'pointer',
      };
    } else {
      // ±2 outer cards — more narrowed, scaled down further
      const sign = offset < 0 ? -1 : 1;
      return {
        transform: `translateX(calc(var(--card-shift-2, 128%) * ${sign})) scaleX(var(--card-scale-x-2, 0.72)) scaleY(var(--card-scale-y-2, 0.80))`,
        filter: 'blur(2px) brightness(0.55)',
        opacity: 0.65,
        zIndex: 3,
        pointerEvents: 'auto',
        cursor: 'pointer',
      };
    }
  };

  // Only render the 5 "windows": center ±2
  const visibleSlots = [-2, -1, 0, 1, 2];

  return (
    <section className="section theme-light" id="projects">
      <div className="section-container">

        {/* Header */}
        <div className="coverflow-header">
          <div>
            <div className="badge">Shortform Cuts</div>
            <h2 className="heading-lg text-gradient" style={{ margin: 0 }}>
              PROJECT WORKS
            </h2>
          </div>
        </div>

        {/* Coverflow Stage */}
        <div 
          className="coverflow-stage"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Navigation Buttons (Transparent, hidden on mobile) */}
          <button
            className="coverflow-nav-btn coverflow-nav-btn--prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous Project"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            className="coverflow-nav-btn coverflow-nav-btn--next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next Project"
          >
            <ArrowRight size={24} />
          </button>

          <div className="coverflow-track">
            {visibleSlots.map((offset) => {
              const dataIndex = mod(activeIndex + offset, total);
              const project = PROJECTS_DATA[dataIndex];
              const style = getCardStyle(offset);
              const isCenter = offset === 0;

              return (
                <div
                  key={`slot-${offset}`}
                  className={`coverflow-card${isCenter ? ' coverflow-card--active' : ''}`}
                  style={style}
                  onClick={() => {
                    if (isCenter) {
                      // Center card: open directly
                      setModalProject(project);
                    } else {
                      // Side card: just center it on first click
                      goTo(dataIndex);
                    }
                  }}
                >
                  {/* Thumbnail */}
                  <div className="coverflow-thumb">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="coverflow-thumb-img"
                    />
                    {/* Metrics badge — only on center */}
                    {isCenter && (
                      <div className="coverflow-metrics-badge">
                        {project.metrics}
                      </div>
                    )}
                    {/* Play overlay — subtle visual feedback, click bubbles to card unless play button is explicitly clicked */}
                    <div className={`coverflow-play-overlay${isCenter ? ' coverflow-play-overlay--center' : ''}`}>
                      <div 
                        className="coverflow-play-btn"
                        onClick={(e) => {
                          // Stop propagation so clicking the play button specifically opens the modal immediately
                          e.stopPropagation();
                          setModalProject(project);
                          goTo(dataIndex);
                        }}
                      >
                        <Play size={isCenter ? 28 : 20} fill="currentColor" style={{ marginLeft: '3px' }} />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="carousel-dots">
          {PROJECTS_DATA.map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${activeIndex === idx ? 'carousel-dot-active' : ''}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* Video Modal */}
      {modalProject && (
        <div className="modal-overlay" onClick={() => setModalProject(null)}>
          <div className="modal-content-frame modal-vertical" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalProject(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="modal-video-wrapper">
              <video
                ref={videoRef}
                src={modalProject.videoUrl}
                controls
                autoPlay
                playsInline
                style={{ width: '100%', height: '100%', display: 'block' }}
              />
            </div>
            {/* Title displayed ONLY when the video is playing inside the modal */}
            <div className="modal-info-panel" style={{ padding: '20px', background: '#0F1316', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <span className="modal-project-category" style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--cool-steel)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '6px' }}>
                {modalProject.category}
              </span>
              <h3 className="modal-project-title" style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--platinum)', margin: '0', lineHeight: '1.3' }}>
                {modalProject.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
