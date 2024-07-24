import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Transaction } from '../../types';
import styles from './EditTransactionModal.module.css';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  transactionToEdit: Transaction | null;
  categories: any[];
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  transactionToEdit,
  categories
}) => {
  const [description, setDescription] = useState<string>('');
  const [value, setValue] = useState<number | ''>('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {
    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setValue(transactionToEdit.value);
      setType(transactionToEdit.type);
      setCategory(transactionToEdit.category.name);
    }
  }, [transactionToEdit]);

  const handleSubmit = () => {
    if (description && value !== '' && category) {
      onSubmit({ description, value, type, category });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar"
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>×</span>
        <h2>Editar</h2>
        <div className={styles.form}>
          <label className={styles.label}>
            Descrição:
            <input
              className={styles.input}
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className={styles.label}>
            Valor:
            <input
              className={styles.input}
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
            />
          </label>
          <label className={styles.label}>
            Tipo:
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value as 'income' | 'expense')}
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </label>
          <label className={styles.label}>
            Categoria:
            <select
              className={styles.select}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </label>
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleSubmit}>Salvar</button>
            <button className={styles.button} onClick={onClose}>Fechar</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditTransactionModal;