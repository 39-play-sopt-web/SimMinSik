export const postKeys = {
  all: ['posts'] as const,
  lists: ['posts', 'infinite'] as const,
  detail: (postId: number) => ['posts', 'detail', postId] as const,
  infinite: (keyword: string) => ['posts', 'infinite', { keyword }] as const,
};
