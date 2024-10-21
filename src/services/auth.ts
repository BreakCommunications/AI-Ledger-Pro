import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Update this with your actual API URL

export interface User {
  id: string;
  email: string;
  companyName: string;
  kvkNumber: string;
  vatNumber: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  companyName: string;
  kvkNumber: string;
  vatNumber: string;
}

const authService = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  register: async (data: RegisterData): Promise<User> => {
    const response = await axios.post(`${API_URL}/register`, data);
    localStorage.setItem('token', response.data.token);
    return response.data.user;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  }
};

export default authService;