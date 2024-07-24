'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/authMiddleware';
import TransactionForm from '../components/transactionForm/TransactionForm';
import TransactionList from '../components/transactionList/TransactionList';
import SidebarMenu from '../components/sidebarMenu/SidebarMenu';
import Chart from '../components/chart/Chart';
import styles from './page.module.css';
import { getIncomes, getExpenses, addIncome, addExpense, deleteIncome, deleteExpense, updateExpense, updateIncome, getCategories } from '../services/fincancesService';
import ModalAlert from '../components/modalAlert/ModalAlert';
import EditTransactionModal from '../components/EditTransactionModal/EditTransactionModal';

const DashboardPage: React.FC = () => {
  const { isAuthenticated, loading, userId } = useAuth();
  const [incomes, setIncomes] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState<any | null>(null);

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

  const handleOpenModal = (transaction: any) => {
    setTransactionToEdit(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTransactionToEdit(null);
  };

  const handleSubmit = async (data: any) => {
    try {
      if (transactionToEdit) {
        // Atualizar a transação existente
        if (transactionToEdit.type === 'income') {
          await updateIncome(transactionToEdit.id, {
            description: data.description,
            amount: data.value,
            categoryId: data.categoryId
          });
          // Atualize a lista de receitas
          const updatedIncomes = await getIncomes(Number(userId));
          setIncomes(Array.isArray(updatedIncomes) ? updatedIncomes : []);
          setAlertMessage('Receita atualizada com sucesso!');
        } else if (transactionToEdit.type === 'expense') {
          await updateExpense(transactionToEdit.id, {
            description: data.description,
            amount: data.value,
            categoryId: data.categoryId
          });
          // Atualize a lista de despesas
          const updatedExpenses = await getExpenses(Number(userId));
          setExpenses(Array.isArray(updatedExpenses) ? updatedExpenses : []);
          setAlertMessage('Despesa atualizada com sucesso!');
        }
        setAlertType('success');
      } else {
        // Se não há uma transação para editar, adicione uma nova
        await handleAddTransaction(data.description, data.value, data.categoryId, data.type);
      }
      setShowAlert(true);
      handleCloseModal();
    } catch (error) {
      console.error(`Erro ao ${transactionToEdit ? 'atualizar' : 'adicionar'} ${data.type === 'income' ? 'receita' : 'despesa'}:`, error);
      setAlertMessage(`Erro ao ${transactionToEdit ? 'atualizar' : 'adicionar'} ${data.type === 'income' ? 'receita' : 'despesa'}.`);
      setAlertType('error');
      setShowAlert(true);
      handleCloseModal();
    }
  };


  useEffect(() => {
    if (isAuthenticated && userId) {
      const fetchData = async () => {
        try {
          const incomeData = await getIncomes(Number(userId));
          const expenseData = await getExpenses(Number(userId));
          const categoryData = await getCategories();
          setIncomes(Array.isArray(incomeData) ? incomeData : []);
          setExpenses(Array.isArray(expenseData) ? expenseData : []);
          setCategories(Array.isArray(categoryData) ? categoryData : []);
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

  const handleDelete = async (id: number, type: 'income' | 'expense') => {
    try {
      if (type === 'income') {
        await deleteIncome(id);
        setIncomes((prevIncomes) => prevIncomes.filter((income) => income.id !== id));
      } else {
        await deleteExpense(id);
        setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
      }
    } catch (error) {
      console.error(`Erro ao excluir ${type === 'income' ? 'receita' : 'despesa'}:`, error);
    }
  };

  const chartData = {
    labels: ['Despesas Fixas', 'Despesas Variáveis', 'Receitas Fixas', 'Receitas Variáveis'],
    datasets: [
      {
        label: 'Despesas',
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
          <TransactionList
            incomes={incomes}
            expenses={expenses}
            onDelete={handleDelete}
            onEdit={handleOpenModal} // Passar a função para abrir o modal
          />
          <EditTransactionModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={handleSubmit}
            transactionToEdit={transactionToEdit}
            categories={categories} 
          />
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
