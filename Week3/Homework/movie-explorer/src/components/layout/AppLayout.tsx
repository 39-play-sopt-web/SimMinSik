import { Outlet, ScrollRestoration } from 'react-router';
import Header from './Header';
import { useMovies } from '../../hooks/useMovies';

export default function AppLayout() {
  // 상세로 이동해도 목록 데이터와 필터 유지
  const movieList = useMovies();
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
      <ScrollRestoration getKey={(location) => location.pathname + location.search} />
    </div>
  );
}
