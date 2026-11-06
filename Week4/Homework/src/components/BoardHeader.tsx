import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { clearAuthorization, getAuthorizationCode, getMemberPart } from '../lib/authStorage';

export function BoardHeader() {
  const isAuthorized = Boolean(getAuthorizationCode());
  const part = getMemberPart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  async function handleLogout() {
    clearAuthorization();
    await queryClient.cancelQueries();
    queryClient.clear();
    await navigate('/auth', { replace: true });
  }

  return (
    <header className="border-b border-line/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link className="text-base font-bold tracking-tight" to="/">
          {part ?? (isAuthorized ? '파트 미등록' : 'PLAY SOPT')} <span className="text-accent">BOARD</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-3" aria-label="게시판 메뉴">
          <Link className="text-xs text-muted transition-colors hover:text-accent" to="/">
            게시글 목록
          </Link>
          <Link className="text-xs text-muted transition-colors hover:text-accent" to="/auth">
            {isAuthorized ? '회원 코드 재발급' : '회원 코드 발급'}
          </Link>
          <Link className="button-primary" to="/posts/new">글쓰기</Link>
          {isAuthorized && (
            <button className="button-secondary" type="button" onClick={handleLogout}>
              로그아웃
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
