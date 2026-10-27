import MovieCard from '../components/movie/MovieCard';
import RatingFilter from '../components/movie/RatingFilter';
import LoadMore from '../components/movie/LoadMore';
import BackToTop from '../components/movie/BackToTop';
import SortSelect from '../components/movie/SortSelect';
import MovieSearch from '../components/movie/MovieSearch';
import { useOutletContext } from 'react-router';
import type { useMovies } from '../hooks/useMovies';

export default function MovieListPage() {
  const { movies, isLoading, error, retry, rating, changeRating, hasNextPage, loadMore, sort, changeSort, query, changeQuery, canAutoLoad } = useOutletContext<ReturnType<typeof useMovies>>();

  return (
    <section aria-labelledby="movie-list-title">
      <h1 id="movie-list-title" tabIndex={-1} className="text-3xl font-bold sm:text-4xl">영화 목록</h1>
      <p className="mt-3 text-muted">별점으로 영화를 고르고, 상세 정보를 확인해보세요.</p>
      <MovieSearch query={query} onSearch={changeQuery} />
      <RatingFilter rating={rating} onChange={changeRating} />
      <SortSelect sort={sort} onChange={changeSort} isSearching={Boolean(query)} />
      {movies.length > 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </ul>
      ) : !isLoading && !error && !hasNextPage ? (
        <p className="py-16 text-center text-muted">표시할 영화가 없습니다.</p>
      ) : null}
      <LoadMore isLoading={isLoading} hasNextPage={hasNextPage} error={error} onLoadMore={loadMore} onRetry={retry} canAutoLoad={canAutoLoad} />
      <BackToTop />
    </section>
  );
}
