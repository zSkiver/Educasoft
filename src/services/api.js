import axios from 'axios';

// Define a URL base da API backend
// Use o endereço IP local ou 'localhost' se o backend estiver rodando na mesma máquina
// Use o endereço IP/nome do contêiner se estiver usando Docker
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para lidar com erros (opcional, mas útil)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log do erro ou tratamento específico
    console.error('Erro na chamada da API:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;

