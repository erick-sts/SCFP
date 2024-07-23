// src/app/components/sidebarMenu/SidebarMenu.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SidebarMenu.module.css';

const SidebarMenu: React.FC = () => {
  const router = useRouter();
  const username = 'João da Silva'; // Nome fictício do usuário
  const userImageUrl = '/images/user.png'; // Caminho para a foto do usuário

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className={styles.sidebarMenu}>
      <div className={styles.logo}>
        <img src='/caduceu.png' alt="logo" />
      </div>
      <div className={styles.userInfo}>
        <img src={userImageUrl} alt="user" />
        <span className={styles.username}>{username}</span>
        <button className={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default SidebarMenu;
