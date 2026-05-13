import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store';

// const API_URL = 'http://localhost:7000/api';
const API_URL = 'https://eon-backend-production.up.railway.app/api';

export const http = axios.create({
  baseURL: API_URL,
  timeout: 30_000,
});

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
