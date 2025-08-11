import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "所有文章 - 小石潭记",
  description: "查看小石潭记博客的所有文章",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">所有文章</h1>
          <p className="text-gray-600 dark:text-gray-400">
            共 {posts.length} 篇文章
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              暂无文章，敬请期待...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}