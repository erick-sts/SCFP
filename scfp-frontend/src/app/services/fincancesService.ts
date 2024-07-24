//controlzzzz

import axios from 'axios';

// Base URL para a API
const API_BASE_URL = 'http://localhost:5000/api';

// Função para obter o token do localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken'); // Ajustado para 'authToken'
};

// Criação da instância do axios com configuração base
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token ao cabeçalho das requisições
axiosInstance.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Funções para operações com a API
export const getIncomes = async (userId: number) => {
  try {
    const response = await axiosInstance.get('/income', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar receitas:', error);
    return [];
  }
};

export const getExpenses = async (userId: number) => {
  try {
    const response = await axiosInstance.get('/expense', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar despesas:', error);
    return [];
  }
};

export const addIncome = async (income: { description: string; amount: number; categoryId: number; userId: number }) => {
  try {
    await axiosInstance.post('/income', income);
  } catch (error) {
    console.error('Erro ao adicionar receita:', error);
  }
};

export const addExpense = async (expense: { description: string; amount: number; categoryId: number; userId: number }) => {
  try {
    await axiosInstance.post('/expense', expense);
  } catch (error) {
    console.error('Erro ao adicionar despesa:', error);
  }
};


export const updateIncome = async (id: number, data: { description?: string; amount?: number; categoryId?: number; }) => {
  try {
    await axiosInstance.put(`/income/${id}`, data);
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
  }
};

export const updateExpense = async (id: number, data: { description?: string; amount?: number; categoryId?: number; }) => {
  try {
    await axiosInstance.put(`/expense/${id}`, data);
  } catch (error) {
    console.error('Erro ao atualizar despesa:', error);
  }
};


export const deleteIncome = async (id: number) => {
  try {
    await axiosInstance.delete(`/income/${id}`);
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
  }
};

export const deleteExpense = async (id: number) => {
  try {
    await axiosInstance.delete(`/expense/${id}`);
  } catch (error) {
    console.error('Erro ao excluir despesa:', error);
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/category');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }
};
