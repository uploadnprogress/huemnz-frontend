// src/components/Footer.jsx
import React from 'react';
import styles from './Footer.module.css'; // We'll create this CSS file next

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {currentYear} HueMnz. All rights reserved.</p>
        <div>
          {/* Add social links here later */}
          <a href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">Twitter</a> |
          <a href="https://discord.gg/example" target="_blank" rel="noopener noreferrer">Discord</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;