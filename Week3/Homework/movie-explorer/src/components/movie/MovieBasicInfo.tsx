import type { MovieDetail } from '../../types/movie';

interface MovieBasicInfoProps {
  movie: MovieDetail;
}

const languageNames = new Intl.DisplayNames(['ko'], { type: 'language' });
const countryNames = new Intl.DisplayNames(['ko'], { type: 'region' });

export default function MovieBasicInfo({ movie }: MovieBasicInfoProps) {
  const info = [
    { label: '원제', value: movie.original_title || '미등록' },
    { label: '원어', value: movie.original_language ? languageNames.of(movie.original_language) : '미등록' },
    {
      label: '제작 국가',
      value: movie.production_countries.map((country) => countryNames.of(country.iso_3166_1) || country.name).join(', ') || '미등록',
    },
    {
      label: '사용 언어',
      value: movie.spoken_languages.map((language) => language.iso_639_1
        ? languageNames.of(language.iso_639_1)
        : language.english_name || language.name).join(', ') || '미등록',
    },
    { label: '예산 (USD)', value: movie.budget > 0 ? movie.budget.toLocaleString('ko-KR') : '미등록' },
    { label: '수익 (USD)', value: movie.revenue > 0 ? movie.revenue.toLocaleString('ko-KR') : '미등록' },
  ];

  return (
    <section aria-labelledby="movie-basic-info-title" className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
      <h2 id="movie-basic-info-title" className="text-xl font-bold">기본 정보</h2>
      <dl className="mt-5 grid gap-5 sm:grid-cols-2">
        {info.map(({ label, value }) => (
          <div key={label} className="min-w-0">
            <dt className="text-sm text-muted">{label}</dt>
            <dd className="mt-1 font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
