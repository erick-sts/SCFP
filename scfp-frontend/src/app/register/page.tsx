"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { register } from '../services/userService'; 

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!photo) {
      setError('Por favor, selecione uma foto.');
      return;
    }

    try {
      const response = await register(name, email, password, photo);
      console.log(response);
      router.push('/login'); // Redirecionar para a página de login após o cadastro bem-sucedido
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Erro desconhecido ao registrar usuário');
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
      document.getElementById('file-chosen')!.textContent = e.target.files[0].name;
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
            <span id="file-chosen" className={styles.fileChosen}>Nenhuma foto escolhida</span>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button}>Cadastrar</button>
        </form>
        <div className={styles.loginLink}>
          <a href="/login">Já tem uma conta? Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
