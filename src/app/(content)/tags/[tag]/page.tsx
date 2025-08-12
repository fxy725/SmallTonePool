import { getPostsByTag, getAllTags } from "@/lib/content/posts";
import { PostCard } from "@/components/blog/PostCard";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface TagPageProps {
    params: Promise<{
        tag: string;
    }>;
}

export async function generateStaticParams() {
    const tags = await getAllTags();
    return tags.map((tag) => ({
        tag: tag.name,
    }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const { tag } = await params;
    const posts = await getPostsByTag(tag);

    if (posts.length === 0) {
        return {
            title: "标签未找到",
        };
    }

    return {
        title: `#${tag} - 小石潭记`,
        description: `查看标签为 ${tag} 的所有文章，共 ${posts.length} 篇`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { tag } = await params;
    const posts = await getPostsByTag(tag);
    const tagName = decodeURIComponent(tag);

    if (posts.length === 0) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        标签: #{tagName}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        共 {posts.length} 篇相关文章
                    </p>
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((post) => (
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
}
