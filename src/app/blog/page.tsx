"use client";

import { PostCard } from "@/components/blog/PostCard";
import { Header } from "@/components/layout/Header";
import { Post } from "@/types/blog";
import { useState, useEffect, Suspense } from "react";
import Link from "next/link";

function BlogContent() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;

    useEffect(() => {
        async function loadPosts() {
            try {
                const response = await fetch('/api/posts');
                const allPosts = await response.json();
                setPosts(allPosts);
            } catch (error) {
                console.error("Failed to load posts:", error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    // 从URL参数获取标签
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tag = urlParams.get('tag') || '';
        setSelectedTag(tag);
        setCurrentPage(1); // 切换标签时重置到第一页
    }, []);

    // 获取所有标签
    const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

    // 根据标签筛选文章
    const filteredPosts = selectedTag
        ? posts.filter(post => post.tags.includes(selectedTag))
        : posts;

    // 分页计算
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    const startIndex = (currentPage - 1) * postsPerPage;
    const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

    // 处理标签点击
    const handleTagClick = (tag: string) => {
        const newTag = selectedTag === tag ? '' : tag;
        setSelectedTag(newTag);
        setCurrentPage(1);

        // 更新URL
        const url = new URL(window.location.href);
        if (newTag) {
            url.searchParams.set('tag', newTag);
        } else {
            url.searchParams.delete('tag');
        }
        window.history.pushState({}, '', url);
    };

    // 处理翻页
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Header />

            {/* Tag Filter */}
            <div className="flex flex-wrap gap-3 justify-center pt-20 pb-2" style={{ fontFamily: 'var(--font-content)' }}>
                <button
                    onClick={() => handleTagClick('')}
                    className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedTag === '' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : ''}`}
                >
                    ALL
                </button>
                {allTags.map((tag) => (
                    <button
                        key={tag}
                        onClick={() => handleTagClick(tag)}
                        className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${selectedTag === tag ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : ''}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-2">
                    <div className="flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-content)' }}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            上一页
                        </button>

                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                                pageNum = i + 1;
                            } else if (currentPage <= 3) {
                                pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                            } else {
                                pageNum = currentPage - 2 + i;
                            }

                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === pageNum ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {pageNum}
                                </button>
                            );
                        })}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">...</span>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 1 && (
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === totalPages ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                {totalPages}
                            </button>
                        )}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            下一页
                        </button>
                    </div>
                </div>
            )}

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
                {loading ? (
                    <div className="text-center py-20" style={{ fontFamily: 'var(--font-content)' }}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <svg className="w-10 h-10 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            加载中...
                        </h3>
                    </div>
                ) : currentPosts.length > 0 ? (
                    <>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {currentPosts.map((post, index) => (
                                <div
                                    key={post.slug}
                                    className={`${index < 6 ? 'animate-fade-in-up' : ''}`}
                                    style={index >= 6 ? { animationDelay: `${(index - 6) * 0.1}s` } : {}}
                                >
                                    <div className="bg-white/95 dark:bg-gray-800/95 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-[1px] select-none user-select-none post-card-unselectable" style={{
                                        WebkitUserSelect: 'none',
                                        MozUserSelect: 'none',
                                        msUserSelect: 'none',
                                        userSelect: 'none'
                                    }}>
                                        <PostCard post={post} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-16 pt-8">
                                <div className="flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-content)' }}>
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        上一页
                                    </button>

                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === pageNum ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}

                                    {totalPages > 5 && currentPage < totalPages - 2 && (
                                        <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">...</span>
                                    )}

                                    {totalPages > 5 && currentPage < totalPages - 1 && (
                                        <button
                                            onClick={() => handlePageChange(totalPages)}
                                            className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === totalPages ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-300 dark:border-blue-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                        >
                                            {totalPages}
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        下一页
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-20" style={{ fontFamily: 'var(--font-content)' }}>
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                            </svg>
                        </div>

                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                            {selectedTag ? `没有找到标签为"${selectedTag}"的文章` : '还没有文章'}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
                            {selectedTag ? '尝试选择其他标签或查看全部文章。' : '博客刚刚建立，精彩内容即将上线。敬请期待技术心得与经验总结！'}
                        </p>

                        <Link
                            href={selectedTag ? "/blog" : "/home"}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:bg-blue-700 transition-all duration-300"
                        >
                            {selectedTag ? "查看全部文章" : "返回首页"}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </Link>
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
                <div className="text-center" style={{ fontFamily: 'var(--font-content)' }}>
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