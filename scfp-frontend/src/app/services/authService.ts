import axios from 'axios';

const AUTH_API_BASE_URL = 'http://localhost:5000/api/auth';

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
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Erro desconhecido');
    } else {
      throw new Error('Erro desconhecido ao logar usuário');
    }
  }
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const getUserInfo = (): { name: string; photo: string } | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
