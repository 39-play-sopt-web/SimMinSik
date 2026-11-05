import { isAxiosError } from 'axios';
import { Link, useLocation, useParams } from 'react-router';
import { BoardHeader } from '../components/BoardHeader';
import { usePost } from '../hooks/usePost';

export function PostDetailPage() {
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
        <Link className="button-secondary mb-8" to={{ pathname: '/', search }}>
          목록으로
        </Link>

        {!isValidId ? (
          <h1 className="text-xl font-semibold">올바르지 않은 게시글 주소입니다.</h1>
        ) : isPending ? (
          <p role="status">게시글을 불러오는 중입니다.</p>
        ) : !post ? (
          <div role="alert">
            <h1 className="text-xl font-semibold">
              {isNotFound ? '게시글을 찾을 수 없습니다.' : '게시글을 불러오지 못했습니다.'}
            </h1>
            <p className="mt-3 text-sm text-muted">
              {isNotFound ? '삭제되었거나 존재하지 않는 게시글입니다.' : '잠시 후 다시 시도해 주세요.'}
            </p>
            {!isNotFound && (
              <button
                className="button-secondary mt-5"
                type="button"
                onClick={() => { void refetch(); }}
                disabled={isFetching}
              >
                다시 시도
              </button>
            )}
          </div>
        ) : (
          <article>
            {isError && (
              <p className="mb-5 text-sm text-red-300" role="alert">
                최신 내용을 가져오지 못해 이전 내용을 표시하고 있습니다.
              </p>
            )}
            <h1 className="break-words text-2xl font-bold">{post.title}</h1>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
              <span className="break-words text-accent">{post.author}</span>
              <time dateTime={post.createdAt}>
                작성일 {new Date(post.createdAt).toLocaleString('ko-KR')}
              </time>
            </div>
            <p className="mt-7 whitespace-pre-wrap break-words border-t border-line pt-7 leading-8">
              {post.content}
            </p>
          </article>
        )}
      </main>
    </>
  );
}
