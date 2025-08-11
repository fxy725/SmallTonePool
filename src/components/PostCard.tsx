import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString('zh-CN')}
        </time>
        {post.readingTime && (
          <span>· {post.readingTime} 分钟阅读</span>
        )}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">
        <Link 
          href={`/blog/${post.slug}`}
          className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {post.title}
        </Link>
      </h3>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {post.summary}
      </p>
      
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}