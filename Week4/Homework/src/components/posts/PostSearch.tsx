import { useState } from 'react';
import type { FormEvent } from 'react';

interface PostSearchProps {
  onSearch: (keyword: string) => void;
}

export function PostSearch({ onSearch }: PostSearchProps) {
  const [input, setInput] = useState('');
  const keyword = input.trim();
  const isValid = keyword.length >= 2 && keyword.length <= 50;
  const hasError = keyword.length > 0 && !isValid;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValid) return;
    onSearch(keyword);
  }

  function handleReset() {
    setInput('');
    onSearch('');
  }

  return (
    <form className="mt-8" role="search" onSubmit={handleSubmit}>
      <label className="mb-2 block font-semibold" htmlFor="post-keyword">
        제목 검색
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3"
          id="post-keyword"
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="검색어를 입력해 주세요"
          aria-describedby="search-help"
          aria-invalid={hasError}
        />
        <button
          className="rounded-lg bg-purple-700 px-5 py-3 font-semibold text-white transition-colors enabled:hover:bg-purple-900 disabled:cursor-not-allowed disabled:opacity-40"
          type="submit"
          disabled={!isValid}
        >
          검색
        </button>
        <button
          className="rounded-lg border border-slate-300 bg-white px-4 py-3 transition-colors hover:bg-slate-100"
          type="button"
          onClick={handleReset}
        >
          전체 목록
        </button>
      </div>
      <p
        className={hasError ? 'mt-2 text-sm text-red-700' : 'mt-2 text-sm text-slate-500'}
        id="search-help"
      >
        검색어는 앞뒤 공백을 제외하고 2~50자로 입력해 주세요.
      </p>
    </form>
  );
}
