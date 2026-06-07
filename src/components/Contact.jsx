import React, { useState } from 'react';
import { Mail, MapPin, Video, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Commercial',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        projectType: 'Commercial',
        message: ''
      });
    }, 1500);
  };

  return (
    <section className="section theme-light" id="contact" style={{ borderBottom: 'none' }}>
      <div className="section-container">
        <div className="contact-layout">
          
          {/* Left: Contact Info */}
          <div className="contact-left">
            <div className="badge">Get in Touch</div>
            <h3 className="contact-title">
              LET'S START <br />
              <span className="contact-title-accent">THE DISCUSSION.</span>
            </h3>
            <p className="paragraph contact-desc">
              Need a polished edit or a long-term creative partner? Just send your raw footage, deadline, and the vibe you’re going for.
            </p>

            <div className="contact-info-list">
              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Mail size={18} />
                </div>
                <div className="contact-item-text">
                  <h4>Direct Email</h4>
                  <p>
                    <a href="mailto:ranjittmishra21@gmail.com" className="contact-value-link">
                      ranjittmishra21@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <MapPin size={18} />
                </div>
                <div className="contact-item-text">
                  <h4>Location</h4>
                  <p className="contact-value-text">Pune, India (Working Globally)</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon-wrapper">
                  <Video size={18} />
                </div>
                <div className="contact-item-text">
                  <h4>Availability</h4>
                  <p className="contact-value-text">Freelance / Contract based</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Modern Form Card */}
          <div className="contact-form-glass">
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group-outline" style={{ marginBottom: 0 }}>
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    placeholder="Ranjeet Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-outline"
                    required
                  />
                </div>

                <div className="form-group-outline" style={{ marginBottom: 0 }}>
                  <label htmlFor="email">Your Email</label>
                  <input 
                    type="email" 
                    id="email"
                    name="email" 
                    placeholder="ranjeet@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-outline"
                    required
                  />
                </div>
              </div>

              <div className="form-group-outline">
                <label htmlFor="projectType">Project Format</label>
                <select 
                  id="projectType"
                  name="projectType" 
                  value={formData.projectType}
                  onChange={handleChange}
                  className="input-outline"
                >
                  <option value="Commercial">Commercial / Promo Spot</option>
                  <option value="YouTube">YouTube Content</option>
                  <option value="Short Form">Short Form (Reels/TikTok)</option>
                  <option value="Motion Graphics">Motion Graphics / VFX</option>
                  <option value="Other">Other Custom Format</option>
                </select>
              </div>

              <div className="form-group-outline">
                <label htmlFor="message">Brief Description</label>
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="Raw video length, editing references, target pacing styles, and audio choices..."
                  value={formData.message}
                  onChange={handleChange}
                  className="input-outline"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn-modern btn-modern-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', justifyContent: 'center' }}
              >
                {status === 'sending' ? (
                  <>Sending message...</>
                ) : status === 'success' ? (
                  <>Message Sent!</>
                ) : (
                  <>
                    Send Project Details <Send size={15} />
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="form-success-msg">
                  Thank you! I will review your project and email you back within 24 hours.
                </p>
              )}
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
