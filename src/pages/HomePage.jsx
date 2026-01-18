import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { FaTwitter, FaDiscord } from 'react-icons/fa';
import styles from './HomePage.module.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// ASSETS
import roadmapImg from '../assets/Huemnz Project Roadmap.jpg';
import founderImg from '../assets/The Founder.jpg';
import artistImg from '../assets/The Artist.jpg';
import slide1 from '../assets/Huemnz Character Slide 1.jpg';
import slide2 from '../assets/Huemnz Character Slide 2.jpg';
import slide4 from '../assets/Huemnz Character Slide 4.jpg';
import slide5 from '../assets/Huemnz Character Slide 5.jpg';
import slide6 from '../assets/Huemnz Character Slide 6.jpg';
import slide8 from '../assets/Huemnz Character Slide 8.jpg';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

function HomePage() {
  const { userData } = useOutletContext();
  const navigate = useNavigate();
  const [isWinner, setIsWinner] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); 

  const slideImages = [slide1, slide2, slide4, slide5, slide6, slide8];

  useEffect(() => {
    const winnerData = localStorage.getItem('huemnzWinner');
    if (winnerData && userData) {
      const parsedWinner = JSON.parse(winnerData);
      if (userData.wallet === parsedWinner.wallet) setIsWinner(true);
    }
  }, [userData]);

  const carouselSettings = {
    dots: true, infinite: true, speed: 500, autoplay: true, slidesToShow: 4, slidesToScroll: 1, arrows: false,
    responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 3 } },
        { breakpoint: 600, settings: { slidesToShow: 2 } },
        { breakpoint: 480, settings: { slidesToShow: 1 } }
    ]
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');
    const formData = new FormData(e.target);
    const emailValue = formData.get('Email'); 
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue) || emailValue.includes('test.mail')) {
        setFormStatus('blocked'); return; 
    }

    try {
      await fetch("https://formsubmit.co/ajax/info@huemn.life", { method: 'POST', body: formData });
      setFormStatus('success'); e.target.reset();
    } catch (error) { setFormStatus('error'); }
  };

  return (
    <div className={styles.container}>
      <main>
        {isWinner && (
          <motion.div className={styles.winnerBanner} initial={{y: -100}} animate={{y: 0}}>
            <Link to="/allowlist">🏆 Spot Secured. View Proof.</Link>
          </motion.div>
        )}

        <motion.section className={styles.welcomeSection} initial="hidden" animate="visible" variants={fadeIn}>
          <h1 className={styles.mainTitle}>Welcome to the Ecosystem</h1>
          <p className={styles.subText}>Huemnz is more than a collection; it's the start of a new standard for on-chain identity.</p>
        </motion.section>

        <motion.section className={styles.missionSection} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className={styles.sectionTitle}>This Hasn't Been Done Before.</h2>
          <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                  <h3 className={styles.cardTitle}>Digital Frailty</h3>
                  <p className={styles.cardBody}>Impersonation and exploits are bugs, not features.</p>
              </div>
              <div className={styles.missionCard}>
                  <h3 className={styles.cardTitle}>Provable Identity</h3>
                  <p className={styles.cardBody}>We tie assets to a non-transferable SBT.</p>
              </div>
              <div className={styles.missionCard}>
                  <h3 className={styles.cardTitle}>KYC Synergy</h3>
                  <p className={styles.cardBody}>Anchoring your SBT to real-world identity securely.</p>
              </div>
          </div>
        </motion.section>

        <section className={styles.carouselSection}>
          <Slider {...carouselSettings}>
            {slideImages.map((src, index) => (
               <div key={index} className={styles.carouselSlide}><img src={src} className={styles.carouselImage} /></div>
            ))}
          </Slider>
        </section>

        <motion.section className={styles.roadmapSection} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className={styles.sectionTitle}>Roadmap</h2>
          <img src={roadmapImg} className={styles.roadmapImage}/>
        </motion.section>

        <motion.section className={styles.teamSection} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <h2 className={styles.sectionTitle}>Meet the Founders</h2>
          <div className={styles.teamGrid}>
            <div className={styles.teamMember}>
              <img src={artistImg} alt="The Artist"/>
              <h3 className={styles.memberTitle}>The Artist</h3>
              <p className={styles.memberDesc}>The visionary architect behind the aesthetic.</p>
              <div className={styles.memberSocials}>
                  <a href="https://oziomajesuloba.artstation.com/" target="_blank" rel="noopener noreferrer">Portfolio</a>
              </div>
            </div>
            <div className={styles.teamMember}>
              <img src={founderImg} alt="The Founder"/>
              <h3 className={styles.memberTitle}>The Founder</h3>
              <p className={styles.memberDesc}>The technical mind building the protocols.</p>
              <div className={styles.memberSocials}>
                  <a href="https://github.com/uploadnprogress" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://x.com/theHueMnz" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
              </div>
            </div>
          </div>
        </motion.section>

        <section className={styles.submissionSection}>
          <h3 className={styles.sectionTitle}>Share Your Art</h3>
          <form className={styles.artForm} onSubmit={handleSubmit} encType="multipart/form-data">
            <input type="hidden" name="_subject" value="New Art Submission (Huemnz)" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="text" name="Alias" placeholder="Your Name or Alias" className={styles.formInput} required />
            <input type="email" name="Email" placeholder="Your Email" className={styles.formInput} required />
            <textarea name="Description" placeholder="Tell us about your art!" className={styles.formTextarea} required></textarea>
            <input type="file" name="attachment" className={styles.formInput} accept="image/*" multiple required />
            
            <div className={styles.optIn}>
                <input type="checkbox" name="Newsletter_Opt_In" value="Yes" defaultChecked /> Keep me updated.
            </div>

            <button type="submit" className={styles.primaryButton} disabled={formStatus === 'submitting'}>
              {formStatus === 'submitting' ? 'Uploading...' : 'Submit'}
            </button>
            {formStatus === 'success' && <div className={styles.successMessage}>Received!</div>}
            {formStatus === 'blocked' && <div className={styles.errorMessage}>Invalid email.</div>}
          </form>
        </section>
      </main>

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
          </div>
        </div>
        <p className={styles.copyright}>© 2025 Huemnz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default HomePage;