import { useEffect, useRef } from 'react';
import { usePosts } from '../../hooks/usePosts';
import { PostCard } from './PostCard';

interface PostListProps {
  keyword: string;
}

export function PostList({ keyword }: PostListProps) {
  const {
    data,
    isPending,
    isError,
    isFetching,
    isFetchingNextPage,
    isFetchNextPageError,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = usePosts(keyword);
  const bottomRef = useRef<HTMLDivElement>(null);
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    const target = bottomRef.current;
    if (!target || !hasNextPage || isFetching || isError) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      // 같은 감지에서 요청이 반복되지 않도록 먼저 관찰 중단
      observer.disconnect();
      void fetchNextPage({ cancelRefetch: false });
    }, { rootMargin: '200px' });

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasNextPage, isFetching, isError, fetchNextPage]);

  return (
    <section className="mt-6" aria-labelledby="post-list-title" aria-busy={isFetching}>
      <h2 className={keyword ? 'mb-4 text-sm text-muted' : 'sr-only'} id="post-list-title">
        {keyword ? `“${keyword}” 검색 결과` : '전체 게시글'}
      </h2>

      {isPending && <p role="status">게시글을 불러오는 중입니다.</p>}

      {isError && (
        <div className="mb-4 rounded-lg border border-red-400/30 bg-red-400/10 p-4 text-sm text-red-200" role="alert">
          <p>
            {isFetchNextPageError
              ? '다음 게시글을 불러오지 못했습니다. 기존 목록은 그대로 유지됩니다.'
              : '게시글을 불러오지 못했습니다. 다시 시도해 주세요.'}
          </p>
          <button
            className="mt-2 underline disabled:opacity-40"
            type="button"
            onClick={() => {
              if (isFetchNextPageError) {
                void fetchNextPage({ cancelRefetch: false });
              } else {
                void refetch();
              }
            }}
            disabled={isFetching}
          >
            다시 시도
          </button>
        </div>
      )}

      {data && posts.length === 0 && (
        <p className="py-12 text-center text-sm text-muted">
          {keyword ? '검색 결과가 없습니다.' : '아직 등록된 게시글이 없습니다.'}
        </p>
      )}

      {posts.length > 0 && (
        <ul className="grid gap-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      )}

      {hasNextPage && !isError && (
        <div className="mt-6 text-center" ref={bottomRef}>
          <button
            className="button-secondary"
            type="button"
            onClick={() => { void fetchNextPage({ cancelRefetch: false }); }}
            disabled={isFetching}
          >
            {isFetchingNextPage ? '더 불러오는 중...' : '게시글 더 보기'}
          </button>
        </div>
      )}

      {data && !hasNextPage && posts.length > 0 && (
        <p className="mt-6 text-center text-xs text-muted">마지막 게시글입니다.</p>
      )}
    </section>
  );
}
