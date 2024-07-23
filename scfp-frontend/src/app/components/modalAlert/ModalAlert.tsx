
import React from 'react';
import styles from './ModalAlert.module.css';

interface ModalAlertProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ModalAlert: React.FC<ModalAlertProps> = ({ message, type, onClose }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modalContent} ${type === 'error' ? styles.error : styles.success}`}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ModalAlert;