"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { register } from '../services/userService'; 
import ModalAlert from '../components/modalAlert/ModalAlert';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error' | 'warning' | null>(null); 
  const [showModal, setShowModal] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      setError('Por favor, selecione uma foto.');
      return;
    }

    try {
      const response = await register(name, email, password, photo);
      setModalMessage('Cadastro realizado com sucesso!');
      setModalType('success');
      setShowModal(true);
      setShouldRedirect(true); 
    } catch (error: unknown) {
      if (error instanceof Error) {
        setModalMessage(error.message);
      } else {
        setModalMessage('Erro desconhecido ao registrar usuário');
      }
      setModalType('error');
      setShowModal(true);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    if (shouldRedirect) {
      router.push('/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Cadastro</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Nome</label>
            <input
              type="text"
              id="name"
              name="name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          <div className={styles.formGroup}>
            <label className={styles.label}>Foto</label>
            <label htmlFor="photo" className={styles.fileLabel}>
              Escolha uma imagem
            </label>
            <input
              type="file"
              id="photo"
              name="photo"
              className={styles.fileInput}
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
            <span className={styles.fileChosen}>
              {photo ? photo.name : 'Nenhuma foto escolhida'}
            </span>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        <div className={styles.loginLink}>
          <a href="/login">Já tem uma conta? Faça login</a>
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

export default RegisterPage;
