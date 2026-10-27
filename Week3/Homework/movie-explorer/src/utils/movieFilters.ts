import type { RatingRange } from '../types/movie';

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
