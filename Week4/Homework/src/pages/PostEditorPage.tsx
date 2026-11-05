import { isAxiosError } from 'axios';
import { Link, useLocation, useParams } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';
import { PostEditForm } from '../components/posts/PostEditForm';
import { usePost } from '../hooks/usePost';

export function PostEditorPage() {
  const { postId } = useParams();
  const { search } = useLocation();
  const id = Number(postId);
  const isValidId = Number.isSafeInteger(id) && id > 0;
  const { data: post, isPending, isError, error, isFetching, refetch } = usePost(id);
  const isNotFound = isAxiosError(error) && error.response?.status === 404;

  return (
    <>
      <BoardHeader />
      <main className="mx-auto max-w-3xl px-5 py-12">
        <h1 className="text-2xl font-bold">게시글 수정</h1>
        {!isValidId ? (
          <p className="mt-6" role="alert">올바르지 않은 게시글 주소입니다.</p>
        ) : isPending ? (
          <p className="mt-6" role="status">게시글을 불러오는 중입니다.</p>
        ) : !post ? (
          <div className="mt-6" role="alert">
            <p>{isNotFound ? '게시글을 찾을 수 없습니다.' : '게시글을 불러오지 못했습니다.'}</p>
            {!isNotFound && (
              <button
                className="button-secondary mt-4"
                type="button"
                onClick={() => { void refetch(); }}
                disabled={isFetching}
              >
                다시 시도
              </button>
            )}
          </div>
        ) : (
          <>
            {isError && (
              <p className="mt-4 text-sm text-red-300" role="alert">
                최신 내용을 가져오지 못했습니다. 수정 전 다시 확인해 주세요.
              </p>
            )}
            <PostEditForm key={post.id} post={post} />
          </>
        )}
        <Link className="mt-6 inline-block text-sm text-muted underline" to={{ pathname: '/', search }}>
          게시판 목록으로
        </Link>
      </main>
    </>
  );
}
