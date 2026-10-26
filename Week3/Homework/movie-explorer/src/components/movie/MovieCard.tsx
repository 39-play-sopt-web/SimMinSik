import { useState } from 'react';
import { Link } from 'react-router';
import type { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <li>
      <Link
        to={`/movies/${movie.id}`}
        className="group block h-full overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-reduce:transform-none motion-reduce:transition-none"
      >
        <div className="aspect-[2/3] overflow-hidden bg-slate-100">
          {movie.poster_path && !hasImageError ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={`${movie.title} 포스터`}
              loading="lazy"
              className="h-full w-full object-cover"
              onError={() => setHasImageError(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-muted">포스터 준비 중</div>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold group-hover:text-accent">{movie.title}</h2>
          <div className="mt-2 flex flex-wrap justify-between gap-2 text-sm text-muted">
            <span>{movie.release_date || '개봉일 미정'}</span>
            <span>평점 {movie.vote_average.toFixed(1)}</span>
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted">
            {movie.overview || '등록된 줄거리가 없습니다.'}
          </p>
        </div>
      </Link>
    </li>
  );
}
