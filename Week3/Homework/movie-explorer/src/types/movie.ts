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

export interface MovieDetail extends Movie {
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  runtime: number | null;
  vote_count: number;
  status: string;
}
