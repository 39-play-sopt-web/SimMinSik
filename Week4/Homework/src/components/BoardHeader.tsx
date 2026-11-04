import { Link } from 'react-router';
import { getAuthorizationCode } from '../lib/authStorage';

export function BoardHeader() {
  const isAuthorized = Boolean(getAuthorizationCode());

  return (
    <header className="border-b border-line/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link className="text-base font-bold tracking-tight" to="/">
          PLAY SOPT <span className="text-accent">BOARD</span>
        </Link>
        <nav className="flex items-center gap-3" aria-label="게시판 메뉴">
          <Link className="text-xs text-muted transition-colors hover:text-accent" to="/auth">
            {isAuthorized ? '회원 코드 재발급' : '회원 코드 발급'}
          </Link>
          <Link className="button-primary" to="/posts/new">글쓰기</Link>
        </nav>
      </div>
    </header>
  );
}
