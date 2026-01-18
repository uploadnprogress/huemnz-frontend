import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css';

const faqs = [
  {
    q: "Is HueMn just an NFT collection?",
    a: "No. The HueMnz NFT is your entry point, but holding it activates your HDSBT (HueMn Digital Soulbound Token). The project itself is a Sovereign Layer 1 blockchain building dedicated infrastructure for on-chain identity that operates independently of other congested networks."
  },
  {
    q: "What chain is Huemnz built on?",
    a: "Huemnz is being built on Polkadot, utilizing it as a foundational Layer 0. This allows Huemnz to operate as its own sovereign Layer 1 blockchain, ensuring long-term scalability, interoperability, and the ability to control our own network fees and governance."
  },
  {
    q: "What does 'Sovereign Layer 1' actually mean?",
    a: "It means we own our foundation. Built with the Polkadot SDK (Substrate), we are a 'Solo Chain' that plugs into the Polkadot Layer 0 for security. We don't share 'rented' space with thousands of other apps, meaning our network is optimized solely for HueMnz users."
  },
  {
    q: "What is an HDSBT (HueMn Digital Soulbound Token)?",
    a: "An HDSBT is a non-transferable cryptographic asset tied to your identity. It acts as your verified passport within our ecosystem. It cannot be sold or transferred, ensuring that your on-chain reputation and access rights stay with you, not a wallet address."
  },
  {
    q: "How does the identity system work?",
    a: "We combine a secure, one-time KYC verification with a non-transferable Soul-Bound Token (SBT). Your private data is never stored on-chain. The process creates a verifiable link, or 'attestation,' proving you are a unique human. This is the foundation for eliminating bots and bad actors."
  },
  {
    q: "How do you handle KYC without storing my data?",
    a: "We use the Substrate Identity Pallet. A trusted third-party Registrar verifies your documentation off-chain and issues an on-chain 'Judgment.' The blockchain only sees a 'Verified' status; it never touches your personal files."
  },
  {
    q: "Why Polkadot instead of an Ethereum L2?",
    a: "L2s are subject to the 'landlord' rules of their L1. By building on Polkadot as a Layer 0, we get the absolute sovereignty to customize our chain logic via Pallets while maintaining massive shared security from the relay chain."
  },
  {
    q: "What do you mean by 'Creator Economy'?",
    a: "The Creator Economy is the ecosystem of artists, builders, and collectors. Huemnz empowers this by providing a layer of trust. Artists can ensure their drops reach real humans, and collectors can be confident they are interacting with legitimate creators, not impersonators."
  },
  {
    q: "What are the reward mechanisms?",
    a: "Our ecosystem is designed to reward positive participation. Rewards will be tied to on-chain reputation, community governance participation, and long-term holding, creating a self-sustaining cycle of value for active members."
  },
  {
    q: "What is the mint limit?",
    a: "To ensure a fair and decentralized launch, there will be a limit of 3 The HueMn eXperience NFTs per allowlisted wallet. This encourages a wider distribution and prevents bot-driven concentration."
  },
  {
    q: "When is the mint date and price?",
    a: "Now that our core infrastructure on Polkadot is being finalized, we will be announcing the official mint date and price very soon. All details will be released first on our official Twitter and Discord channels."
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