// src/app/components/transactionForm/TransactionForm.tsx
import React, { useState } from 'react';
import styles from './TransactionForm.module.css';

interface TransactionFormProps {
  onAddTransaction: (description: string, value: number, category: string, type: 'income' | 'expense') => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseFloat(value);
    
    try {
      await onAddTransaction(description, numericValue, category, type);
      setDescription('');
      setValue('');
      setCategory('');
    } catch (error) {
      console.error('Erro ao adicionar transação:', error);
    }
  };

  return (
    <form className={styles.transactionForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Valor"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <div>
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
      <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Selecione uma categoria</option>
        {/* Adicione opções de categorias conforme necessário */}
      </select>
      <button type="submit">Adicionar</button>
    </form>
  );
};

export default TransactionForm;
