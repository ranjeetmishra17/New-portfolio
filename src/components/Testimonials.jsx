import React, { useState, useRef } from 'react';
import { Star } from 'lucide-react';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "Ranjeet has an incredible eye for pacing and narrative structure. He took over 2 hours of raw vlogs and turned them into a highly engaging, retention-optimized video. Our retention rates shot up by 15%!",
    name: "Sarah Jenkins",
    role: "Lifestyle Creator (2M+ Subs)",
    initials: "SJ",
    rating: 5
  },
  {
    id: 2,
    quote: "We commissioned Ranjeet for our apparel launch commercial. The sound foley layering, organic transition cuts, and moody color grade were top-tier. He is incredibly professional and responsive.",
    name: "Marcus Thorne",
    role: "Creative Director, Propel Media",
    initials: "MT",
    rating: 5
  },
  {
    id: 3,
    quote: "Ranjeet edited our street-style Reels and TikTok campaign. His cuts are snappy, typography callouts are clean, and he syncs clips to audio beats perfectly. 10M+ views across our socials!",
    name: "Elena Rostova",
    role: "Head of Marketing, Apex Athletics",
    initials: "ER",
    rating: 5
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const gridRef = useRef(null);

  const handleScroll = () => {
    if (gridRef.current) {
      const { scrollLeft, clientWidth } = gridRef.current;
      // Round to nearest page width index
      const index = Math.round(scrollLeft / clientWidth);
      if (index !== activeIndex && index >= 0 && index < TESTIMONIALS_DATA.length) {
        setActiveIndex(index);
      }
    }
  };

  const scrollToTestimonial = (idx) => {
    if (gridRef.current) {
      gridRef.current.scrollTo({
        left: idx * gridRef.current.clientWidth,
        behavior: 'smooth'
      });
      setActiveIndex(idx);
    }
  };

  return (
    <section className="section theme-dark" id="testimonials" style={{ borderBottom: '1px solid rgba(230, 235, 239, 0.08)' }}>
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div className="badge">Reviews & Feedback</div>
          <h2 className="heading-lg text-gradient" style={{ margin: 0 }}>CLIENTS FEEDBACK</h2>
          <p className="paragraph" style={{ maxWidth: '600px', margin: '0 auto', marginTop: '12px', marginBottom: 0 }}>
            Here is what digital creators, agencies, and brand directors say about my post-production cuts, sound foley, and timing.
          </p>
        </div>

        <div 
          className="testimonials-grid"
          ref={gridRef}
          onScroll={handleScroll}
        >
          {TESTIMONIALS_DATA.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div>
                {/* Stars */}
                <div className="stars-row">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>

                {/* Quote */}
                <p className="testimonial-text">
                  "{t.quote}"
                </p>
              </div>

              {/* Profile Info */}
              <div className="testimonial-client">
                <div className="client-avatar">
                  {t.initials}
                </div>
                <div className="client-info">
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators */}
        <div className="testimonials-dots">
          {TESTIMONIALS_DATA.map((_, idx) => (
            <button
              key={idx}
              className={`testimonials-dot${activeIndex === idx ? ' testimonials-dot--active' : ''}`}
              onClick={() => scrollToTestimonial(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
