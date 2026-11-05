import { useQuery } from '@tanstack/react-query';
import { getPost } from '../apis/posts';
import { postKeys } from '../lib/postKeys';

export function usePost(postId: number) {
  return useQuery({
    queryKey: postKeys.detail(postId),
    queryFn: ({ signal }) => getPost(postId, signal),
    enabled: Number.isSafeInteger(postId) && postId > 0,
  });
}
