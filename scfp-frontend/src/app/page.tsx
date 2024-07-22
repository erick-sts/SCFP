import React from 'react';
import styles from './page.module.css';

const HomePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
      <div>
          <img src="/caduceu.png" alt="Caduceu" className={styles.image} />
        </div>
        <h3 className={styles.title} title='Curiosidade: Hermes é o deus grego da riqueza e da properidade!'>Bem-vindo ao Hermes</h3>
        
        <div className={styles.buttonContainer}>
          <a href="/login" className={styles.button}>Fazer Login</a>
          <a href="/register" className={styles.button}>Novo Usuário</a>
        </div>
      </div>

    </div>
  );
};

export default HomePage;