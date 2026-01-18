import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './GatewayPage.module.css';

function GatewayPage({ onEnter }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    localStorage.setItem('userEmail', email); // Save email for persistence

    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('_subject', 'New Gateway Signup (Huemnz)');
        await fetch("https://formsubmit.co/ajax/info@huemn.life", {
            method: "POST",
            body: formData
        });
    } catch (error) {
        console.error("Gateway error:", error);
    }

    onEnter(email); 
    navigate('/home'); 
  };

  return (
    <motion.div className={styles.landingContainer} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className={styles.content}>
        <motion.h1 className={styles.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          An Ecosystem Powered by Trust and Tech
        </motion.h1>
        <motion.p className={styles.description} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Shouldn't your wallet do more than hold assets? Learn how your on-chain identity can protect more than your JPEGs.
        </motion.p>
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email to get started"
            className={styles.emailInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
            {isSubmitting ? 'Entering...' : 'Start the eXperience'}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default GatewayPage;