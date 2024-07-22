"use client";

import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { getIncomes, getExpenses, addIncome, addExpense } from '../services/fincancesService';
import { fetchUserData } from '../utils/authMiddleware'; 
import Chart from '../components/chart';
import styles from './page.module.css';

// Definir o tipo de dados do gráfico
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    fill: boolean;
    borderColor: string;
    backgroundColor?: string[];
  }[];
}

// Lista de categorias para receitas e despesas
const incomeCategories = ['Salário', 'Freelance', 'Investimentos', 'Outros'];
const expenseCategories = ['Aluguel', 'Alimentação', 'Transporte', 'Entretenimento', 'Outros'];

const DashboardPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [type, setType] = useState('income');
  const [category, setCategory] = useState('');
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      fetchUserData(token).then(userData => {
        setUser(userData);
        // Fetch incomes and expenses here
        Promise.all([getIncomes(), getExpenses()]).then(([incomesData, expensesData]) => {
          setIncomes(incomesData);
          setExpenses(expensesData);

          // Prepare chart data
          const incomeTotal = incomesData.reduce((total: number, income: any) => total + parseFloat(income.amount), 0);
          const expenseTotal = expensesData.reduce((total: number, expense: any) => total + parseFloat(expense.amount), 0);

          setChartData({
            labels: ['Total Receitas', 'Total Despesas'],
            datasets: [
              {
                label: 'Valores',
                data: [incomeTotal, expenseTotal],
                fill: false,
                borderColor: 'blue',
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)']
              }
            ]
          });
        });
      }).catch(error => {
        console.error('Erro na autenticação:', error);
        window.location.href = '/login';
      });
    } else {
      alert('Você precisa logar');
      window.location.href = '/login';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { description, amount: value, category };

    try {
        if (type === 'income') {
            await addIncome(data);
        } else if (type === 'expense') {
            await addExpense(data);
        }
        setDescription('');
        setValue('');
        setCategory(''); // Limpa o campo de categoria após o envio

        // Recarregar os dados após adição
        const updatedIncomes = await getIncomes();
        const updatedExpenses = await getExpenses();
        setIncomes(updatedIncomes);
        setExpenses(updatedExpenses);

        const incomeTotal = updatedIncomes.reduce((total: number, income: any) => total + parseFloat(income.amount), 0);
        const expenseTotal = updatedExpenses.reduce((total: number, expense: any) => total + parseFloat(expense.amount), 0);

        setChartData({
          labels: ['Total Receitas', 'Total Despesas'],
          datasets: [
            {
              label: 'Valores',
              data: [incomeTotal, expenseTotal],
              fill: false,
              borderColor: 'blue',
              backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)']
            }
          ]
        });
    } catch (error) {
        console.error('Erro ao adicionar registro:', error);
    }
  };

  const categories = type === 'income' ? incomeCategories : expenseCategories;

  if (!user) {
    return <div className={styles.container}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img src={user.photoUrl} alt="User Photo" className={styles.userPhoto} />
        <h1 className={styles.userName}>{user.name}</h1>
      </header>
      <div className={styles.graphContainer}>
        <Chart data={chartData} /> {/* Usa o componente Chart */}
      </div>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
          className={styles.input}
        />
        <div className={styles.radioContainer}>
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
        <select value={category} onChange={(e) => setCategory(e.target.value)} required className={styles.input}>
          <option value="">Selecione uma categoria</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className={styles.submitButton}>Adicionar</button>
      </form>
    </div>
  );
};

export default DashboardPage;
