import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css'; // We will use a shared style for content pages

function VisionPage() {
  return (
    <motion.div 
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>The Huemnz Vision</h1>
      <p className={styles.subtitle}>Building the Foundational Trust Layer for the Next Generation of the Internet</p>
      
      <div className={styles.content}>
        <h2>Executive Summary</h2>
        <p>
          The promise of Web3—decentralized ownership, transparent systems, and user sovereignty—is fundamentally constrained by a single, unsolved problem: the absence of a reliable and private identity layer. Huemnz is a Layer 1 protocol built on Polkadot, designed to solve this problem by creating a new foundation for on-chain trust through a synergistic combination of one-time identity verification (KYC) and non-transferable Soul-Bound Tokens (SBTs). This paper outlines the architecture, economic model, and future-proofing strategies designed to empower a secure creator economy, reward positive participation, and establish a new standard for digital interaction.
        </p>

        <h2>1. The Problem: Digital Frailty</h2>
        <p>
          Anonymity, while a powerful feature, has created an environment of "digital frailty" where bad actors can thrive. This systemic weakness hinders mainstream adoption and erodes trust. The core issues are:
        </p>
        <ul>
          <li><strong>Sybil Attacks & Unfair Launches:</strong> A single actor controlling thousands of wallets can manipulate governance votes, exploit allowlist opportunities, and make fair distribution impossible.</li>
          <li><strong>Impersonation & Fraud:</strong> Without provable identity, anyone can copy a project's art and social media, creating convincing scams that defraud honest community members and tarnish a creator's reputation.</li>
          <li><strong>Lack of Persistent Reputation:</strong> Your on-chain history is tied to a transferable wallet, not to you as an individual. If your wallet is compromised, your reputation is lost. There is no mechanism to build lasting on-chain trust that can move with you across platforms.</li>
        </ul>

        <h2>2. The Huemnz Solution: Provable Identity</h2>
        <div className={styles.contentBlock}>
            <h3>2.1 The Two Pillars: SBTs and Privacy-Preserving Verification</h3>
            <p>Our solution is not just an NFT collection; it's a new protocol built on two pillars. First, a **Soul-Bound Token (SBT)**, a non-transferable token that acts as a permanent anchor for your on-chain identity. Second, a **one-time, privacy-preserving verification process**. Your personal data is never stored on-chain. The process only generates a cryptographic "attestation" confirming you are a unique human, which is then linked to your SBT. This establishes "Proof of Personhood" without sacrificing privacy.</p>
        </div>
        <div className={styles.contentBlock}>
            <h3>2.2 The Technical Foundation: Polkadot Layer 1</h3>
            <p>Huemnz is not just a dApp; it is its own Layer 1 blockchain, built as a parachain on the Polkadot network. Using Polkadot as a "Layer 0" provides us with shared security and interoperability while giving us the sovereignty to control our own destiny. This future-proofs the ecosystem, allowing us to set our own transaction fees, govern our own upgrades, and avoid the congestion and limitations of other networks.</p>
        </div>


        <h2>3. The Ecosystem: How We Reward and Empower</h2>
        <p>
          With a foundation of trust, a new economic model becomes possible. This is the Huemnz Flywheel.
        </p>
        <ul>
            <li><strong>For Creators:</strong> Launch projects with confidence. Gate sales to "Verified Huemnz," instantly eliminating bots. Build a loyal following based on genuine interaction and protect your intellectual property from impersonators.</li>
            <li><strong>For Collectors:</strong> Participate in a fair and secure marketplace. Know that the artist you're buying from is legitimate. Build your own on-chain reputation as a discerning collector, which in turn unlocks early access and other benefits within the ecosystem.</li>
            <li><strong>On-Chain Reward Mechanisms:</strong> The Huemnz protocol will feature a native token designed to reward value-additive behavior. Staking, participating in governance votes that shape the future of the chain, and curating quality content will all generate on-chain rewards, creating a powerful incentive for users to act as good stewards of the ecosystem.</li>
          </ul>
      </div>
    </motion.div>
  );
}

export default VisionPage;