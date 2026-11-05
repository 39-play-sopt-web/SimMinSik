import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';
import { useCreatePost } from '../hooks/useCreatePost';

export function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const { mutate, isPending } = useCreatePost();
  const isComplete = Boolean(title.trim() && content.trim() && author.trim());

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isComplete || isPending) return;

    mutate({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
    });
  }

  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-bold">글쓰기</h1>

        <form className="mt-7 space-y-6" onSubmit={handleSubmit}>
          <fieldset className="space-y-6 disabled:opacity-60" disabled={isPending}>
            <legend className="sr-only">게시글 내용</legend>
            <div>
              <label className="mb-2 block text-sm text-muted" htmlFor="post-title">
                제목
              </label>
              <input
                className="form-input"
                id="post-title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="제목을 입력해 주세요"
                maxLength={50}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-muted" htmlFor="post-content">
                본문
              </label>
              <textarea
                className="form-input min-h-48 resize-y"
                id="post-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="내용을 입력해 주세요"
                maxLength={1000}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-muted" htmlFor="post-author">
                작성자
              </label>
              <input
                className="form-input"
                id="post-author"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
                placeholder="작성자 이름을 입력해 주세요"
                maxLength={20}
                required
              />
            </div>
          </fieldset>

          <div className="flex justify-end gap-2">
            <Link className="button-secondary" to="/">목록으로</Link>
            <button className="button-primary" type="submit" disabled={!isComplete || isPending}>
              {isPending ? '작성 중...' : '작성'}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
