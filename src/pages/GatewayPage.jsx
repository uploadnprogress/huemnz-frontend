import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './GatewayPage.module.css';

function Landing({ onEnter }) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // VALIDATION
    if (!email) { alert('Please enter your email to continue.'); return; }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) { alert("Please enter a valid email address."); return; }
    if (email.toLowerCase().includes('test.mail') || email.toLowerCase().includes('test.com')) { alert("Please enter a valid email address."); return; }

    setIsSubmitting(true);

    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('_subject', 'New Gateway Signup (Huemnz)');
        formData.append('Source', 'Gateway Page');
        formData.append('Marketing_Opt_In', 'True'); 

        await fetch("https://formsubmit.co/ajax/info@huemn.life", {
            method: "POST",
            body: formData
        });
    } catch (error) { console.error("Gateway error:", error); }

    onEnter(email); 
    navigate('/home'); 
  };

  return (
    <motion.div 
      className={styles.landingContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className={styles.content}>
        
        {/* ADDED className={styles.title} HERE */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          An Ecosystem Powered by Trust and Tech
        </motion.h1>
        
        {/* ADDED className={styles.description} HERE */}
        <motion.p 
          className={styles.description}
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
