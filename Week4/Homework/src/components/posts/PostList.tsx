import { usePosts } from '../../hooks/usePosts';
import { PostCard } from './PostCard';

interface PostListProps {
  keyword: string;
}

export function PostList({ keyword }: PostListProps) {
  const { data, isPending, isError, isFetching, refetch } = usePosts(keyword);
  const posts = data?.posts ?? [];

  return () => observer.disconnect();
  }, [hasNextPage, isFetching, isError, fetchNextPage]);

  return (
    <section className="mt-8" aria-labelledby="post-list-title" aria-busy={isFetching}>
      <h2 className="mb-4 text-xl font-semibold" id="post-list-title">
        {keyword ? `“${keyword}” 검색 결과` : '전체 게시글'}
      </h2>

      {isPending && <p role="status">게시글을 불러오는 중입니다.</p>}

      {isError && (
        <div className="mb-4 rounded-lg bg-red-50 p-4" role="alert">
          <p>게시글을 불러오지 못했습니다. 다시 시도해 주세요.</p>
          <button
            className="mt-2 underline disabled:opacity-40"
            type="button"
            onClick={() => { void refetch(); }}
            disabled={isFetching}
          >
            다시 시도
          </button>
        </div>
      )}

      {data && posts.length === 0 && (
        <p className="text-slate-600">
          {keyword ? '검색 결과가 없습니다.' : '아직 등록된 게시글이 없습니다.'}
        </p>
      )}

      {posts.length > 0 && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}

    </section>
  );
}
