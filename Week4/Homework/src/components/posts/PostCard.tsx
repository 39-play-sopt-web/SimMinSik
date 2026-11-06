import { Link, useLocation } from 'react-router';
import type { PostSummary } from '../../types/post';

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  const { search } = useLocation();

  return (
    <li>
      <article>
        <Link
          className="block rounded-lg border border-transparent bg-surface px-5 py-4 transition-colors hover:border-accent/60"
          to={{ pathname: `/posts/${post.id}`, search }}
        >
          <h3 className="break-words text-base font-semibold">{post.title}</h3>
          <p className="mt-1.5 line-clamp-2 whitespace-pre-wrap break-words text-sm text-muted">
            {post.content}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="break-words text-accent">{post.author}</span>
            <time dateTime={post.createdAt}>
              {new Date(post.createdAt).toLocaleDateString('ko-KR')}
            </time>
          </div>
        </Link>
      </article>
    </li>
  );
}
