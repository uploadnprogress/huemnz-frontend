import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Landing.module.css';
import backgroundImage from '../assets/landing.jpg'; // Using your specified name
import logoImage from '../assets/logo.png';

function Landing({ onEnter }) {
  const [formData, setFormData] = useState({
    email: '',
    wallet: '',
    twitter: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.wallet && /^0x[a-fA-F0-9]{40}$/.test(formData.wallet)) {
      onEnter(formData);
    } else {
      alert('A valid ETH wallet address is required to enter the eXperience.');
    }
  };

  return (
    <div className={styles.landingContainer} style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className={styles.overlay}></div>
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={logoImage} alt="Huemnz Logo" className={styles.logoPlaceholder} />
        
        <h1>An ecosystem powered by trust and tech.</h1>
        <p>
          Shouldn't your wallet do more than hold assets? Learn how your on-chain identity can protect more than your JPEGs.
        </p>

        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div className={styles.inputGrid}>
            <input type="text" name="wallet" placeholder="ETH Wallet Address (Required)" onChange={handleChange} value={formData.wallet} required />
            <input type="email" name="email" placeholder="Email Address" onChange={handleChange} value={formData.email} />
            <input type="text" name="twitter" placeholder="Twitter / X Handle" onChange={handleChange} value={formData.twitter} />
            <input type="tel" name="phone" placeholder="Phone Number (Optional)" onChange={handleChange} value={formData.phone} />
          </div>
          <button type="submit" className={styles.ctaButton}>
            Start the eXperience
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default Landing;