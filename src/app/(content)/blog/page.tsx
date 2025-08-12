"use client";

import { PostCard } from "@/components/blog/PostCard";
import { TagCloud } from "@/components/tags/TagCloudClient";
import { Post, Tag } from "@/types/blog";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function BlogContent() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const searchParams = useSearchParams();
    const currentTag = searchParams.get("tag");

    useEffect(() => {
        async function loadData() {
            try {
                const [postsResponse, tagsResponse] = await Promise.all([
                    fetch('/api/posts'),
                    fetch('/api/tags')
                ]);

                const allPosts = await postsResponse.json();
                const allTags = await tagsResponse.json();

                // 如果有标签过滤，则过滤文章
                const filteredPosts = currentTag
                    ? allPosts.filter((post: Post) => post.tags.includes(currentTag))
                    : allPosts;

                setPosts(filteredPosts);
                setTags(allTags);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [currentTag]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header Section */}
            <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            文章归档
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                            所有文章
                        </h1>

                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            {currentTag ? (
                                <>
                                    显示标签为 <span className="font-semibold text-blue-600 dark:text-blue-400">{currentTag}</span> 的文章，共 {posts.length} 篇
                                </>
                            ) : (
                                <>
                                    浏览所有技术心得与经验总结，共 {posts.length} 篇文章
                                </>
                            )}
                        </p>

                        {currentTag && (
                            <div className="mt-4">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    清除过滤
                                </Link>
                            </div>
                        )}

                        {/* Breadcrumb */}
                        <nav className="flex justify-center mt-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <li>
                                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                        首页
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                    <span className="text-gray-900 dark:text-white">所有文章</span>
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Tags Section */}
            {!loading && tags.length > 0 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                按标签筛选
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                点击标签查看相关文章
                            </p>
                        </div>
                        <TagCloud tags={tags} />
                    </div>
                </div>
            )}

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {loading ? (
                    /* Loading State */
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            加载中...
                        </h3>
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post, index) => (
                            <div
                                key={post.slug}
                                className={`transform transition-all duration-500 hover:scale-105 ${index < 6 ? 'animate-fade-in-up' : ''
                                    }`}
                                style={index >= 6 ? { animationDelay: `${(index - 6) * 0.1}s` } : {}}
                            >
                                <PostCard post={post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            {currentTag ? '没有找到相关文章' : '还没有文章'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            {currentTag
                                ? `没有找到标签为 "${currentTag}" 的文章，请尝试其他标签。`
                                : '博客刚刚建立，精彩内容即将上线。敬请期待技术心得与经验总结！'
                            }
                        </p>

                        {currentTag ? (
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                查看所有文章
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </Link>
                        ) : (
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300"
                            >
                                返回首页
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function BlogPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                        <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                        加载中...
                    </h3>
                </div>
            </div>
        }>
            <BlogContent />
        </Suspense>
    );
}
