import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { Hero } from "@/components/Hero";

export default async function Home() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">最新文章</h2>
          <p className="text-gray-600 dark:text-gray-400">
            分享我的技术心得与经验总结
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        
        {posts.length > 6 && (
          <div className="text-center mt-12">
            <Link 
              href="/blog"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              查看所有文章
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
