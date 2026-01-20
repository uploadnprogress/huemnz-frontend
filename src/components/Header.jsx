import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa'; 
import logoImg from '../assets/Huemnz Logo.jpg';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // <--- THIS CONTROLS THE MENU

  const handleLogoClick = () => {
    if (location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/home');
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      {/* LOGO */}
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src={logoImg} alt="HUEMNZ" className={styles.logoImage} />
      </div>

      {/* DESKTOP NAV (Hidden on Mobile via CSS) */}
      <nav className={styles.desktopNav}>
        <span className={styles.navLink} onClick={() => handleNavClick('/about')}>About</span>
        <span className={styles.navLink} onClick={() => handleNavClick('/vision')}>Vision</span>
        <span className={styles.navLink} onClick={() => handleNavClick('/faq')}>FAQ</span>
        <span className={`${styles.navLink} ${styles.disabledLink}`}>Mint <small>(Soon)</small></span>
        <button className={styles.gameButton} onClick={() => handleNavClick('/allowlist')}>
          Allowlist Game
        </button>
      </nav>

      {/* HAMBURGER ICON (Visible on Mobile via CSS) */}
      <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* MOBILE MENU DRAWER - THIS IS THE MISSING PIECE */}
      {isMenuOpen && (
        <div className={styles.mobileMenu}>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/about')}>About</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/vision')}>Vision</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/faq')}>FAQ</button>
          <button className={`${styles.mobileBtn} ${styles.disabledMobileBtn}`} disabled>Mint (Soon)</button>
          <button className={styles.mobileBtn} onClick={() => handleNavClick('/allowlist')}>Allowlist Game</button>
        </div>
      )}
    </header>
  );
};

export default Header;