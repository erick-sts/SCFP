import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './TransactionList.module.css';
import ModalAlert from '../modalAlert/ModalAlert';

interface Transaction {
  id: number;
  description: string;
  value: number;
  category: {
    name: string;
    color: string;
  };
  type: 'income' | 'expense';
}

interface TransactionListProps {
  incomes: Transaction[];
  expenses: Transaction[];
  onDelete: (id: number, type: 'income' | 'expense') => void;
  onEdit: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ incomes, expenses, onDelete, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<Transaction | null>(null);
  const [modalType, setModalType] = useState<'error' | 'warning'>('warning'); // Default to 'warning'

  const transactions: Transaction[] = [
    ...incomes.map((transaction) => ({ ...transaction, type: 'income' as 'income' })),
    ...expenses.map((transaction) => ({ ...transaction, type: 'expense' as 'expense' })),
  ];

  const calculateTotal = (type: 'income' | 'expense') => {
    return transactions
      .filter((transaction) => transaction.type === type)
      .reduce((acc, transaction) => {
        const value = parseFloat(transaction.value.toString());
        return acc + (isNaN(value) ? 0 : value);
      }, 0);
  };

  const totalIncome = calculateTotal('income');
  const totalExpense = calculateTotal('expense');
  const balance = totalIncome - totalExpense;

  const handleDelete = (transaction: Transaction) => {
    setTransactionToDelete(transaction);
    setModalType('error');
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      onDelete(transactionToDelete.id, transactionToDelete.type);
      setShowModal(false);
      setTransactionToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTransactionToDelete(null);
  };

  const handleWarning = (message: string) => {
    setModalType('warning');
    setShowModal(true);
  };

  return (
    <div className={styles.transactionList}>
      <h2>Extrato</h2>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Receitas</h3>
          <ul>
            {transactions
              .filter((transaction) => transaction.type === 'income')
              .map((transaction) => (
                <li key={transaction.id} className={styles.income}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit
                      className={styles.icon}
                      title="Editar"
                      onClick={() => onEdit(transaction)}
                    />
                    <FaTrash
                      className={styles.icon}
                      title="Excluir"
                      onClick={() => handleDelete(transaction)}
                    />
                  </div>
                </li>
              ))}
          </ul>
          <div className={styles.total}>
            Total Receitas: {"R$ " + Number(totalIncome).toFixed(2)}
          </div>
        </div>
        <div className={styles.column}>
          <h3>Despesas</h3>
          <ul>
            {transactions
              .filter((transaction) => transaction.type === 'expense')
              .map((transaction) => (
                <li key={transaction.id} className={styles.expense}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit
                      className={styles.icon}
                      title="Editar"
                      onClick={() => onEdit(transaction)}
                    />
                    <FaTrash
                      className={styles.icon}
                      title="Excluir"
                      onClick={() => handleDelete(transaction)}
                    />
                  </div>
                </li>
              ))}
          </ul>
          <div className={styles.total}>
            Total Despesas: {"R$ " + Number(totalExpense).toFixed(2)}
          </div>
        </div>
      </div>
      <div className={styles.balance}>
        <h3>Saldo</h3>
        <p>{"R$ " + Number(balance).toFixed(2)}</p>
      </div>
      {showModal && (
        <ModalAlert
          message={modalType === 'error' ? "Você tem certeza que deseja excluir este item?" : "Aviso: Verifique suas informações."}
          type={modalType}
          onClose={cancelDelete}
          onConfirm={modalType === 'error' ? confirmDelete : undefined}
        />
      )}
    </div>
  );
};

export default TransactionList;
