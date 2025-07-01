import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
// CORRECTED PATH: Go up one level from 'pages' to 'src' to find the CSS file.
import styles from '../Landing.module.css';

// NO LONGER importing images at the top

function Landing({ onEnter }) {
  const [hasPolkadotExtension, setHasPolkadotExtension] = useState(false);
  const [error, setError] = useState('');

  useState(() => {
    const checkExtension = async () => {
      const extensions = await web3Enable('Huemnz');
      if (extensions.length === 0) {
        setHasPolkadotExtension(false);
        return;
      }
      setHasPolkadotExtension(true);
    };
    checkExtension();
  }, []);

  const handleConnectWallet = async () => {
    setError('');
    if (!hasPolkadotExtension) {
      setError('No Polkadot wallet extension found. Please install Talisman, Polkadot.js, or another compatible wallet.');
      return;
    }

    try {
      const accounts = await web3Accounts();
      if (accounts.length === 0) {
        setError("No accounts found. Please create an account in your wallet extension and refresh the page.");
        return;
      }
      const firstAccount = accounts[0];
      const formData = { wallet: firstAccount.address };
      onEnter(formData);
    } catch (err) {
      setError("Failed to connect wallet. Please ensure you've granted permission.");
    }
  };

  return (
    <div className={styles.landingContainer} style={{ backgroundImage: `url(/assets/landing.jpg)` }}>
      <div className={styles.overlay}></div>
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src="/assets/logo.png" alt="Huemnz Logo" className={styles.logoPlaceholder} />
        
        <h1>An ecosystem powered by trust and tech.</h1>
        <p>
          Connect your Polkadot wallet to begin the eXperience and see how your on-chain identity can protect more than just your JPEGs.
        </p>

        <div className={styles.connectContainer}>
            <button onClick={handleConnectWallet} className={styles.ctaButton}>
                Connect Polkadot Wallet
            </button>
            {error && <p className={styles.errorMessage}>{error}</p>}
        </div>

      </motion.div>
    </div>
  );
}

export default Landing;