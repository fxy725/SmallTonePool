import { getPostBySlug, getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { MDXRenderer } from "@/components/MDXRenderer";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: "文章未找到",
    };
  }

  return {
    title: `${post.title} - 小石潭记`,
    description: post.summary,
    keywords: post.tags.join(", "),
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated,
      authors: ["小石潭记"],
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4 inline-block"
          >
            ← 返回文章列表
          </Link>
          
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('zh-CN')}
            </time>
            {post.updated && (
              <>
                <span>·</span>
                <span>更新于 {new Date(post.updated).toLocaleDateString('zh-CN')}</span>
              </>
            )}
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime} 分钟阅读</span>
              </>
            )}
          </div>
          
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MDXRenderer>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </MDXRenderer>
        </div>
      </div>
    </article>
  );
}