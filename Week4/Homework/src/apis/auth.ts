import type { ApiResponse } from '../types/api';
import type { AuthorizationCode, Part } from '../types/auth';
import { apiClient } from './apiClient';

export async function issueAuthorizationCode(part: Part) {
  const { data: response } = await apiClient.post<ApiResponse<AuthorizationCode>>(
    '/members/authorization-code',
    { part },
  );

  if (!response.isSuccess || !response.data?.authorizationCode?.trim()) {
    throw new Error(response.message || '회원 코드를 발급하지 못했습니다.');
  }

  return response.data.authorizationCode;
}
