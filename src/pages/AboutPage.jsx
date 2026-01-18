import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css';

function AboutPage() {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>The Genesis of Huemnz</h1>
      <div className={styles.content}>
        <div>
          <h2>A Necessary Revolution</h2>
          <p>
            Huemnz wasn't born from a desire to launch another digital collectible. It was forged from the frustrating reality of the Web3 space: a world of infinite potential built on digital quicksand. We saw brilliant builders and artists lose everything to impersonation and Sybil attacks because the industry prioritized anonymity over accountability.
          </p>
        </div>
        <div>
          <h2>Foundational Independence</h2>
          <p>
            We are here to move the industry toward true digital independence. By leveraging the <strong>Polkadot SDK</strong>, we’ve engineered a custom environment that puts the human first. We believe your digital identity should be your property—unbreakable, unstealable, and undeniable.
          </p>
        </div>
        <div>
          <h2>Built-in Security</h2>
          <p>
            The art is the key, but the code is the lock. Every line of our custom Layer 1 is designed to empower the creator and protect the collector. We established a foundational "Proof of Personhood" that gives you a cryptographic key to navigate the digital world with confidence.
          </p>
        </div>
        <div>
          <h2>The Visionary Core</h2>
          <p>
            The art, beautifully crafted by our visionary artist, is the symbol of your entry into this ecosystem. Together, the founder's technical architecture and the artist's aesthetic vision are building a more secure, more trustworthy, and more <em>human</em> digital future.
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default AboutPage;