import { useState } from 'react';
import type { FormEvent } from 'react';
import { isAxiosError } from 'axios';
import { Link } from 'react-router';
import { useIssueAuthorizationCode } from '../hooks/useIssueAuthorizationCode';
import type { Part } from '../types/auth';

const PARTS: Part[] = ['WEB', 'iOS', 'ANDROID'];

export function AuthorizationPage() {
  const [part, setPart] = useState<Part | null>(null);
  const { mutate, isPending, isError, error, reset } = useIssueAuthorizationCode();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!part || isPending) return;
    mutate(part);
  }

  const errorMessage = isAxiosError(error)
    ? '코드를 발급하지 못했습니다. 네트워크 연결을 확인하고 다시 시도해 주세요.'
    : error?.message;

  return (
    <main className="mx-auto max-w-lg px-6 py-16">
      <Link className="text-sm underline" to="/">
        게시판 목록으로
      </Link>
      <h1 className="mt-8 text-3xl font-bold">회원 코드 발급</h1>
      <p className="mt-3 text-slate-600">
        게시글을 작성하려면 소속 파트를 선택해 주세요.
      </p>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <fieldset disabled={isPending}>
          <legend className="mb-3 font-semibold">소속 파트</legend>
          <div className="flex flex-wrap gap-3">
            {PARTS.map((value) => (
              <label
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 has-checked:border-purple-700 has-checked:bg-purple-50"
                key={value}
              >
                <input
                  type="radio"
                  name="part"
                  value={value}
                  checked={part === value}
                  onChange={() => {
                    setPart(value);
                    reset();
                  }}
                />
                {value}
              </label>
            ))}
          </div>
        </fieldset>

        {isError && (
          <p className="text-sm text-red-700" role="alert">
            {errorMessage || '코드를 발급하지 못했습니다. 다시 시도해 주세요.'}
          </p>
        )}

        <button
          className="w-full rounded-lg bg-purple-700 px-5 py-3 font-semibold text-white transition-colors enabled:hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={!part || isPending}
        >
          {isPending ? '발급 중...' : '코드 발급'}
        </button>
      </form>
    </main>
  );
}
