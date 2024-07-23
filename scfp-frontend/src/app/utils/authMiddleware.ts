import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/auth';

const verifyToken = async (token: string) => {
  try {
    await axios.get(`${API_BASE_URL}/verify`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return true;
  } catch (error) {
    return false;
  }
};

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      verifyToken(token)
        .then((isValid) => {
          setIsAuthenticated(isValid);
          setLoading(false);
        })
        .catch(() => {
          setIsAuthenticated(false);
          setLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  return { isAuthenticated, loading };
}