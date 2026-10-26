import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMovieDetail } from '../api/movies';
import type { MovieDetail } from '../types/movie';

export function useMovieDetail(movieId: number) {
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovie() {
      try {
        const data = await getMovieDetail(movieId, controller.signal);
        if (!controller.signal.aborted) setMovie(data);
      } catch (error: unknown) {
        if (controller.signal.aborted) return;

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            setError('해당 영화를 찾을 수 없습니다.');
          } else if (error.response?.status === 401) {
            setError('TMDB API 키를 확인해주세요.');
          } else {
            setError('영화 정보를 불러오지 못했습니다. 다시 시도해주세요.');
          }
        } else {
          setError(error instanceof Error ? error.message : '영화 정보를 불러오지 못했습니다.');
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    }

    void loadMovie();
    return () => controller.abort();
  }, [movieId, retryCount]);

  function retry() {
    setError('');
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  return { movie, isLoading, error, retry };
}
