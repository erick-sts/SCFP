import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';


//login
export const login = async (email: string, password: string) => {
    const data = {
        email: email,
        password: password
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        localStorage.setItem('authToken', response.data.token);
        console.log("token:" + response.data.token)
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        } else {
            throw new Error('Erro desconhecido ao logar usuário');
        }
    }
};