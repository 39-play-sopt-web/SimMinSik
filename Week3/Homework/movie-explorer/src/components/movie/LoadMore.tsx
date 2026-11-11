import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

interface LoadMoreProps {
  isLoading: boolean;
  hasNextPage: boolean;
  error: string;
  onLoadMore: () => void;
  onRetry: () => void;
  canAutoLoad: boolean;
}

export default function LoadMore({
  isLoading,
  hasNextPage,
  error,
  onLoadMore,
  onRetry,
  canAutoLoad,
}: LoadMoreProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || error || !hasNextPage || !canAutoLoad || !triggerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) onLoadMore();
      },
      { rootMargin: '300px' },
    );

    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [isLoading, error, hasNextPage, onLoadMore, canAutoLoad]);

  let content: ReactNode;

  if (error) {
    content = (
      <>
        <p role="alert" className="text-red-700">
          {error}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          다시 시도
        </button>
      </>
    );
  } else if (isLoading) {
    content = (
      <p role="status" className="text-muted">
        영화를 불러오는 중입니다.
      </p>
    );
  } else if (hasNextPage) {
    content = (
      <>
        {!canAutoLoad && (
          <p className="mb-3 text-sm text-muted">
            이번 페이지에는 조건에 맞는 영화가 없습니다. 다음 결과를 확인해보세요.
          </p>
        )}
        <button
          type="button"
          onClick={onLoadMore}
          className="rounded-lg bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200"
        >
          더 불러오기
        </button>
      </>
    );
  } else {
    content = (
      <p role="status" className="text-sm text-muted">
        영화 목록을 모두 확인했습니다.
      </p>
    );
  }

  return (
    <div ref={triggerRef} className="py-8 text-center">
      {content}
    </div>
  );
}
