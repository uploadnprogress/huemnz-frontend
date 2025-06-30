// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Use Link for logo to go home */}
        <Link to="/" className={styles.logo}>HueMnz</Link>
        <nav className={styles.nav}>
          {/* Use Link component for navigation */}
          <Link to="/">Home</Link>
          <Link to="/about">About</Link> {/* Assuming content from /intro goes here */}
          <Link to="/vision">The Vision</Link> {/* Assuming content from /our-views goes here */}
          <Link to="/faq">FAQ</Link>
          <Link to="/allowlist">Allowlist</Link> {/* Added Allowlist */}
          <Link to="/mint">Mint</Link> {/* Added Mint */}
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;