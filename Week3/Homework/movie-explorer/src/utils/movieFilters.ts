import type { MovieSort, RatingRange } from '../types/movie';

export const SORT_OPTIONS: { value: MovieSort; label: string }[] = [
  { value: 'popularity.desc', label: '인기순' },
  { value: 'vote_average.desc', label: '평점순' },
  { value: 'primary_release_date.desc', label: '개봉일 최신순' },
];

export function readSort(params: URLSearchParams): MovieSort {
  const selectedSort = params.get('sort');
  const option = SORT_OPTIONS.find((option) => option.value === selectedSort);
  return option?.value ?? 'popularity.desc';
}

export function readRating(params: URLSearchParams): RatingRange {
  function readScore(name: string, fallback: number) {
    const value = params.get(name);
    if (value === null || !/^\d+$/.test(value)) return fallback;
    const score = Number(value);
    return score >= 0 && score <= 10 ? score : fallback;
  }

  const min = readScore('min', 0);
  const max = readScore('max', 10);
  return min <= max ? { min, max } : { min: 0, max: 10 };
}
