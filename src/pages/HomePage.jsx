import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useOutletContext } from 'react-router-dom';
import Slider from 'react-slick';
import styles from './HomePage.module.css';

// Import carousel styles
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
  const [isWinner, setIsWinner] = useState(false);
  // Create an array of public paths for the carousel
  const slideImages = Array.from({ length: 8 }, (_, i) => `/assets/slide${i + 1}.jpg`);

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
    dots: false,
    infinite: true,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 0,
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

  return (
    <div className={styles.container}>
      
      {isWinner && (
        <motion.div className={styles.winnerBanner} initial={{y: -100}} animate={{y: 0}}>
          <Link to="/allowlist">🏆 Congratulations! Your Allowlist spot is secured. View your proof.</Link>
        </motion.div>
      )}

      <motion.section 
        className={styles.welcomeSection} initial="hidden" animate="visible" variants={fadeIn}
      >
        <h1>Welcome to the Ecosystem</h1>
        <p>
          Huemnz is more than a collection; it's the start of a new standard for on-chain identity and asset protection. Explore what we're building.
        </p>
      </motion.section>

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

      <section className={styles.carouselSection}>
        <Slider {...carouselSettings}>
          {slideImages.map((src, index) => (
            <div key={index} className={styles.carouselSlide}>
              <img src={src} alt={`Huemnz Character Slide ${index + 1}`} className={styles.carouselImage} />
            </div>
          ))}
        </Slider>
      </section>
      
      <section className={styles.submissionSection}>
        <h3>Submit Your Art</h3>
        <form>
          <input type="text" placeholder="Your Name or Alias" />
          <input type="email" placeholder="Your Email" />
          <input type="url" placeholder="Link to Your Portfolio" />
          <textarea placeholder="Tell us about your art"></textarea>
          <button type="submit">Submit for Review</button>
        </form>
      </section>

      <motion.section 
        className={styles.roadmapSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
      >
        <h2>Roadmap</h2>
        <img src="/assets/roadmap.png" alt="Huemnz Project Roadmap" className={styles.roadmapImage}/>
      </motion.section>

      <motion.section 
        className={styles.teamSection} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeIn}
      >
        <h2>Meet the Founders</h2>
        <div className={styles.teamGrid}>
          <div className={styles.teamMember}>
            <img src="/assets/artist.jpg" alt="The Artist"/>
            <h3>The Artist</h3>
            <p>The visionary architect behind the Huemnz aesthetic, translating complex ideas into iconic visual art.</p>
            <a href="#" target="_blank" rel="noopener noreferrer">View Portfolio</a>
          </div>
          <div className={styles.teamMember}>
            <img src="/assets/founder.jpg" alt="The Founder"/>
            <h3>The Founder</h3>
            <p>The technical mind building the foundational protocols that power the Huemnz ecosystem.</p>
            <a href="https://github.com/uploadnprogress" target="_blank" rel="noopener noreferrer">View GitHub</a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default HomePage;