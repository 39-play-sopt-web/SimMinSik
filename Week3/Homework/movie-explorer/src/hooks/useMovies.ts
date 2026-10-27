import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import { getMovies } from '../api/movies';
import type { Movie, MovieSort, RatingRange } from '../types/movie';

export function useMovies(rating: RatingRange, sort: MovieSort, query: string) {
  const [params, setParams] = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [retryCount, setRetryCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [canAutoLoad, setCanAutoLoad] = useState(true);
  const isRequesting = useRef(true);
  const { min, max } = rating;
  const hasNextPage = page < totalPages;

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      try {
        const data = await getMovies({ rating: { min, max }, page, sort, query }, controller.signal);
        if (!controller.signal.aborted) {
          // API 응답에 범위 밖 평점이 포함되는 경우도 제외
          const nextMovies = data.results.filter((movie) => movie.vote_average >= min && movie.vote_average <= max);
          // 빈 페이지를 연속으로 자동 조회하지 않도록 버튼으로 전환
          setCanAutoLoad(nextMovies.length > 0);
          setMovies((previous) => {
            if (page === 1) return nextMovies;
            const movieMap = new Map(previous.map((movie) => [movie.id, movie]));
            nextMovies.forEach((movie) => movieMap.set(movie.id, movie));
            return [...movieMap.values()];
          });
          // TMDB는 최대 500페이지까지 조회 가능
          setTotalPages(Math.min(data.total_pages, 500));
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
        if (!controller.signal.aborted) {
          isRequesting.current = false;
          setIsLoading(false);
        }
      }
    }

    void loadMovies();
    // 필터가 바뀌거나 페이지를 떠나면 이전 요청 취소
    return () => controller.abort();
  }, [retryCount, min, max, page, sort, query]);

  function changeRating(nextRating: RatingRange) {
    if (nextRating.min === min && nextRating.max === max) return;
    const nextParams = new URLSearchParams(params);
    if (nextRating.min === 0) nextParams.delete('min');
    else nextParams.set('min', String(nextRating.min));
    if (nextRating.max === 10) nextParams.delete('max');
    else nextParams.set('max', String(nextRating.max));
    setParams(nextParams);
  }

  function retry() {
    if (isRequesting.current) return;
    isRequesting.current = true;
    setError('');
    setIsLoading(true);
    setRetryCount((count) => count + 1);
  }

  function changeSort(nextSort: MovieSort) {
    if (nextSort === sort) return;
    const nextParams = new URLSearchParams(params);
    if (nextSort === 'popularity.desc') nextParams.delete('sort');
    else nextParams.set('sort', nextSort);
    setParams(nextParams);
  }

  function changeQuery(value: string) {
    const nextQuery = value.trim();
    if (nextQuery === query) return;
    const nextParams = new URLSearchParams(params);
    if (nextQuery) nextParams.set('q', nextQuery);
    else nextParams.delete('q');
    setParams(nextParams);
  }

  const loadMore = useCallback(() => {
    if (isRequesting.current || error || !hasNextPage) return;
    // 렌더링 전에 감지가 반복되어도 한 번만 요청
    isRequesting.current = true;
    setIsLoading(true);
    setPage((previous) => previous + 1);
  }, [error, hasNextPage]);

  return { movies, isLoading, error, retry, rating, changeRating, hasNextPage, loadMore, sort, changeSort, query, changeQuery, canAutoLoad };
}
