import type { MovieListResponse, RatingRange } from '../types/movie';
import { apiClient } from './client';

export async function getMovies(rating: RatingRange, signal: AbortSignal) {
  if (!import.meta.env.VITE_API_KEY?.trim()) {
    throw new Error('.env에 TMDB API 키를 입력해주세요.');
  }

  const { data } = await apiClient.get<MovieListResponse>('/discover/movie', {
    params: {
      page: 1,
      sort_by: 'popularity.desc',
      include_adult: false,
      'vote_average.gte': rating.min,
      'vote_average.lte': rating.max,
    },
    signal,
  });

  return data;
}
