import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const getAuthToken = () => {
  return localStorage.getItem('authToken'); 
};

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export const getIncomes = async (userId: number) => {
  try {
    const response = await axiosInstance.get('/income', {
      params: { userId },
    });
    return response.data;
  } catch (error) {
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
    return [];
  }
};

export const addIncome = async (income: { description: string; amount: number; categoryId: number; userId: number }) => {
  try {
    await axiosInstance.post('/income', income);
  } catch (error) {
  }
};

export const addExpense = async (expense: { description: string; amount: number; categoryId: number; userId: number }) => {
  try {
    await axiosInstance.post('/expense', expense);
  } catch (error) {
  }
};

export const updateIncome = async (id: number, data: { description?: string; amount?: number; categoryId?: number; }) => {
  try {
    await axiosInstance.put(`/income/${id}`, data);
  } catch (error) {
  }
};

export const updateExpense = async (id: number, data: { description?: string; amount?: number; categoryId?: number; }) => {
  try {
    await axiosInstance.put(`/expense/${id}`, data);
  } catch (error) {
  }
};

export const deleteIncome = async (id: number) => {
  try {
    await axiosInstance.delete(`/income/${id}`);
  } catch (error) {
  }
};

export const deleteExpense = async (id: number) => {
  try {
    await axiosInstance.delete(`/expense/${id}`);
  } catch (error) {
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/category');
    return response.data;
  } catch (error) {
    return [];
  }
};
