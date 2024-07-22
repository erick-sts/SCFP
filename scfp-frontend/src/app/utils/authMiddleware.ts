export async function fetchUserData(token: string) {
    const response = await fetch('http://localhost:5000/api/auth/verify', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Falha na autenticação');
    }
  
    const data = await response.json();
    return data;
  }
  