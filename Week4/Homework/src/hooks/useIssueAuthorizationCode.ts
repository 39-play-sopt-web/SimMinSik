import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { issueAuthorizationCode } from '../apis/auth';
import { saveAuthorizationCode } from '../lib/authStorage';

export function useIssueAuthorizationCode() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: issueAuthorizationCode,
    onSuccess: (code, part) => {
      saveAuthorizationCode(code, part);
      navigate('/', { replace: true });
    },
  });
}
