import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SidebarMenu.module.css';

const SidebarMenu: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; photo: string } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
    //implementar busca de dados do usuario
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <div className={styles.sidebarMenu}>
      <div className={styles.logo}>
        <img src='/caduceu.png' alt="logo" />
      </div>

      <div><h2>Controle Financeiro</h2></div>

      <div className={styles.userInfo}>
        <img src={user?.photo || '/images/user.png'} alt="user" />
        <span className={styles.username}>{user?.name || 'Usuário'}</span>
        <button className={styles.logoutButton} onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
};

export default SidebarMenu;