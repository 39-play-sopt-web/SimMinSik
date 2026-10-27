import type { MovieSort } from '../../types/movie';
import { SORT_OPTIONS } from '../../utils/movieFilters';

interface SortSelectProps {
  sort: MovieSort;
  onChange: (sort: MovieSort) => void;
  isSearching: boolean;
}

export default function SortSelect({ sort, onChange, isSearching }: SortSelectProps) {
  return (
    <label className="mt-6 flex items-center justify-end gap-3 text-sm font-medium">
      정렬
      <select disabled={isSearching} value={isSearching ? 'relevance' : sort} onChange={(event) => onChange(event.target.value as MovieSort)} className="rounded-lg border border-slate-300 bg-white px-3 py-2 focus-visible:outline-accent disabled:text-muted">
        {isSearching ? <option value="relevance">검색 관련도순</option> : SORT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
    </label>
  );
}
