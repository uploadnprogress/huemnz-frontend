import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

// NO LONGER importing the logo image

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
            {/* Reference the image directly from the public path */}
            <img src="/assets/logo.png" alt="Huemnz Logo" />
        </NavLink>
        <nav className={styles.navLinks}>
          <NavLink to="/about" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
            About
          </NavLink>
          <NavLink to="/faq" className={({ isActive }) => `${styles.navButton} ${isActive ? styles.active : ''}`}>
            FAQ
          </NavLink>
          <NavLink to="/allowlist" className={({ isActive }) => `${styles.navButton} ${styles.allowlistButton} ${isActive ? styles.active : ''}`}>
            Allowlist Game
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;