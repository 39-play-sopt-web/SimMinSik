import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { updatePost } from '../apis/posts';
import { postKeys } from '../lib/postKeys';
import type { ApiResponse } from '../types/api';
import type { UpdatePostInput } from '../types/post';

export function useUpdatePost(postId: number) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { search } = useLocation();

  return useMutation({
    mutationFn: (input: UpdatePostInput) => updatePost(postId, input),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: postKeys.detail(postId), exact: true }),
        queryClient.invalidateQueries({ queryKey: postKeys.lists }),
      ]);
      window.alert('게시글이 수정되었습니다.');
      await navigate({ pathname: `/posts/${postId}`, search }, { replace: true });
    },
    onError: (error) => {
      const message = isAxiosError<ApiResponse<unknown>>(error)
        ? error.response?.data?.message || '게시글을 수정하지 못했습니다. 다시 시도해 주세요.'
        : error.message;

      window.alert(message);
    },
  });
}
