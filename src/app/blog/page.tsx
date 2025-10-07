import { Header } from "@/components/layout/Header";
import BlogContentClient from "@/components/blog/BlogContentClient";
import { getAllPosts, getAllTags } from "@/lib/content/posts";

export default async function BlogPage() {
    // 构建时读取 MDX，生成静态数据
    const posts = await getAllPosts();
    const tags = await getAllTags();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />
            <BlogContentClient posts={posts} tags={tags} />
        </div>
    );
}
