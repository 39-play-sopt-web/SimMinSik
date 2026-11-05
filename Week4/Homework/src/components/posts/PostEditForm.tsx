import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useLocation } from 'react-router';
import { POST_FIELDS } from '../../constants/postFields';
import { useUpdatePost } from '../../hooks/useUpdatePost';
import type { PostSummary, UpdatePostInput } from '../../types/post';

interface PostEditFormProps {
  post: PostSummary;
}

const EDIT_FIELDS = POST_FIELDS.filter((field) => field.name !== 'author');

export function PostEditForm({ post }: PostEditFormProps) {
  // 조회 결과는 처음 폼을 열 때만 사용하고, 이후에는 입력값을 유지
  const [values, setValues] = useState<UpdatePostInput>({ title: post.title, content: post.content });
  const { search } = useLocation();
  const { mutate, isPending } = useUpdatePost(post.id);
  const isValid = EDIT_FIELDS.every(({ name, limit }) => (
    values[name].trim().length > 0 && values[name].length <= limit
  ));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isPending) return;
    mutate({ title: values.title.trim(), content: values.content.trim() });
  }

  return (
    <form className="mt-7 space-y-6" onSubmit={handleSubmit} noValidate>
      <fieldset className="space-y-6 disabled:opacity-60" disabled={isPending}>
        <legend className="sr-only">수정할 게시글 내용</legend>
        {EDIT_FIELDS.map(({ name, label, limit, placeholder }) => {
          const value = values[name];
          const isTooLong = value.length > limit;

          return (
            <div key={name}>
              <label className="mb-2 block text-sm text-muted" htmlFor={`edit-${name}`}>
                {label}
              </label>
              {name === 'content' ? (
                <textarea
                  className="form-input min-h-48 resize-y"
                  id="edit-content"
                  value={value}
                  onChange={(event) => setValues((previous) => ({ ...previous, content: event.target.value }))}
                  placeholder={placeholder}
                  aria-describedby={`edit-${name}-feedback`}
                  aria-invalid={isTooLong}
                  required
                />
              ) : (
                <input
                  className="form-input"
                  id="edit-title"
                  value={value}
                  onChange={(event) => setValues((previous) => ({ ...previous, title: event.target.value }))}
                  placeholder={placeholder}
                  aria-describedby={`edit-${name}-feedback`}
                  aria-invalid={isTooLong}
                  required
                />
              )}
              <div className="mt-2 flex justify-between gap-3 text-xs" id={`edit-${name}-feedback`}>
                <p className={isTooLong ? 'text-red-300' : 'text-muted'} aria-live="polite">
                  {isTooLong ? `${label} 입력은 ${limit}자까지 가능합니다.` : `${limit}자까지 입력할 수 있습니다.`}
                </p>
                <span className={isTooLong ? 'shrink-0 text-red-300' : 'shrink-0 text-muted'}>
                  {value.length} / {limit}
                </span>
              </div>
            </div>
          );
        })}
      </fieldset>

      <div className="flex justify-end gap-2">
        <Link className="button-secondary" to={{ pathname: `/posts/${post.id}`, search }}>
          취소
        </Link>
        <button className="button-primary" type="submit" disabled={!isValid || isPending}>
          {isPending ? '수정 중...' : '수정 완료'}
        </button>
      </div>
    </form>
  );
}
