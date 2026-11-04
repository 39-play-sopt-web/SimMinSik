export const postKeys = {
  all: ['posts'] as const,
  list: (keyword: string) => ['posts', 'list', { keyword }] as const,
};
