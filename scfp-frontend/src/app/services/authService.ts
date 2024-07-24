import axios from 'axios';

// Base URL para a API de autenticação
const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth';

// Função para login
export const login = async (email: string, password: string) => {
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(`${AUTH_API_BASE_URL}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    localStorage.setItem('authToken', response.data.token);
    console.log("Token:", response.data.token);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido');
    } else {
      throw new Error('Erro desconhecido ao logar usuário');
    }
  }
};

// Função para obter o token do localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken'); // Certifique-se de usar a mesma chave para obter o token
};
