import axios from 'axios';
import { verify } from 'crypto';

const API_BASE_URL = 'http://localhost:5000/api/user';

//cadastro
export const register = async (name: string, email: string, password: string, photo: File) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('photo', photo);

    try {
        const response = await axios.post(`${API_BASE_URL}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message);
        } else {
            throw new Error('Erro desconhecido ao registrar usuário');
        }
    }
};


