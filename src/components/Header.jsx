import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../assets/Huemnz Logo.jpg';
import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Logic: If on home, scroll top. If elsewhere, go home.
  const handleLogoClick = () => {
    if (location.pathname === '/home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/home');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo} onClick={handleLogoClick}>
        <img src={logoImg} alt="HUEMNZ" className={styles.logoImage} />
      </div>
      <nav className={styles.nav}>
        <span className={styles.navLink} onClick={() => navigate('/about')}>About</span>
        <span className={styles.navLink} onClick={() => navigate('/vision')}>Vision</span>
        <span className={styles.navLink} onClick={() => navigate('/faq')}>FAQ</span>
        <span className={`${styles.navLink} ${styles.disabledLink}`}>Mint <small>(Soon)</small></span>
        <button className={styles.gameButton} onClick={() => navigate('/allowlist')}>
          Allowlist Game
        </button>
      </nav>
    </header>
  );
};

export default Header;