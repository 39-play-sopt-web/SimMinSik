import { Link } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';

export function PostEditorPage() {
  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-bold">게시글 수정</h1>
        <p className="mt-4 text-muted">입력 폼을 준비하고 있습니다.</p>
        <Link className="button-secondary mt-6" to="/">
          게시판 목록으로
        </Link>
      </main>
    </>
  );
}
