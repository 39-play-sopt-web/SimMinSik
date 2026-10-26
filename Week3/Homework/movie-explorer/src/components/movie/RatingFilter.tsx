import type { RatingRange } from '../../types/movie';

interface RatingFilterProps {
  rating: RatingRange;
  onChange: (rating: RatingRange) => void;
}

const RATINGS = Array.from({ length: 11 }, (_, index) => index);

export default function RatingFilter({ rating, onChange }: RatingFilterProps) {
  return (
    <fieldset className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
      <legend className="px-2 font-semibold">평점 필터</legend>
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">
          최소 평점
          <select
            value={rating.min}
            onChange={(event) => onChange({ ...rating, min: Number(event.target.value) })}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 focus-visible:outline-accent"
          >
            {RATINGS.map((value) => (
              <option key={value} value={value} disabled={value > rating.max}>{value}점</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-medium">
          최대 평점
          <select
            value={rating.max}
            onChange={(event) => onChange({ ...rating, max: Number(event.target.value) })}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 focus-visible:outline-accent"
          >
            {RATINGS.map((value) => (
              <option key={value} value={value} disabled={value < rating.min}>{value}점</option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => onChange({ min: 0, max: 10 })}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold hover:bg-slate-200 focus-visible:outline-accent"
        >
          전체 평점
        </button>
      </div>
      <p className="mt-3 text-sm text-muted">10점 만점 기준, {rating.min}점 이상 {rating.max}점 이하의 영화를 조회합니다.</p>
    </fieldset>
  );
}
