import type { Part } from '../types/auth';

const AUTHORIZATION_CODE_KEY = 'sopt-week4-authorization-code';
const MEMBER_PART_KEY = 'sopt-week4-member-part';

export function getAuthorizationCode() {
  return localStorage.getItem(AUTHORIZATION_CODE_KEY)?.trim() || null;
}

export function getMemberPart(): Part | null {
  if (!getAuthorizationCode()) return null;
  const part = localStorage.getItem(MEMBER_PART_KEY);
  return part === 'WEB' || part === 'iOS' || part === 'ANDROID' ? part : null;
}

export function saveAuthorizationCode(code: string, part: Part) {
  localStorage.setItem(AUTHORIZATION_CODE_KEY, code);
  localStorage.setItem(MEMBER_PART_KEY, part);
}

export function clearAuthorization() {
  localStorage.removeItem(AUTHORIZATION_CODE_KEY);
  localStorage.removeItem(MEMBER_PART_KEY);
}
