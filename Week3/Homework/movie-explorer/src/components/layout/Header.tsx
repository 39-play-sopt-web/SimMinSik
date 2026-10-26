import { Link, NavLink } from 'react-router';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <Link
          to="/"
          className="rounded text-xl font-bold text-accent focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          영화 탐색
        </Link>
        <nav aria-label="메인 메뉴">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (
              `rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                isActive ? 'bg-indigo-50 text-accent' : 'text-muted hover:bg-slate-100'
              }`
            )}
          >
            영화 목록
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
