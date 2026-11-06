export const POST_FIELDS = [
  { name: 'title', label: '제목', limit: 50, placeholder: '제목을 입력해 주세요' },
  { name: 'content', label: '본문', limit: 1000, placeholder: '내용을 입력해 주세요' },
  { name: 'author', label: '작성자', limit: 20, placeholder: '작성자 이름을 입력해 주세요' },
] as const;
