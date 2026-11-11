import { Outlet, ScrollRestoration, useMatch } from 'react-router';
import Header from './Header';
import MovieSearch from '../movie/MovieSearch';
import RatingFilter from '../movie/RatingFilter';
import SortSelect from '../movie/SortSelect';
import { useMovies } from '../../hooks/useMovies';
import { useMovieFilters } from '../../hooks/useMovieFilters';

export type MovieListContext = ReturnType<typeof useMovies>;

type MovieFilters = ReturnType<typeof useMovieFilters>;

function MovieListOutlet({ rating, sort, query }: Pick<MovieFilters, 'rating' | 'sort' | 'query'>) {
  // 상세로 이동해도 같은 조회 조건이면 목록 데이터를 유지한다.
  const movieList = useMovies(rating, sort, query);

  return <Outlet context={movieList} />;
}

export default function AppLayout() {
  const isMovieList = useMatch('/');
  const { rating, sort, query, changeRating, changeSort, changeQuery } = useMovieFilters();
  const listKey = JSON.stringify([rating.min, rating.max, sort, query]);

  return (
    <div className="min-h-screen bg-page text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-white focus:p-3"
      >
        본문으로 이동
      </a>
      <Header />
      <main id="main-content" className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
        {isMovieList && (
          <>
            <h1 id="movie-list-title" tabIndex={-1} className="text-3xl font-bold sm:text-4xl">
              영화 목록
            </h1>
            <p className="mt-3 text-muted">
              별점으로 영화를 고르고, 상세 정보를 확인해보세요.
            </p>

            <MovieSearch query={query} onSearch={changeQuery} />
            <RatingFilter rating={rating} onChange={changeRating} />
            <SortSelect sort={sort} onChange={changeSort} isSearching={Boolean(query)} />
          </>
        )}
        {/* 조회 조건이 바뀌면 누적 목록부터 다시 불러온다. */}
        <MovieListOutlet key={listKey} rating={rating} sort={sort} query={query} />
      </main>
      <ScrollRestoration getKey={(location) => location.pathname + location.search} />
    </div>
  );
}
