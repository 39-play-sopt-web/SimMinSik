import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'ko-KR',
  },
});
