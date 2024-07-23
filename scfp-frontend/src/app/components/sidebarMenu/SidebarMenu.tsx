// src/app/components/sidebarMenu/SidebarMenu.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import styles from './SidebarMenu.module.css';

const SidebarMenu: React.FC = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className={styles.sidebarMenu}>
      <button onClick={handleLogout}>Sair</button>
      {/* Adicione outros itens do menu aqui */}
    </div>
  );
};

export default SidebarMenu;
