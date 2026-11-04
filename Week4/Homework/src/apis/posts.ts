import type { ApiResponse } from '../types/api';
import type { PostListResponse } from '../types/post';
import { apiClient } from './apiClient';

export async function getPosts(
  keyword: string,
  signal: AbortSignal,
  cursor?: number,
) {
  const { data: response } = await apiClient.get<ApiResponse<PostListResponse>>(
    '/posts',
    {
      params: {
        keyword: keyword || undefined,
        cursor,
        size: 10,
      },
      signal,
    },
  );

  if (!response.isSuccess) {
    throw new Error(response.message || '게시글을 불러오지 못했습니다.');
  }

  return response.data;
}
