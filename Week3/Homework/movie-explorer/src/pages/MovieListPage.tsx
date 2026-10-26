import MovieCard from '../components/movie/MovieCard';
import { useMovies } from '../hooks/useMovies';

export default function MovieListPage() {
  const { movies, isLoading, error, retry } = useMovies();

  return (
    <section aria-labelledby="movie-list-title">
      <h1 id="movie-list-title" className="text-3xl font-bold sm:text-4xl">영화 목록</h1>
      <p className="mt-3 text-muted">별점으로 영화를 고르고, 상세 정보를 확인해보세요.</p>
      {isLoading ? (
        <p role="status" className="py-16 text-center text-muted">영화를 불러오는 중입니다.</p>
      ) : error ? (
        <div className="py-16 text-center">
          <p role="alert" className="text-red-700">{error}</p>
          <button type="button" onClick={retry} className="mt-4 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:opacity-90">
            다시 시도
          </button>
        </div>
      ) : movies.length === 0 ? (
        <p role="status" className="py-16 text-center text-muted">표시할 영화가 없습니다.</p>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </ul>
      )}
    </section>
  );
}
