import { useOutletContext } from 'react-router';
import MovieCard from '../components/movie/MovieCard';
import LoadMore from '../components/movie/LoadMore';
import BackToTop from '../components/movie/BackToTop';
import type { MovieListContext } from '../components/layout/AppLayout';

export default function MovieListPage() {
  const {
    movies,
    isLoading,
    error,
    retry,
    hasNextPage,
    loadMore,
    canAutoLoad,
  } = useOutletContext<MovieListContext>();

  const isEmpty =
    movies.length === 0 && !isLoading && !error && !hasNextPage;

  return (
    <>
      {movies.length > 0 && (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}

      {isEmpty && (
        <p className="py-16 text-center text-muted">표시할 영화가 없습니다.</p>
      )}

      <LoadMore
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        error={error}
        onLoadMore={loadMore}
        onRetry={retry}
        canAutoLoad={canAutoLoad}
      />
      <BackToTop />
    </>
  );
}
