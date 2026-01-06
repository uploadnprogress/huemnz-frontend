import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css';

const faqs = [
  {
    q: "What is The HueMnz NFT?",
    a: "It is your key to the Huemnz ecosystem. Holding it grants you access to our decentralized platform and activates your Soul-Bound Token (SBT), which forms the core of your on-chain identity. This allows you to securely build reputation, verify ownership, and participate in a trusted digital economy."
  },
  {
    q: "What chain is Huemnz built on?",
    a: "Huemnz is being built on Polkadot, utilizing it as a foundational Layer 0. This allows Huemnz to operate as its own sovereign Layer 1 blockchain, ensuring long-term scalability, interoperability, and the ability to control our own network fees and governance without being dependent on another chain's congestion or high gas costs."
  },
    {
    q: "How does the identity system work?",
    a: "We combine a secure, one-time KYC verification with a non-transferable Soul-Bound Token (SBT). Your private data is never stored on-chain. The process simply creates a verifiable link, or 'attestation,' proving you are a unique human. This is the foundation for eliminating bots and bad actors."
  },
    {
    q: "What do you mean by 'Creator Economy'?",
    a: "The Creator Economy is the ecosystem of artists, builders, and collectors. Huemnz empowers this by providing a layer of trust. Artists can ensure their drops reach real humans, and collectors can be confident they are interacting with legitimate creators, not impersonators."
  },
    {
    q: "What are the reward mechanisms?",
    a: "Our ecosystem is designed to reward positive participation. While full details will be in our Vision Paper, rewards will be tied to on-chain reputation, community governance participation, and long-term holding, creating a self-sustaining cycle of value for active members."
  },
  {
    q: "What is the mint limit?",
    a: "To ensure a fair and decentralized launch, there will be a limit of 3 The HueMn eXperience NFTs per allowlisted wallet. This encourages a wider distribution and allows more individuals to join our community from the start."
  },
  {
    q: "When is the mint date and price?",
    a: "Now that our core infrastructure on Polkadot is being finalized, we will be announcing the official mint date and price very soon. All details will be released first on our official Twitter and Discord channels. Stay tuned!"
  }
];

function FAQPage() {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Frequently Asked Questions</h1>
      <div className={styles.faqList}>
        {faqs.map((faq, index) => (
          <div key={index} className={styles.faqItem}>
            <h3>{faq.q}</h3>
            <p>{faq.a}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default FAQPage;