export interface User {
    name: string;
    photoUrl: string;
  }

export interface Transaction {
  id: number;
  description: string;
  value: number;
  type: 'income' | 'expense';
  category: {
    id: number;
    name: string;
  };
}