import { useState } from 'react';
import { BoardHeader } from '../components/BoardHeader';
import { PostList } from '../components/posts/PostList';
import { PostSearch } from '../components/posts/PostSearch';

export function BoardPage() {
  const [keyword, setKeyword] = useState('');

  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-12">
        <h1 className="text-2xl font-bold tracking-tight">게시판</h1>
        <PostSearch onSearch={setKeyword} />
        <PostList keyword={keyword} />
      </main>
    </>
  );
}
