import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css';

const faqs = [
  {
    q: "What is The HueMn eXperience NFT?",
    a: "It is your key to the Huemnz ecosystem. Holding it grants you access to our decentralized platform and activates your Soul-Bound Token (SBT), which forms the core of your on-chain identity. This allows you to securely build reputation, verify ownership, and participate in a trusted digital economy."
  },
  {
    q: "What chain is Huemnz built on?",
    a: "Huemnz is being built on Polkadot, utilizing it as a foundational Layer 0. This allows Huemnz to operate as its own sovereign Layer 1 blockchain, ensuring long-term scalability, interoperability, and the ability to control our own network fees and governance without being dependent on another chain's congestion or high gas costs."
  },
  {
    q: "What is a Soul-Bound Token (SBT)?",
    a: "An SBT is a special type of non-fungible token that, once assigned to a wallet, cannot be transferred or sold. This permanent link is what allows us to create a persistent on-chain identity, similar to how a passport is tied to you in the real world. It's the technical foundation for trust and reputation."
  },
  {
    q: "Is there a mint limit?",
    a: "Yes. To ensure a fair and decentralized launch, there will be a limit of 3 The HueMn eXperience NFTs per allowlisted wallet. This encourages a wider distribution and allows more individuals to join our community from the start."
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