import type { PostSummary } from '../../types/post';

interface PostCardProps {
  post: PostSummary;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <li>
      <article className="h-full rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="break-words text-lg font-bold">{post.title}</h3>
        <p className="mt-3 line-clamp-3 whitespace-pre-wrap break-words text-slate-600">
          {post.content}
        </p>
        <div className="mt-5 flex flex-wrap justify-between gap-2 text-sm text-slate-500">
          <span className="break-words">{post.author}</span>
          <time dateTime={post.createdAt}>
            {new Date(post.createdAt).toLocaleDateString('ko-KR')}
          </time>
        </div>
      </article>
    </li>
  );
}
