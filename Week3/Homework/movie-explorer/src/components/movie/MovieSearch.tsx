import { useState } from 'react';

interface MovieSearchProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function MovieSearch({ query, onSearch }: MovieSearchProps) {
  const [value, setValue] = useState(query);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSearch(value);
      }}
      role="search"
      className="mt-6"
    >
      <label htmlFor="movie-search" className="text-sm font-semibold">
        영화 제목 검색
      </label>
      <div className="mt-2 flex flex-wrap gap-2">
        <input
          id="movie-search"
          type="search"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="영화 제목을 입력하세요"
          className="min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2 focus-visible:outline-accent"
        />
        <button
          type="submit"
          className="rounded-lg bg-accent px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          검색
        </button>
        {query && (
          <button
            type="button"
            onClick={() => onSearch('')}
            className="rounded-lg bg-slate-100 px-4 py-2 font-semibold hover:bg-slate-200"
          >
            검색 해제
          </button>
        )}
      </div>
      {query && (
        <p role="status" className="mt-3 text-sm text-muted">
          ‘{query}’ 검색 결과입니다. 검색 결과는 관련도순으로 표시합니다.
        </p>
      )}
    </form>
  );
}
