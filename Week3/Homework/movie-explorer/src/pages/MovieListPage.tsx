export default function MovieListPage() {
  return (
    <section aria-labelledby="movie-list-title">
      <h1 id="movie-list-title" className="text-3xl font-bold sm:text-4xl">영화 목록</h1>
      <p className="mt-3 text-muted">별점으로 영화를 고르고, 상세 정보를 확인해보세요.</p>
      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <h2 className="text-lg font-semibold">영화 목록을 준비 중입니다.</h2>
        <p className="mt-2 text-sm text-muted">다음 단계에서 TMDB API로 영화 데이터를 가져옵니다.</p>
      </div>
    </section>
  );
}
