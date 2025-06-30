// src/components/Roadmap.jsx
import React from 'react';
import styles from './Roadmap.module.css';
import roadmapImage from '../assets/roadmap.png'; // Import the image

function Roadmap() {
  return (
    <section className={styles.roadmapSection}>
      <h2>Our Roadmap</h2>
      <img
        src={roadmapImage}
        alt="HueMnz Project Roadmap"
        className={styles.roadmapImage}
      />
      {/* Optionally, we could add text descriptions below or overlayed later */}
    </section>
  );
}

export default Roadmap;