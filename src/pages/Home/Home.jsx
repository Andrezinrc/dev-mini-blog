import React from 'react';
import styles from './Home.module.css';
import { Link } from 'react-router-dom';
import { FaBook, FaUser, FaEdit, FaRocket, FaLightbulb, FaUsers, FaSun, FaMoon } from 'react-icons/fa';
import { FiCode } from 'react-icons/fi';

export default function Home() {
  
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Fala, Dev!
          </h1>
          <p className={styles.subtitle}>
            Bem-vindo ao seu novo cantinho de código e café
          </p>
          <div className={styles.actions}>
            <Link to="/posts" className={styles.primaryButton}>
              <FaBook className={styles.buttonIcon} />
              Ver Posts
            </Link>
            <Link to="/projects" className={styles.secondaryButton}>
              <FiCode className={styles.buttonIcon} />
              Ver Projetos
            </Link>
          </div>
        </div>
        
        <div className={styles.illustration}>
          <img src="/assets/images/dev.png" alt="Desenvolvedor" />
        </div>
      </section>

      <section className={styles.features}>
        <div className={styles.feature}>
          <FaLightbulb className={styles.featureIcon} />
          <h3>Aprendizado Contínuo</h3>
          <p>Compartilhando erros, acertos e descobertas</p>
        </div>
        <div className={styles.feature}>
          <FaRocket className={styles.featureIcon} />
          <h3>Projetos Reais</h3>
          <p>Experiências práticas do dia a dia</p>
        </div>
      </section>
    </div>
  );
}