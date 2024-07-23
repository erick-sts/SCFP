'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/authMiddleware';
import TransactionForm from '../components/transactionForm/TransactionForm';
import TransactionList from '../components/transactionList/TransactionList';
import SidebarMenu from '../components/sidebarMenu/SidebarMenu';
import Chart from '../components/chart/Chart';
import styles from './page.module.css';
import { getIncomes, getExpenses, addIncome, addExpense } from '../services/fincancesService';
import ModalAlert from '../components/modalAlert/ModalAlert';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, loading, userId } = useAuth();
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        try {
          const incomeData = await getIncomes(Number(userId));
          const expenseData = await getExpenses(Number(userId));
          setIncomes(Array.isArray(incomeData) ? incomeData : []);
          setExpenses(Array.isArray(expenseData) ? expenseData : []);
          console.log('Incomes:', incomeData);
          console.log('Expenses:', expenseData);
        } catch (error) {
          console.log("Erro ao buscar dados", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  const handleAddTransaction = async (description: string, value: number, categoryId: number, type: 'income' | 'expense') => {
    try {
      if (userId) {
        if (type === 'income') {
          await addIncome({ description, amount: value, categoryId, userId: Number(userId) });
          const updatedIncomes = await getIncomes(Number(userId));
          setIncomes(Array.isArray(updatedIncomes) ? updatedIncomes : []);

          setAlertMessage('Receita adicionada com sucesso!');
          setAlertType('success');

        } else if (type === 'expense') {
          await addExpense({ description, amount: value, categoryId, userId: Number(userId) });
          const updatedExpenses = await getExpenses(Number(userId));
          setExpenses(Array.isArray(updatedExpenses) ? updatedExpenses : []);
          setAlertMessage('Despesa adicionada com sucesso!');
          setAlertType('success');

        }
        setShowAlert(true);
      }
    } catch (error) {
      console.error(`Erro ao adicionar ${type === 'income' ? 'receita' : 'despesa'}:`, error);
      setAlertMessage(`Erro ao adicionar ${type === 'income' ? 'receita' : 'despesa'}.`);
      setAlertType('error');
      setShowAlert(true);
    }
  };

  const chartData = {
    labels: ['Despesas Fixas', 'Despesas Variáveis', 'Receitas Fixas', 'Receitas Variáveis'],
    datasets: [
      {
        label: 'Categorias de Despesas e Receitas',
        data: [
          expenses.filter(e => e.category?.incomeExpenseType === 'fixed').reduce((acc, curr) => acc + parseFloat(curr.value), 0),
          expenses.filter(e => e.category?.incomeExpenseType === 'variable').reduce((acc, curr) => acc + parseFloat(curr.value), 0),
          incomes.filter(i => i.category?.incomeExpenseType === 'fixed').reduce((acc, curr) => acc + parseFloat(curr.value), 0),
          incomes.filter(i => i.category?.incomeExpenseType === 'variable').reduce((acc, curr) => acc + parseFloat(curr.value), 0),
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
    <div className={styles.dashboardLayout}>
      <SidebarMenu />
      <div className={styles.mainContent}>
        <div className={styles.transactionSection}>
          <TransactionForm onAddTransaction={handleAddTransaction} userId={Number(userId)} />
          <TransactionList incomes={incomes} expenses={expenses} />
        </div>
        <div className={styles.chartSection}>
          <Chart data={chartData} />
        </div>
      </div>
      {showAlert && <ModalAlert message={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />}
    </div>
  );
};

export default DashboardPage;
