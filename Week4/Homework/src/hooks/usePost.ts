import { isAxiosError } from 'axios';
import { useQuery } from '@tanstack/react-query';
import { getPost } from '../apis/posts';
import { postKeys } from '../lib/postKeys';

export function usePost(postId: number) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: ({ signal }) => getPost(postId, signal),
    enabled: Number.isSafeInteger(postId) && postId > 0,
    retry: (failureCount, error) => {
      // 없는 게시글 등 4xx 응답은 반복 요청하지 않음
      if (isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status >= 400 && status < 500) return false;
      }
      return failureCount < 2;
    },
  });
}
