import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY?.trim();

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  params: {
    api_key: apiKey,
    language: 'ko-KR',
  },
});

apiClient.interceptors.request.use((config) => {
  if (!apiKey) {
    throw new Error('.env에 TMDB API 키를 입력해주세요.');
  }
  return config;
});

apiClient.interceptors.response.use(undefined, (error: unknown) => {
  if (axios.isAxiosError(error) && error.response?.status === 401) {
    throw new Error('TMDB API 키를 확인해주세요.');
  }
  throw error;
});
