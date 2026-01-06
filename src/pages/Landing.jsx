import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from '../Landing.module.css';

function Landing({ onEnter }) {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      onEnter(email); // Save data in App.jsx
      navigate('/home'); // Go to Homepage
    } else {
      alert('Please enter your email to continue.');
    }
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
          />
          <button type="submit" className={styles.ctaButton}>
            Start the eXperience
          </button>
        </motion.form>
      </div>
    </motion.div>
  );
}

export default Landing;