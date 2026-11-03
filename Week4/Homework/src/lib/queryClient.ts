import { QueryClient } from '@tanstack/react-query';

// 렌더링마다 캐시가 새로 만들어지지 않도록 밖에서 생성
export const queryClient = new QueryClient();
