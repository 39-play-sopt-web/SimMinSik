const AUTHORIZATION_CODE_KEY = 'sopt-week4-authorization-code';

export function getAuthorizationCode() {
  return localStorage.getItem(AUTHORIZATION_CODE_KEY)?.trim() || null;
}

export function saveAuthorizationCode(code: string) {
  localStorage.setItem(AUTHORIZATION_CODE_KEY, code);
}
