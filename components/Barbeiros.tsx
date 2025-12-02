// Componente Barbeiros - Lista de barbeiros disponíveis

import React from 'react';
import { Barbeiro } from '../utils/constants';
import styles from '../styles/Barbeiros.module.css';

interface BarbeirosProps {
  barbeiros: Barbeiro[];
  onBarbeiroClick: (barbeiro: Barbeiro) => void;
}

export default function Barbeiros({ barbeiros, onBarbeiroClick }: BarbeirosProps) {
  return (
    <section className={styles.section} id="barbeiros">
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos Barbeiros</h2>
        <p className={styles.subtitle}>
          Escolha o profissional que melhor combina com seu estilo
        </p>
        <div className={styles.grid}>
          {barbeiros.map((barbeiro) => (
            <div key={barbeiro.id} className={styles.card}>
              <div className={styles.foto}>
                <div className={styles.placeholder}>
                  <span>👨‍💼</span>
                </div>
              </div>
              <h3 className={styles.nome}>{barbeiro.nome}</h3>
              <button
                className={styles.btn}
                onClick={() => onBarbeiroClick(barbeiro)}
              >
                Agendar com {barbeiro.nome}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

