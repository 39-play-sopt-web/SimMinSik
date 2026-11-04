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
    <form className="mt-5" role="search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="post-keyword">
        제목 검색
      </label>
      <div className="flex flex-wrap gap-2">
        <input
          className="form-input min-w-0 flex-1 basis-40"
          id="post-keyword"
          type="search"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="제목으로 검색"
          aria-describedby="search-help"
          aria-invalid={hasError}
        />
        <button
          className="button-primary"
          type="submit"
          disabled={!isValid}
        >
          검색
        </button>
        <button
          className="button-secondary"
          type="button"
          onClick={handleReset}
        >
          전체 목록
        </button>
      </div>
      <p
        className={hasError ? 'mt-2 text-xs text-red-300' : 'mt-2 text-xs text-muted'}
        id="search-help"
      >
        검색어는 앞뒤 공백을 제외하고 2~50자로 입력해 주세요.
      </p>
    </form>
  );
}
