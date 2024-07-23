import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importa ícones de edição e exclusão
import styles from './TransactionList.module.css';

interface Transaction {
  description: string;
  value: number;
  category: {
    name: string;
    color: string; // Assume que cada categoria pode ter uma cor associada
  };
}

interface TransactionListProps {
  incomes: Transaction[];
  expenses: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ incomes, expenses }) => {
  const transactions = [
    ...incomes.map((transaction) => ({ ...transaction, type: 'income' })),
    ...expenses.map((transaction) => ({ ...transaction, type: 'expense' })),
  ];

  return (
    <div className={styles.transactionList}>
      <h2>Extrato</h2>
      <div className={styles.columns}>
        <div className={styles.column}>
          <h3>Receitas</h3>
          <ul>
            {transactions
              .filter((transaction) => transaction.type === 'income')
              .map((transaction, index) => (
                <li key={index} className={styles.income}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit className={styles.icon} title="Editar" />
                    <FaTrash className={styles.icon} title="Excluir" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Despesas</h3>
          <ul>
            {transactions
              .filter((transaction) => transaction.type === 'expense')
              .map((transaction, index) => (
                <li key={index} className={styles.expense}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit className={styles.icon} title="Editar" />
                    <FaTrash className={styles.icon} title="Excluir" />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
