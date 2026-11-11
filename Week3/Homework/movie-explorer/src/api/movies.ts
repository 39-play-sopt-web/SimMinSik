import type {
  MovieDetail,
  MovieListResponse,
  MovieSort,
  RatingRange,
} from '../types/movie';
import { apiClient } from './client';

interface MovieQuery {
  rating: RatingRange;
  page: number;
  sort: MovieSort;
  query: string;
}

export async function getMovies(
  { rating, page, sort, query }: MovieQuery,
  signal: AbortSignal,
) {
  const endpoint = query ? '/search/movie' : '/discover/movie';
  const params = query
    ? { page, query, include_adult: false }
    : {
        page,
        sort_by: sort,
        include_adult: false,
        'vote_average.gte': rating.min,
        'vote_average.lte': rating.max,
      };

  const { data } = await apiClient.get<MovieListResponse>(endpoint, {
    params,
    signal,
  });

  return data;
}

export async function getMovieDetail(movieId: number, signal: AbortSignal) {
  const { data } = await apiClient.get<MovieDetail>(`/movie/${movieId}`, { signal });
  return data;
}
