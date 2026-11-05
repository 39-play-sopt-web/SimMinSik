import type { ApiResponse } from '../types/api';
import type { CreatePostInput, PostListResponse, PostSummary } from '../types/post';
import { getAuthorizationCode } from '../lib/authStorage';
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

export async function createPost(input: CreatePostInput) {
  const authorizationCode = getAuthorizationCode();
  if (!authorizationCode) {
    throw new Error('회원 코드를 먼저 발급받아 주세요.');
  }

  const { data: response } = await apiClient.post<ApiResponse<PostSummary>>(
    '/posts',
    input,
    { headers: { Authorization: authorizationCode } },
  );

  if (!response.isSuccess) {
    throw new Error(response.message || '게시글을 작성하지 못했습니다.');
  }

  return response.data;
}

export async function getPost(postId: number, signal: AbortSignal) {
  const { data: response } = await apiClient.get<ApiResponse<PostSummary>>(
    `/posts/${postId}`,
    { signal },
  );

  if (!response.isSuccess) {
    throw new Error(response.message || '게시글을 불러오지 못했습니다.');
  }

  return response.data;
}
