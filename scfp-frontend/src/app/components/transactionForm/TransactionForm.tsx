import React, { useState, useEffect } from 'react';
import styles from './TransactionForm.module.css';
import { getCategories } from '../../services/fincancesService';

interface TransactionFormProps {
  onAddTransaction: (description: string, value: number, categoryId: number, type: 'income' | 'expense') => void;
  userId: number;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, userId }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined);
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [categories, setCategories] = useState<{ id: number; name: string; transactionType: 'income' | 'expense' }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryData = await getCategories();
        setCategories(Array.isArray(categoryData) ? categoryData : []);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (categoryId !== undefined) {
      onAddTransaction(description, value, categoryId, type);
      setDescription('');
      setValue(0);
      setCategoryId(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Adicionar</h2>
      <div className={styles.radio}>
        <label>
          <input
            type="radio"
            value="income"
            checked={type === 'income'}
            onChange={() => setType('income')}
          />
          Receita
        </label>
        <label>
          <input
            type="radio"
            value="expense"
            checked={type === 'expense'}
            onChange={() => setType('expense')}
          />
          Despesa
        </label>
      </div>
      <select
        value={categoryId || ''}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className={styles.input}
        required
      >
        <option value="">Selecione a Categoria</option>
        {categories.filter(c => c.transactionType === type).map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.input}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className={`${styles.input} ${styles.numberInput}`}
        required
      />


      <button type="submit" className={styles.button}>Adicionar</button>
    </form>
  );
};

export default TransactionForm;
