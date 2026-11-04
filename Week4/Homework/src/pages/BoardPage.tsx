import { useState } from 'react';
import { Link } from 'react-router';
import { PostList } from '../components/posts/PostList';
import { PostSearch } from '../components/posts/PostSearch';
import { getAuthorizationCode } from '../lib/authStorage';

export function BoardPage() {
  const [keyword, setKeyword] = useState('');
  const isAuthorized = Boolean(getAuthorizationCode());

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <p className="mb-3 text-sm text-purple-700">SOPT · WEEK 4</p>
      <h1 className="text-3xl font-bold">심민식 게시판</h1>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        {isAuthorized && (
          <p className="text-sm text-purple-700">회원 코드가 등록되었습니다.</p>
        )}
        <Link className="underline" to="/auth">
          {isAuthorized ? '회원 코드 재발급' : '회원 코드 발급'}
        </Link>
        <Link className="rounded-lg bg-purple-700 px-4 py-2 text-white transition-colors hover:bg-purple-900" to="/posts/new">
          글쓰기
        </Link>
      </div>
      <PostSearch onSearch={setKeyword} />
      <PostList keyword={keyword} />
    </main>
  );
}
