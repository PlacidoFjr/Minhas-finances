import axios from 'axios';

// URL da API
// 1. Usa variável de ambiente se configurada (Vercel)
// 2. Senão, usa localhost para desenvolvimento
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    // Log de erros 404 para debug
    if (error.response?.status === 404) {
      console.error('Rota não encontrada:', error.config?.url);
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
};

// Transactions API
export const transactionsAPI = {
  getAll: (params?: any) => api.get('/transactions', { params }),
  create: (data: any) => api.post('/transactions', data),
  update: (id: number, data: any) => api.put(`/transactions/${id}`, data),
  delete: (id: number) => api.delete(`/transactions/${id}`),
  getSummary: (params?: any) => api.get('/transactions/summary', { params }),
  getCategories: (params?: any) => api.get('/transactions/categories', { params }),
};

export default api;