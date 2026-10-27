export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface RatingRange {
  min: number;
  max: number;
}

export type MovieSort =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'primary_release_date.desc';

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number | null;
  vote_count: number;
  status: string;
  original_title: string;
  original_language: string;
  production_countries: { iso_3166_1: string; name: string }[];
  spoken_languages: {
    iso_639_1: string;
    name: string;
    english_name: string;
  }[];
  budget: number;
  revenue: number;
}
