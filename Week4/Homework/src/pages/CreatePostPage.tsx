import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';
import { useCreatePost } from '../hooks/useCreatePost';
import { POST_FIELDS } from '../constants/postFields';
import type { CreatePostInput } from '../types/post';

export function CreatePostPage() {
  const [values, setValues] = useState<CreatePostInput>({ title: '', content: '', author: '' });
  const [step, setStep] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { mutate, isPending } = useCreatePost();
  const field = POST_FIELDS[step];
  const value = values[field.name];
  const isTooLong = value.length > field.limit;
  const isValid = value.trim().length > 0 && !isTooLong;
  const isLastStep = step === POST_FIELDS.length - 1;

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  function handleChange(nextValue: string) {
    setValues((previous) => ({ ...previous, [field.name]: nextValue }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid || isPending) return;

    if (!isLastStep) {
      setStep((previous) => previous + 1);
      return;
    }

    // 마지막 제출 시 이전 단계의 값도 함께 확인
    const invalidStep = POST_FIELDS.findIndex(({ name, limit }) => (
      !values[name].trim() || values[name].length > limit
    ));
    if (invalidStep !== -1) {
      setStep(invalidStep);
      return;
    }

    mutate({
      title: values.title.trim(),
      content: values.content.trim(),
      author: values.author.trim(),
    });
  }

  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-bold">글쓰기</h1>

        <ol className="mt-5 flex gap-5 text-sm" aria-label="작성 단계">
          {POST_FIELDS.map(({ name, label }, index) => (
            <li
              className={index === step ? 'font-semibold text-accent' : 'text-muted'}
              key={name}
              aria-current={index === step ? 'step' : undefined}
            >
              {index + 1}. {label}
            </li>
          ))}
        </ol>

        <form className="mt-7 space-y-6" onSubmit={handleSubmit} noValidate>
          <h2 className="sr-only" tabIndex={-1} ref={headingRef}>
            {step + 1}단계: {field.label} 입력
          </h2>
          <fieldset className="disabled:opacity-60" disabled={isPending}>
            <legend className="sr-only">게시글 내용</legend>
            <label className="mb-2 block text-sm text-muted" htmlFor={`post-${field.name}`}>
              {field.label}
            </label>
            {field.name === 'content' ? (
              <textarea
                className="form-input min-h-48 resize-y"
                id="post-content"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={field.placeholder}
                aria-describedby="post-field-feedback"
                aria-invalid={isTooLong}
                required
              />
            ) : (
              <input
                key={field.name}
                className="form-input"
                id={`post-${field.name}`}
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                placeholder={field.placeholder}
                aria-describedby="post-field-feedback"
                aria-invalid={isTooLong}
                required
              />
            )}
            <div className="mt-2 flex items-start justify-between gap-3 text-xs" id="post-field-feedback">
              <p className={isTooLong ? 'text-red-300' : 'text-muted'} aria-live="polite">
                {isTooLong
                  ? `${field.label} 입력은 ${field.limit}자까지 가능합니다.`
                  : value.length > 0 && !value.trim()
                    ? '공백만 입력할 수 없습니다.'
                    : `${field.limit}자까지 입력할 수 있습니다.`}
              </p>
              <span className={isTooLong ? 'shrink-0 text-red-300' : 'shrink-0 text-muted'}>
                {value.length} / {field.limit}
              </span>
            </div>
          </fieldset>

          <div className="flex flex-wrap justify-between gap-3">
            <Link className="button-secondary" to="/">목록으로</Link>
            <div className="flex gap-2">
              {step > 0 && (
                <button
                  className="button-secondary"
                  type="button"
                  onClick={() => setStep((previous) => previous - 1)}
                  disabled={isPending}
                >
                  이전
                </button>
              )}
              <button
                className="button-primary"
                type="submit"
                disabled={!isValid || isPending}
              >
                {isPending ? '작성 중...' : isLastStep ? '작성' : '다음'}
              </button>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
