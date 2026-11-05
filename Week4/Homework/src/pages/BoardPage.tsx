import { useSearchParams } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';
import { PostList } from '../components/posts/PostList';
import { PostSearch } from '../components/posts/PostSearch';

export function BoardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword')?.trim() ?? '';

  function handleSearch(nextKeyword: string) {
    setSearchParams(nextKeyword ? { keyword: nextKeyword } : {});
  }

  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-10 sm:py-12">
        <h1 className="text-2xl font-bold tracking-tight">게시판</h1>
        <PostSearch key={keyword} initialKeyword={keyword} onSearch={handleSearch} />
        <PostList keyword={keyword} />
      </main>
    </>
  );
}
