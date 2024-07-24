import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import styles from './TransactionList.module.css';

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
  onEdit: (transaction: Transaction) => void; // Adicione o onEdit aqui
}

const TransactionList: React.FC<TransactionListProps> = ({ incomes, expenses, onDelete, onEdit }) => {
  const transactions: Transaction[] = [
    ...incomes.map((transaction) => ({ ...transaction, type: 'income' as 'income' })),
    ...expenses.map((transaction) => ({ ...transaction, type: 'expense' as 'expense' })),
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
              .map((transaction) => (
                <li key={transaction.id} className={styles.income}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit
                      className={styles.icon}
                      title="Editar"
                      onClick={() => onEdit(transaction)} // Passa a transação para a função onEdit
                    />
                    <FaTrash
                      className={styles.icon}
                      title="Excluir"
                      onClick={() => onDelete(transaction.id, 'income')}
                    />
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
              .map((transaction) => (
                <li key={transaction.id} className={styles.expense}>
                  {transaction.description} | {"R$ " + Number(transaction.value).toFixed(2)} | ({transaction.category.name})
                  <div className={styles.icons}>
                    <FaEdit
                      className={styles.icon}
                      title="Editar"
                      onClick={() => onEdit(transaction)} // Passa a transação para a função onEdit
                    />
                    <FaTrash
                      className={styles.icon}
                      title="Excluir"
                      onClick={() => onDelete(transaction.id, 'expense')}
                    />
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
