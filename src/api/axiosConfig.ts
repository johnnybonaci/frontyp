import axios from 'axios';
import config from 'src/config.tsx';

const api = axios.create({
  baseURL: config.api.msAuth.baseUrl,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
  },
});

export default api;
