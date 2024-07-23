// src/app/components/transactionList/TransactionList.tsx
import React from 'react';
import styles from './TransactionList.module.css';

interface TransactionListProps {
  incomes: any[];
  expenses: any[];
}

const TransactionList: React.FC<TransactionListProps> = ({ incomes, expenses }) => {
  const transactions = [...incomes, ...expenses];

  return (
    <div className={styles.transactionList}>
      <h2>Extrato</h2>
      <ul>
        {transactions.map((transaction, index) => (
          <li key={index}>
            {transaction.description} - {transaction.amount} ({transaction.category})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
