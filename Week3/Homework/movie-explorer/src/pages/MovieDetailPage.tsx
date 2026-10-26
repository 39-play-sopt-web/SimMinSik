import { Link, useParams } from 'react-router';

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  return (
    <section aria-labelledby="movie-detail-title">
      <Link
        to="/"
        className="inline-flex rounded text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
      >
        ← 목록으로 돌아가기
      </Link>
      <h1 id="movie-detail-title" className="mt-6 text-3xl font-bold sm:text-4xl">영화 상세</h1>
      <p className="mt-3 text-muted">현재 영화 ID: {movieId}</p>
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-muted">이 ID를 사용해 영화 상세 정보를 조회할 예정입니다.</p>
      </div>
    </section>
  );
}
