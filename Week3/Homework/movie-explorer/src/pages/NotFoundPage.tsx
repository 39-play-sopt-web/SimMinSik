import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section aria-labelledby="not-found-title" className="py-12 text-center">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 id="not-found-title" className="mt-3 text-2xl font-bold">
        페이지를 찾을 수 없습니다.
      </h1>
      <p className="mt-3 text-muted">주소를 확인하거나 영화 목록으로 돌아가세요.</p>
      <Link
        to="/"
        className="mt-6 inline-flex rounded-lg bg-accent px-5 py-3 font-semibold text-white hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        영화 목록으로 이동
      </Link>
    </section>
  );
}
