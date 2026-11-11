import { useSearchParams } from 'react-router';
import type { MovieSort, RatingRange } from '../types/movie';
import { readRating, readSort } from '../utils/movieFilters';

export function useMovieFilters() {
  const [params, setParams] = useSearchParams();
  const rating = readRating(params);
  const sort = readSort(params);
  const query = params.get('q')?.trim() ?? '';
  const { min, max } = rating;

  function changeRating(nextRating: RatingRange) {
    if (nextRating.min === min && nextRating.max === max) return;
    const nextParams = new URLSearchParams(params);
    if (nextRating.min === 0) nextParams.delete('min');
    else nextParams.set('min', String(nextRating.min));
    if (nextRating.max === 10) nextParams.delete('max');
    else nextParams.set('max', String(nextRating.max));
    setParams(nextParams);
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

  return {
    rating,
    sort,
    query,
    changeRating,
    changeSort,
    changeQuery,
  };
}
