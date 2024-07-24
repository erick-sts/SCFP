"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { login } from '../services/authService';
import ModalAlert from '../components/modalAlert/ModalAlert'; 

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error' | 'warning' | null>(null); 
  const [showModal, setShowModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); // Estado para controlar o redirecionamento
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      setModalMessage('Login realizado com sucesso!');
      setModalType('success');
      setShowModal(true);
      setShouldRedirect(true); // Prepara o redirecionamento após o fechamento do modal
    } catch (error: unknown) {
      if (error instanceof Error) {
        setModalMessage(error.message);
      } else {
        setModalMessage('Erro desconhecido ao fazer login');
      }
      setModalType('error');
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (shouldRedirect) {
      router.push('/dashboard');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Login</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <div className={styles.registerLink}>
          <a href="/register">Não tem uma conta? Cadastre-se</a>
        </div>
      </div>

      {showModal && (
        <ModalAlert
          message={modalMessage}
          type={modalType || 'warning'}
          onClose={handleModalClose}
          onConfirm={modalType === 'warning' ? handleModalClose : undefined}
        />
      )}
    </div>
  );
};

export default LoginPage;
