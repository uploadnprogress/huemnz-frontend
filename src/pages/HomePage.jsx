import React from 'react';
import { motion } from 'framer-motion';
import styles from './Homepage.module.css'; // Note the renamed CSS file

// Animation variants for Framer Motion
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

function Homepage() {
  const characterPlaceholders = Array.from({ length: 6 }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      {/* ===== HEADER with corrected name and links ===== */}
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logo}>HUEMNZ</div>
        <nav className={styles.nav}>
          <a href="#allowlist">Allow List</a>
          <a href="#roadmap">Roadmap</a>
          <a href="#sneak-peeks">Sneak Peeks</a>
        </nav>
      </motion.header>

      <main>
        {/* ===== SNEAK PEEKS SECTION (formerly Gallery) ===== */}
        <motion.section 
          id="sneak-peeks" 
          className={styles.contentSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <motion.h2 variants={fadeIn}>Sneak Peeks</motion.h2>
          <div className={styles.galleryGrid}>
            {characterPlaceholders.map(id => (
              <motion.img
                key={id}
                src={`https://placehold.co/600x600/121212/4a4a4a?text=Character+${id}`}
                alt={`Placeholder for Huemnz Character ${id}`}
                className={styles.artPlaceholder}
                variants={fadeIn}
              />
            ))}
          </div>
        </motion.section>

        {/* ===== ROADMAP SECTION (New placeholder section) ===== */}
        <motion.section
          id="roadmap"
          className={styles.contentSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
            <h2>Roadmap</h2>
            <p className={styles.sectionDescription}>Our journey is just beginning. Here's a look at what we're building for the Huemnz ecosystem, from on-chain verification tools to exclusive holder benefits.</p>
            {/* You can expand this section with more detailed roadmap items */}
        </motion.section>


        {/* ===== ALLOWLIST SIGNUP SECTION ===== */}
        <motion.section 
          id="allowlist"
          className={styles.allowlistSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2>Join the Allowlist</h2>
          <p className={styles.sectionDescription}>Secure your spot for the upcoming mint. Early access for our community.</p>
          <div className={styles.inputGroup}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className={styles.emailInput} 
            />
            <button className={styles.primaryButton}>Secure Spot</button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default Homepage;