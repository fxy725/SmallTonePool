import { getAllTags } from "@/lib/content/posts";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "所有标签 - 小石潭记",
    description: "查看小石潭记博客的所有文章标签",
};

export default async function TagsPage() {
    const tags = await getAllTags();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">
                        所有标签
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        共 {tags.length} 个标签
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {tags.map((tag) => (
                        <Link
                            key={tag.name}
                            href={`/tags/${tag.name}`}
                            className="block p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    #{tag.name}
                                </h3>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {tag.count} 篇
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {tags.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-600 dark:text-gray-400">
                            暂无标签
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
