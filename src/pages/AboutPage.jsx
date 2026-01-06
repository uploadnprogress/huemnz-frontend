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
        <h2>A Necessary Disruption</h2>
        <p>
          Huemnz wasn't born from a desire to launch another digital collectible. It was forged from the frustrating reality of the Web3 space: a world of infinite potential built on a foundation of digital quicksand.
        </p>
        <p>
          As the founder, I watched brilliant artists lose their credibility to impersonators and savvy investors lose their fortunes to rudimentary scams. We celebrated ownership but neglected identity. We built decentralized economies on centralized points of failure. The promise of Web3 was being undermined by its own "digital frailty." This had to change.
        </p>
        <h2>The New Standard: Identity as a Foundation</h2>
        <p>
          We are here to introduce a new standard. Huemnz is the infrastructure for a more secure and equitable creator economy. We believe the future of digital interaction isn't just about faster transactions; it's about **provable reputation**.
        </p>
        <p>
          By creating a synergistic link between a secure, one-time verification and a non-transferable Soul-Bound Token (SBT), Huemnz establishes a foundational "Proof of Personhood." This isn't about exposing your private data; it's about giving you a cryptographic key that says "I am me," which you can use to navigate the digital world with unprecedented security and confidence.
        </p>
        <p>
          The art, beautifully crafted by our visionary artist, is the key to this new ecosystem. It is a symbol of your entry into a more secure, more trustworthy, and more *human* digital future.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutPage;