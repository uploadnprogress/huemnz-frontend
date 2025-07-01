import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaTwitter, FaDiscord } from 'react-icons/fa';

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <p className={styles.logo}>HUEMNZ</p>
          <p>&copy; {currentYear} All rights reserved.</p>
        </div>
        <div className={styles.center}>
          <Link to="/about">About</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/allowlist">Allowlist</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className={styles.right}>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" aria-label="Discord">
            <FaDiscord />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;