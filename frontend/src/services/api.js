import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getDashboardStats = async () => {
  const response = await api.get('/dashboard');
  return response.data;
};

export const getFilters = async () => {
  const response = await api.get('/filters');
  return response.data;
};

export const getInsights = async (params = {}) => {
  const response = await api.get('/data', { params });
  return response.data;
};

export const getChartData = async (field, params = {}) => {
  const response = await api.get(`/charts/${field}`, { params });
  return response.data;
};

export default api;
