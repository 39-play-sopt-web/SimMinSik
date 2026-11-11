import { useInfiniteQuery } from '@tanstack/react-query';
import { getPosts } from '../apis/posts';
import { postKeys } from '../lib/postKeys';

export function usePosts(keyword: string) {
  return useInfiniteQuery({
    // 검색어별로 캐시를 나눠 이전 검색 결과가 현재 목록에 섞이지 않도록 처리
    queryKey: postKeys.infinite(keyword),
    queryFn: ({ signal, pageParam }) => getPosts(keyword, signal, pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => (
      lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined
    ),
  });
}
