import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaTwitter, FaDiscord, FaInstagram } from 'react-icons/fa';
import styles from './HomePage.module.css';

// Import carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// ===== ASSET IMPORTS =====
import roadmapImg from '../assets/Huemnz Project Roadmap.jpg';
import founderImg from '../assets/The Founder.jpg';
import artistImg from '../assets/The Artist.jpg';

// ===== CHARACTER SLIDES =====
import slide1 from '../assets/Huemnz Character Slide 1.jpg';
import slide2 from '../assets/Huemnz Character Slide 2.jpg';
import slide4 from '../assets/Huemnz Character Slide 4.jpg';
import slide5 from '../assets/Huemnz Character Slide 5.jpg';
import slide6 from '../assets/Huemnz Character Slide 6.jpg';
import slide8 from '../assets/Huemnz Character Slide 8.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.6, -0.05, 0.01, 0.99] }
  }
};

function HomePage() {
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const [isWinner, setIsWinner] = useState(false);
  
  // FORM STATES: 'idle', 'submitting', 'success', 'error', 'blocked'
  const [formStatus, setFormStatus] = useState('idle'); 

  // ===== SLIDE ARRAY =====
  const slideImages = [slide1, slide2, slide4, slide5, slide6, slide8];

  useEffect(() => {
    const winnerData = localStorage.getItem('huemnzWinner');
    if (winnerData) {
      const parsedWinner = JSON.parse(winnerData);
      if (userData && userData.wallet === parsedWinner.wallet) {
        setIsWinner(true);
      }
    }
  }, [userData]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    slidesToShow: 4, 
    slidesToScroll: 1,
    arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  // ===== EMAIL SUBMISSION HANDLER (FormSubmit.co) =====
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    const formData = new FormData(e.target);
    const emailValue = formData.get('Email'); 
    
    // --- 🛑 VALIDATION GATEWAY ---
    
    // 1. strict pattern check (must be name@domain.com)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
        setFormStatus('blocked'); 
        return; 
    }

    // 2. The Bouncer: Block specific fake domains
    if (emailValue && (emailValue.toLowerCase().includes('test.mail') || emailValue.toLowerCase().includes('test.com'))) {
        setFormStatus('blocked');
        return; 
    }
    // -----------------------------------------

    // EMAIL ADDRESS
    const YOUR_EMAIL = "info@huemn.life";
    const ENDPOINT = `https://formsubmit.co/ajax/${YOUR_EMAIL}`;

    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { 
            'Accept': 'application/json' 
        }
      });

      if (response.ok) {
        setFormStatus('success');
        e.target.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className={styles.container}>
      
      {/* Header handled by App.jsx */}
      
      <main>
        
        {/* WINNER BANNER */}
        {isWinner && (
          <motion.div className={styles.winnerBanner} initial={{y: -100}} animate={{y: 0}}>
            <Link to="/allowlist">
               🏆 Congratulations! Your Allowlist spot is secured. View your proof.
            </Link>
          </motion.div>
        )}

        {/* WELCOME SECTION */}
        <motion.section 
          className={styles.welcomeSection} initial="hidden" animate="visible" variants={fadeIn}
        >
          <h1>Welcome to the Ecosystem</h1>
          <p>
            Huemnz is more than a collection; it's the start of a new standard for on-chain identity and asset protection. Explore what we're building.
          </p>
        </motion.section>

        {/* MISSION SECTION */}
        <motion.section 
          className={styles.missionSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeIn}
        >
          <h2>This Hasn't Been Done Before.</h2>
          <p className={styles.introText}>
            The current state of digital ownership is broken. Your identity is fragmented, your assets are vulnerable, and your wallet is just a container. We asked a simple question: Shouldn't your on-chain presence be as secure, unified, and valuable as your real-world identity?
          </p>
          <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                  <h3>The Problem: Digital Frailty</h3>
                  <p>Impersonation, smart contract exploits, and the inability to build a lasting reputation are not features; they are bugs in the system. Current "security" is reactive, not foundational.</p>
              </div>
              <div className={styles.missionCard}>
                  <h3>The Huemnz Solution: Provable Identity</h3>
                  <p>We tie your unique assets to a non-transferable Soul-Bound Token (SBT), creating the first layer of true digital identity. This isn't just a profile picture; it's a verifiable link between you and your digital footprint.</p>
              </div>
              <div className={styles.missionCard}>
                  <h3>How It Works: KYC & SBT Synergy</h3>
                  <p>Through a secure, one-time KYC verification, we anchor your SBT to a real-world identity without storing personal data on-chain. This creates a trust layer, enabling everything from fraud-proof transactions to a portable, persistent reputation across the Web3 space.</p>
              </div>
          </div>
        </motion.section>

        {/* CAROUSEL SECTION */}
        <section className={styles.carouselSection}>
          <Slider {...carouselSettings}>
            {slideImages.map((src, index) => (
              <div key={index} className={styles.carouselSlide}>
                <img src={src} alt={`Huemnz Character Slide ${index + 1}`} className={styles.carouselImage} />
              </div>
            ))}
          </Slider>
        </section>

        {/* ROADMAP */}
        <motion.section 
          className={styles.roadmapSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
        >
          <h2>Roadmap</h2>
          <img src={roadmapImg} alt="Huemnz Project Roadmap" className={styles.roadmapImage}/>
        </motion.section>

        {/* TEAM SECTION */}
        <motion.section 
          className={styles.teamSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
        >
          <h2>Meet the Founders</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img src={artistImg} alt="The Artist"/>
              <h3>The Artist</h3>
              <p>The visionary architect behind the Huemnz aesthetic, translating complex ideas into iconic visual art.</p>
              <a href="https://oziomajesuloba.artstation.com/" target="_blank" rel="noopener noreferrer">View Portfolio</a>
            </div>
            <div className={styles.teamMember}>
              <img src={founderImg} alt="The Founder"/>
              <h3>The Founder</h3>
              <p>The technical mind building the foundational protocols that power the Huemnz ecosystem.</p>
              <a href="https://github.com/uploadnprogress" target="_blank" rel="noopener noreferrer">View GitHub</a>
            </div>
          </div>
        </motion.section>

        {/* SUBMISSION FORM (UPDATED WITH OPT-IN) */}
        <section className={styles.submissionSection}>
          <h3>Share Your Art</h3>
          <p>Want to be featured on our socials or the homepage carousel? Leave your art here.</p>
          
          <form className={styles.artForm} onSubmit={handleSubmit} encType="multipart/form-data">
            
            <input type="hidden" name="_subject" value="New Art Submission (Huemnz)" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />

            {/* Renamed inputs to match your request */}
            <input type="text" name="Alias" placeholder="Your Name or Alias" className={styles.formInput} required />
            <input type="email" name="Email" placeholder="Your Email" className={styles.formInput} required />
            <textarea name="Description" placeholder="Tell us about your art and include your social handles!" className={styles.formTextarea} required></textarea>
            
            {/* FILE UPLOAD INPUT */}
            <div style={{textAlign: 'left', width: '100%'}}>
              <label style={{color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '5px', display: 'block'}}>
                Upload Art (Select multiple files if needed)
              </label>
              <input 
                type="file" 
                name="attachment" 
                className={styles.formInput} 
                accept="image/png, image/jpeg, application/pdf"
                multiple 
                required 
                style={{paddingTop: '10px'}}
              />
            </div>

            {/* --- MARKETING OPT-IN CHECKBOX --- */}
            <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px', 
                marginTop: '15px', 
                textAlign: 'left',
                color: '#cccccc',
                fontSize: '0.9rem'
            }}>
                <input 
                    type="checkbox" 
                    name="Newsletter_Opt_In" 
                    value="Yes" 
                    id="newsletter_check" 
                    defaultChecked 
                    style={{width: '16px', height: '16px', cursor: 'pointer'}}
                />
                <label htmlFor="newsletter_check" style={{cursor: 'pointer'}}>
                    Keep me updated on future Huemnz drops and news.
                </label>
            </div>
            {/* ---------------------------------- */}

            <button type="submit" className={styles.primaryButton} disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'Uploading...' : 'Submit for Review'}
            </button>

            {/* STATUS MESSAGES */}
            {formStatus === 'success' && (
              <motion.div className={styles.successMessage} initial={{opacity:0}} animate={{opacity:1}}>
                Received! Check your email for confirmation.
              </motion.div>
            )}
            
            {formStatus === 'blocked' && (
              <div className={styles.errorMessage} style={{ color: '#ff4444' }}>
                Please provide a valid email address.
              </div>
            )}

            {formStatus === 'error' && (
              <div className={styles.errorMessage}>
                Something went wrong. Please try again.
              </div>
            )}
          </form>
        </section>
        
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>HUEMNZ</div>
          <div className={styles.footerLinks}>
            <span onClick={() => navigate('/about')}>About</span>
            <span onClick={() => navigate('/vision')}>Vision</span>
            <span onClick={() => navigate('/faq')}>FAQ</span>
            <span onClick={() => navigate('/allowlist')}>Game</span>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://x.com/theHueMnz" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://discord.gg/F8cnTTPssn" target="_blank" rel="noopener noreferrer"><FaDiscord /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
          </div>
        </div>
        <p className={styles.copyright}>© 2025 Huemnz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;