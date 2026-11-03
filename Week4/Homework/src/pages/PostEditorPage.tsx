import { Link } from 'react-router';

export function PostEditorPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-bold">게시글 작성·수정</h1>
      <p className="mt-4 text-slate-600">입력 폼을 준비하고 있습니다.</p>
      <Link className="mt-6 inline-block underline" to="/">
        게시판 목록으로
      </Link>
    </main>
  );
}
