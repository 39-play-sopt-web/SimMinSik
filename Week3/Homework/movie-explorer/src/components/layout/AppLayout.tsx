import { Outlet } from 'react-router';
import Header from './Header';

export default function AppLayout() {
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
        <Outlet />
      </main>
    </div>
  );
}
