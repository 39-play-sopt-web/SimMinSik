import { useState } from 'react';
import type { MovieDetail } from '../../types/movie';

interface MovieOverviewProps {
  movie: MovieDetail;
}

const MOVIE_STATUS: Record<string, string> = {
  Rumored: '제작 논의 중',
  Planned: '제작 예정',
  'In Production': '제작 중',
  'Post Production': '후반 작업 중',
  Released: '개봉',
  Canceled: '제작 취소',
};

export default function MovieOverview({ movie }: MovieOverviewProps) {
  const [posterFailed, setPosterFailed] = useState(false);
  const [backdropFailed, setBackdropFailed] = useState(false);
  const info = [
    { label: '개봉일', value: movie.release_date || '미정' },
    { label: '장르', value: movie.genres.map((genre) => genre.name).join(', ') || '미등록' },
    { label: '평점', value: `${movie.vote_average.toFixed(1)} / 10` },
    { label: '상영 시간', value: movie.runtime ? `${movie.runtime}분` : '미등록' },
    { label: '투표 수', value: `${movie.vote_count.toLocaleString('ko-KR')}명` },
    { label: '상태', value: MOVIE_STATUS[movie.status] ?? movie.status },
  ];

  return (
    <article className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {movie.backdrop_path && !backdropFailed && (
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt=""
          className="aspect-video w-full object-cover"
          onError={() => setBackdropFailed(true)}
        />
      )}
      <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:p-8">
        <div className="aspect-[2/3] w-full max-w-60 overflow-hidden rounded-xl bg-slate-100">
          {movie.poster_path && !posterFailed ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              className="h-full w-full object-cover"
              onError={() => setPosterFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">포스터 준비 중</div>
          )}
        </div>
        <div className="min-w-0">
          <h1 id="movie-detail-title" className="text-3xl font-bold break-keep sm:text-4xl">{movie.title}</h1>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2">
            {info.map(({ label, value }) => (
              <div key={label}>
                <dt className="text-sm text-muted">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <section aria-labelledby="movie-overview-title" className="sm:col-span-2">
          <h2 id="movie-overview-title" className="text-xl font-bold">줄거리</h2>
          <p className="mt-3 leading-8 whitespace-pre-line text-muted">{movie.overview || '등록된 줄거리가 없습니다.'}</p>
        </section>
      </div>
    </article>
  );
}
