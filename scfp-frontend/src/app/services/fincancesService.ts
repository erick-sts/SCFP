import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Substitua pelo URL correto da sua API

const getToken = () => {
  return localStorage.getItem('authToken');
};

export const getIncomes = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/income`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const getExpenses = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/expense`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const addIncome = async (data: any) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/income`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};

export const addExpense = async (data: any) => {
  const token = getToken();
  const response = await axios.post(`${API_BASE_URL}/expense`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.data;
};
