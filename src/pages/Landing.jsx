import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../Landing.module.css';

function Landing({ onEnter }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // 1. Basic Empty Check
    if (!email) {
      alert('Please enter your email to continue.');
      return;
    }

    // 2. THE BOUNCER & VALIDATION (Same strict rules as inside)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address (name@domain.com).");
        return;
    }
    if (email.toLowerCase().includes('test.mail') || email.toLowerCase().includes('test.com')) {
        alert("Please enter a valid email address.");
        return;
    }

    setIsSubmitting(true);

    // 3. SEND EMAIL (Silently in background)
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('_subject', 'New Gateway Signup (Huemnz)'); // Different subject so you know they came from the entrance
        formData.append('Source', 'Gateway Page');
        formData.append('Marketing_Opt_In', 'True'); // Implicit opt-in since they are signing up to enter

        // Send to FormSubmit
        await fetch("https://formsubmit.co/ajax/info@huemn.life", {
            method: "POST",
            body: formData
        });

    } catch (error) {
        console.error("Gateway submission error:", error);
        // We proceed anyway so a server glitch doesn't lock the user out
    }

    // 4. ENTER THE SITE
    onEnter(email); // Save data in App.jsx
    navigate('/home'); // Go to Homepage
  };

  return (
    <motion.div 
      className={styles.landingContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className={styles.content}>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          An Ecosystem Powered by Trust and Tech
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Shouldn't your wallet do more than hold assets? Learn how your on-chain identity can protect more than your JPEGs.
        </motion.p>
        
        <motion.form 
          className={styles.signupForm}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <input
            type="email"
            placeholder="Enter your email to get started"
            className={styles.emailInput}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <button type="submit" className={styles.ctaButton} disabled={isSubmitting}>
            {isSubmitting ? 'Entering...' : 'Start the eXperience'}
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Landing;