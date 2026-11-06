import { redirect } from 'react-router';
import { getAuthorizationCode } from '../lib/authStorage';

// 버튼뿐 아니라 주소를 직접 입력한 경우에도 발급 화면으로 이동
export function requireAuthorization() {
  if (!getAuthorizationCode()) {
    window.alert('회원 코드를 먼저 발급받아 주세요.');
    return redirect('/auth');
  }

  return null;
}
