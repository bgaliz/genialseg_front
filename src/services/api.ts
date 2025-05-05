import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      window.location.href = '/home';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Não autorizado. Redirecionando para login...');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;