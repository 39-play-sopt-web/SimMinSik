import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMovies } from '../api/movies';
import type { Movie } from '../types/movie';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      try {
        const data = await getMovies(controller.signal);
        if (!controller.signal.aborted) setMovies(data.results);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        if (axios.isAxiosError(error)) {
          setError(error.response?.status === 401
            ? 'TMDB API 키를 확인해주세요.'
            : '영화 목록을 불러오지 못했습니다. 다시 시도해주세요.');
        } else {
          setError(error instanceof Error ? error.message : '영화 목록을 불러오지 못했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadMovies();
    // 페이지를 떠나면 요청도 취소
    return () => controller.abort();
  }, [retryCount]);

  function retry() {
    setError('');
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  return { movies, isLoading, error, retry };
}
