import React from 'react';
import { motion } from 'framer-motion';
import styles from './ContentPage.module.css';

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
        <div>
          <h2>Executive Summary</h2>
          <p>
            The promise of Web3—decentralized ownership, transparent systems, and user sovereignty—is fundamentally constrained by a single, unsolved problem: the absence of a reliable and private identity layer. Huemnz is a Layer 1 protocol built on Polkadot, designed to solve this problem by creating a new foundation for on-chain trust through a synergistic combination of one-time identity verification (KYC) and non-transferable Soul-Bound Tokens (SBTs).
          </p>
        </div>

        <div>
          <h2>1. The Problem: Digital Frailty</h2>
          <p>
            Anonymity, while a powerful feature, has created an environment of "digital frailty" where bad actors can thrive. This systemic weakness hinders mainstream adoption and erodes trust.
          </p>
          <ul>
            <li><strong>Sybil Attacks:</strong> Actors controlling thousands of wallets can manipulate governance and exploit opportunities.</li>
            <li><strong>Impersonation:</strong> Scammers defraud honest members by copying projects, tarnishing creator reputations.</li>
            <li><strong>Lack of Persistent Reputation:</strong> On-chain history is tied to transferable wallets, not the individual.</li>
          </ul>
        </div>

        <div>
          <h2>2. The Bedrock: Beyond Smart Contracts</h2>
          <p>
            Most projects are tenants on rented land. HueMn is building the bedrock. We are utilizing the <strong>Polkadot SDK (Substrate)</strong> to launch a Sovereign Layer 1 blockchain. By utilizing Polkadot as a Layer 0 security provider, we inherit multi-billion dollar shared security while maintaining 100% control over our runtime logic.
          </p>
        </div>

        <div>
          <h2>3. The Identity Stack: HDSBT & Pallets</h2>
          <p>Our "Proof of Personhood" is built into the chain's core through custom Substrate Pallets:</p>
          <ul>
            <li><strong>The HDSBT Pallet:</strong> A custom non-transferable token standard the HueMn Digital Soulbound Token. Your HDSBT is anchored to your on-chain identity and cannot be traded or stolen.</li>
            <li><strong>The Registrar System:</strong> Utilizing Substrate’s native Identity Pallet for privacy preserving KYC where a "Judgment" is issued on-chain, proving you are human without exposing documents.</li>
          </ul>
        </div>

        <div>
          <h2>4. The Ecosystem Flywheel</h2>
          <p>
            With a foundation of trust, we build the rails for a verified creator economy where bots are mathematically impossible and gas fees are stable.
          </p>
          <ul>
            <li><strong>For Creators:</strong> Launch projects with confidence, gating sales to "Verified Huemnz" to eliminate bots.</li>
            <li><strong>For Collectors:</strong> Participate in a secure marketplace, building a portable, persistent reputation.</li>
            <li><strong>Rewards:</strong> A native token designed to reward value-additive behavior, such as staking and governance participation.</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default VisionPage;