import React from 'react';
import styles from './ModalAlert.module.css';

interface ModalAlertProps {
  message: string; // Mensagem a ser exibida no modal
  type: 'success' | 'error' | 'warning'; // Tipo do alerta para aplicar estilos diferentes
  onClose: () => void; // Função chamada ao fechar o modal
  onConfirm?: () => void; // Função opcional para confirmação (exibida apenas se definida)
}

const ModalAlert: React.FC<ModalAlertProps> = ({ message, type, onClose, onConfirm }) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={`${styles.modalContent} ${type === 'error' ? styles.error : type === 'warning' ? styles.warning : styles.success}`}>
        <span className={styles.closeButton} onClick={onClose}>&times;</span>
        <p>{message}</p>
        <div className={styles.modalActions}>
          {onConfirm ? (
            <>
              <button className={styles.confirmButton} onClick={onConfirm}>Confirmar</button>
              <button className={styles.cancelButton} onClick={onClose}>Cancelar</button>
            </>
          ) : (
            <button className={styles.confirmButton} onClick={onClose}>Ok</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAlert;
