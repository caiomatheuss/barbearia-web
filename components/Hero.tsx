// Componente Hero - Seção principal da landing page

import React from 'react';
import styles from '../styles/Hero.module.css';

interface HeroProps {
  onAgendarClick: () => void;
}

export default function Hero({ onAgendarClick }: HeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>✂️ BARBEARIA PREMIUM</h1>
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>
            Estilo e Tradição em Cada Corte
          </h2>
          <p className={styles.subtitle}>
            Agende seu horário com nossos profissionais especializados
          </p>
          <button 
            className={`${styles.btn} ${styles.btnPrimary}`}
            onClick={onAgendarClick}
          >
            Agendar Corte Agora
          </button>
        </div>
      </div>
    </section>
  );
}

