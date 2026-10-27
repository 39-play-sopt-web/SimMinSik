import { Outlet, ScrollRestoration, useSearchParams } from 'react-router';
import Header from './Header';
import { useMovies } from '../../hooks/useMovies';
import { readRating, readSort } from '../../utils/movieFilters';
import type { MovieSort, RatingRange } from '../../types/movie';

function MovieListLayout({ rating, sort, query }: { rating: RatingRange; sort: MovieSort; query: string }) {
  // 상세로 이동해도 목록 데이터와 필터 유지
  const movieList = useMovies(rating, sort, query);
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
        {/* 주소에 맞는 페이지가 공통 레이아웃 안에 표시됨 */}
        <Outlet context={movieList} />
      </main>
    </div>
  );
}

export default function AppLayout() {
  const [params] = useSearchParams();
  const rating = readRating(params);
  const sort = readSort(params);
  const query = params.get('q')?.trim() ?? '';

  return (
    <>
      {/* 조회 조건이 바뀔 때만 누적 목록 초기화 */}
      <MovieListLayout key={JSON.stringify([rating.min, rating.max, sort, query])} rating={rating} sort={sort} query={query} />
      <ScrollRestoration getKey={(location) => location.pathname + location.search} />
    </>
  );
}
