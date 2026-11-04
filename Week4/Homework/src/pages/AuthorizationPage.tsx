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
    <main className="flex min-h-dvh items-center justify-center px-5 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold tracking-tight">PLAY SOPT 게시판</h1>
        <h2 className="mt-3 text-base font-semibold">회원 코드 발급</h2>
        <p className="mt-2 text-sm text-muted">파트를 선택하고 코드를 발급받아 주세요.</p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          <fieldset disabled={isPending}>
            <label className="mb-2 block text-sm text-muted" htmlFor="member-part">소속 파트</label>
            <select
              className="form-input disabled:opacity-40"
              id="member-part"
              value={part ?? ''}
              onChange={(event) => {
                setPart(PARTS.find((value) => value === event.target.value) ?? null);
                reset();
              }}
            >
              <option value="">파트를 선택해 주세요</option>
              {PARTS.map((value) => (
                <option value={value} key={value}>{value}</option>
              ))}
            </select>
          </fieldset>

          {isError && (
            <p className="text-sm text-red-300" role="alert">
              {errorMessage || '코드를 발급하지 못했습니다. 다시 시도해 주세요.'}
            </p>
          )}

          <button
            className="button-primary w-full"
            type="submit"
            disabled={!part || isPending}
          >
            {isPending ? '발급 중...' : '코드 발급'}
          </button>
          <Link className="button-secondary w-full" to="/">게시판 목록 보기</Link>
        </form>
      </div>
    </main>
  );
}
