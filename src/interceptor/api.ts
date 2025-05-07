import axios from 'axios';
import { toast } from 'react-toastify';

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Erro na requisição:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Erro na resposta da API:', error.response.data.message);
      toast.error(error.response.data.error)
      if (error.response.status === 401 && error.response.data.message === "Token inválido") {
        localStorage.removeItem('token');
        window.location.href = "/login"
      }
    } else if (error.request) {
      console.error('Nenhuma resposta recebida:', error.request);
    } else {
      console.error('Erro ao configurar a requisição:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;