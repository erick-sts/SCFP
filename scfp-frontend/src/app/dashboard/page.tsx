"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/authMiddleware';
import TransactionForm from '../components/transactionForm/TransactionForm';
import TransactionList from '../components/transactionList/TransactionList';
import SidebarMenu from '../components/sidebarMenu/SidebarMenu';
import Chart from '../components/chart/Chart';
import styles from './page.module.css';
import { getIncomes, getExpenses, addIncome, addExpense } from '../services/fincancesService';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Use effect for data fetching
  useEffect(() => {
    if (isAuthenticated) {
      const fetchData = async () => {
        try {
          const incomeData = await getIncomes();
          const expenseData = await getExpenses();
          setIncomes(Array.isArray(incomeData) ? incomeData : []);
          setExpenses(Array.isArray(expenseData) ? expenseData : []);
        } catch (error) {
          console.log("Erro ao buscar dados", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated]);

  // Handle redirection
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  const handleAddTransaction = async (description: string, value: number, category: string, type: 'income' | 'expense') => {
    try {
      if (type === 'income') {
        await addIncome({ description, amount: value, category });
        const updatedIncomes = await getIncomes();
        setIncomes(Array.isArray(updatedIncomes) ? updatedIncomes : []);
      } else if (type === 'expense') {
        await addExpense({ description, amount: value, category });
        const updatedExpenses = await getExpenses();
        setExpenses(Array.isArray(updatedExpenses) ? updatedExpenses : []);
      }
    } catch (error) {
      console.error(`Erro ao adicionar ${type === 'income' ? 'receita' : 'despesa'}:`, error);
    }
  };

  const chartData = {
    labels: ['Despesas Fixas', 'Despesas Variáveis', 'Receitas Fixas', 'Receitas Variáveis'],
    datasets: [
      {
        label: 'Despesas e Receitas',
        data: [
          expenses.filter(e => e.category === 'fixed').reduce((acc, curr) => acc + curr.amount, 0),
          expenses.filter(e => e.category === 'variable').reduce((acc, curr) => acc + curr.amount, 0),
          incomes.filter(i => i.category === 'fixed').reduce((acc, curr) => acc + curr.amount, 0),
          incomes.filter(i => i.category === 'variable').reduce((acc, curr) => acc + curr.amount, 0),
        ],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)'],
        borderWidth: 1,
      },
    ],
  };

  if (loading || !isAuthenticated) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <SidebarMenu />
      <div style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>Dashboard</h1>
        <Chart data={chartData} />
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <TransactionList incomes={incomes} expenses={expenses} />
      </div>
    </div>
  );
};

export default DashboardPage;