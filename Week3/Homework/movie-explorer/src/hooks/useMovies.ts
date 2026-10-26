import axios from 'axios';
import { useEffect, useState } from 'react';
import { getMovies } from '../api/movies';
import type { Movie, RatingRange } from '../types/movie';

export function useMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [rating, setRating] = useState<RatingRange>({ min: 0, max: 10 });
  const { min, max } = rating;

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      try {
        const data = await getMovies({ min, max }, controller.signal);
        if (!controller.signal.aborted) {
          // API 응답에 범위 밖 평점이 포함되는 경우도 제외
          setMovies(data.results.filter((movie) => movie.vote_average >= min && movie.vote_average <= max));
        }
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
    // 필터가 바뀌거나 페이지를 떠나면 이전 요청 취소
    return () => controller.abort();
  }, [retryCount, min, max]);

  function changeRating(nextRating: RatingRange) {
    if (nextRating.min === min && nextRating.max === max) return;
    setError('');
    setIsLoading(true);
    setRating(nextRating);
  }

  function retry() {
    setError('');
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  return { movies, isLoading, error, retry, rating, changeRating };
}
