import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './GatewayPage.module.css';

function GatewayPage({ onEnter }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Animation variants for screen-filling effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('email', email);
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
    <motion.div 
      className={styles.landingContainer}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.content}>
        <motion.h1 className={styles.title} variants={itemVariants}>
          An Ecosystem Powered by Trust and Tech
        </motion.h1>
        
        <motion.p className={styles.description} variants={itemVariants}>
          Shouldn't your wallet do more than hold assets? Learn how your on-chain identity can protect more than your JPEGs.
        </motion.p>
        
        <motion.form 
          className={styles.signupForm} 
          onSubmit={handleSubmit}
          variants={itemVariants}
        >
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
        </motion.form>
      </div>
    </motion.div>
  );
}

export default GatewayPage;