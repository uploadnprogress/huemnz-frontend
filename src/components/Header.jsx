import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logoImage from '../assets/logo.png'; // Using your specified name

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
            <img src={logoImage} alt="Huemnz Logo" />
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