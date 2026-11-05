import { isAxiosError } from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { createPost } from '../apis/posts';
import { postKeys } from '../lib/postKeys';
import type { ApiResponse } from '../types/api';

export function useCreatePost() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPost,
    onSuccess: async (post) => {
      // 전체 목록과 검색 결과 모두 새 글을 반영하도록 갱신
      await queryClient.invalidateQueries({ queryKey: postKeys.all });
      window.alert(`${post.author}님의 게시글이 작성되었습니다.`);
      navigate('/');
    },
    onError: (error) => {
      const message = isAxiosError<ApiResponse<unknown>>(error)
        ? error.response?.data?.message || '게시글을 작성하지 못했습니다. 잠시 후 다시 시도해 주세요.'
        : error.message;

      window.alert(message);
    },
  });
}
