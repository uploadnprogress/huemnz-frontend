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
      <h1>About Huemnz</h1>
      <div className={styles.content}>
        <h2>The "Why" Behind Huemnz</h2>
        <p>
          Huemnz was born from a frustrating observation: the world of digital assets is revolutionary, yet it's built on a foundation of digital quicksand. We trade priceless art and vital information using wallets that have no inherent identity, no memory, and no reputation. This "digital frailty" leads to rampant scams, impersonation, and a constant, low-level anxiety that hinders true mainstream adoption.
        </p>
        <p>
          I, the founder, saw colleagues lose fortunes to simple exploits and talented artists lose their hard-earned credibility to copycats. The tools we were given were powerful, but incomplete. They could hold value, but they couldn't hold trust.
        </p>
        <h2>Our Solution: Identity as a Foundation</h2>
        <p>
          We believe the next evolution of Web3 isn't just faster transactions or more complex DeFi—it's **identity**. Not a username or a profile picture, but a provable, persistent, and secure on-chain identity that you, and only you, control.
        </p>
        <p>
          By creating a synergistic link between a secure, off-chain KYC process and a non-transferable Soul-Bound Token (SBT), Huemnz establishes a foundational "Proof of Personhood." This isn't about exposing your private data; it's about giving you a cryptographic key that says "I am me," which you can use to navigate the digital world with unprecedented security and confidence.
        </p>
        <p>
          The art, beautifully crafted by our visionary artist, isn't just a collectible. It's the first key to this new ecosystem—a symbol of your entry into a more secure, more trustworthy, and more *human* digital future.
        </p>
      </div>
    </motion.div>
  );
}

export default AboutPage;