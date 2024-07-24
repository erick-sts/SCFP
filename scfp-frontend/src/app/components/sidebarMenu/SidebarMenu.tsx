import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SidebarMenu.module.css';
import ModalAlert from '../modalAlert/ModalAlert';

const getUserInfo = (): { name: string; photo: string } | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const SidebarMenu: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; photo: string } | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Estado para controlar a exibição do modal
  const [modalMessage, setModalMessage] = useState(''); // Mensagem do modal
  const [modalType, setModalType] = useState<'success' | 'error' | 'warning' | null>(null); // Tipo do modal

  useEffect(() => {
    // Função para obter informações do usuário e atualizar o estado
    const fetchUser = () => {
      const userInfo = getUserInfo();
      setUser(userInfo);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    // Exibe o modal para confirmar a ação de logout
    setModalMessage('Você realmente deseja sair?');
    setModalType('error');
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleModalClose = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className={styles.sidebarMenu}>
      <div className={styles.logo}>
        <img src='/caduceu.png' alt="logo" />
      </div>

      <div><h2>Controle Financeiro</h2></div>

      <div className={styles.userInfo}>
        <img src={user?.photo || '/user.png'} alt="user" />
        <div className={styles.userDetails}>
          <span className={styles.username}>{user?.name || 'Usuário'}</span>
          <button className={styles.logoutButton} onClick={handleLogout}>Sair</button>
        </div>
      </div>

      {/* Modal de confirmação de logout */}
      {showLogoutModal && (
        <ModalAlert
          message={modalMessage}
          type={modalType || 'warning'}
          onClose={handleModalClose}
          onConfirm={confirmLogout}
        />
      )}
    </div>
  );
};

export default SidebarMenu;
