import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold">페이지를 찾을 수 없습니다.</h1>
      <Link className="mt-6 inline-block underline" to="/">
        게시판으로 돌아가기
      </Link>
    </main>
  );
}
