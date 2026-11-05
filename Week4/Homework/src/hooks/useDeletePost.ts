import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { deletePost } from '../apis/posts';
import { postKeys } from '../lib/postKeys';
import type { ApiResponse } from '../types/api';

export function useDeletePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { search } = useLocation();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (_, postId) => {
      await navigate({ pathname: '/', search }, { replace: true });
      queryClient.removeQueries({ queryKey: postKeys.detail(postId), exact: true });
      await queryClient.invalidateQueries({ queryKey: postKeys.all });
      window.alert('게시글이 삭제되었습니다.');
    },
    onError: (error) => {
      const message = isAxiosError<ApiResponse<unknown>>(error)
        ? error.response?.data?.message || '게시글을 삭제하지 못했습니다. 다시 시도해 주세요.'
        : error.message;

      window.alert(message);
    },
  });
}
