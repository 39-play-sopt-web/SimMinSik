import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../apis/posts';
import { postKeys } from '../lib/postKeys';

export function usePosts(keyword: string) {
  return useQuery({
    // 검색어별로 캐시를 나눠 이전 검색 결과가 현재 목록에 섞이지 않도록 처리
    queryKey: postKeys.list(keyword),
    queryFn: ({ signal }) => getPosts(keyword, signal),
  });
}
