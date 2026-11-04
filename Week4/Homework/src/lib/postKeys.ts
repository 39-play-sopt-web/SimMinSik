export const postKeys = {
  all: ['posts'] as const,
  infinite: (keyword: string) => ['posts', 'infinite', { keyword }] as const,
};
