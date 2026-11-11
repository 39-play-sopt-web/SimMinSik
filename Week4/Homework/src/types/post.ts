export interface PostSummary {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface PostListResponse {
  posts: PostSummary[];
  nextCursor: number | null;
  hasNext: boolean;
}

export interface CreatePostInput {
  title: string;
  content: string;
  author: string;
}

export type UpdatePostInput = Pick<CreatePostInput, 'title' | 'content'>;
