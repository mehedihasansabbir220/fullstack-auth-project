// frontend/src/services/authService.ts
import axios from 'axios';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  async register(credentials: RegisterCredentials) {
    const response = await axios.post(`${API_URL}/auth/register`, credentials);
    return response.data;
  },

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};
