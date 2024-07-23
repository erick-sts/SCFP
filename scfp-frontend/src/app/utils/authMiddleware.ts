import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

const verifyToken = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data; // Assumindo que a resposta inclui userId como string
  } catch (error) {
    return null;
  }
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      verifyToken(token)
        .then((data) => {
          if (data) {
            setIsAuthenticated(true);
            setUserId(data.userId); // Assumindo que userId é uma string na resposta
          } else {
            setIsAuthenticated(false);
            setUserId(null);
          }
          setLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setUserId(null);
          setLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setUserId(null);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading, userId };
}
