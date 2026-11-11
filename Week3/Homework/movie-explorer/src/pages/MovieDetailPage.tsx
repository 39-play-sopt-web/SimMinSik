import { Link, useLocation, useParams } from 'react-router';
import MovieOverview from '../components/movie/MovieOverview';
import MovieBasicInfo from '../components/movie/MovieBasicInfo';
import { useMovieDetail } from '../hooks/useMovieDetail';

function MovieDetailContent({ movieId }: { movieId: number }) {
  const { movie, isLoading, error, retry } = useMovieDetail(movieId);

  if (isLoading) {
    return (
      <p role="status" className="py-16 text-center text-muted">
        영화 정보를 불러오는 중입니다.
      </p>
    );
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <p role="alert" className="text-red-700">
          {error}
        </p>
        <button
          type="button"
          onClick={retry}
          className="mt-4 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          다시 시도
        </button>
      </div>
    );
  }
  return movie ? (
    <>
      <MovieOverview movie={movie} />
      <MovieBasicInfo movie={movie} />
    </>
  ) : null;
}

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { search } = useLocation();
  const id = Number(movieId);
  const isValidId =
    /^\d+$/.test(movieId ?? '') &&
    Number.isSafeInteger(id) &&
    id > 0 &&
    id <= 2147483647;

  return (
    <section aria-label="영화 상세">
      <Link
        to={{ pathname: '/', search }}
        className="inline-flex rounded text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        ← 목록으로 돌아가기
      </Link>
      {isValidId ? (
        // 다른 영화로 이동하면 이전 상세 상태도 초기화
        <MovieDetailContent key={id} movieId={id} />
      ) : (
        <p role="alert" className="py-16 text-center text-red-700">
          올바른 영화 주소가 아닙니다.
        </p>
      )}
    </section>
  );
}
