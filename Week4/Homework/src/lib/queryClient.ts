import { QueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

// 렌더링마다 캐시가 새로 만들어지지 않도록 밖에서 생성
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // 요청 조건이나 권한 문제는 같은 요청을 반복해도 해결되지 않음
        if (isAxiosError(error) && error.response) {
          const status = error.response.status;
          if (status >= 400 && status < 500) return false;
        }
        return failureCount < 2;
      },
    },
  },
});
