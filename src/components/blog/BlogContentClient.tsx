"use client";

import { PostCard } from "@/components/blog/PostCard";
import { Post, Tag } from "@/types/blog";
import { useState, useEffect, useMemo, useCallback } from "react";

interface BlogContentClientProps {
    posts: Post[];
    tags: Tag[];
}

export default function BlogContentClient({ posts: initialPosts, tags: initialTags }: BlogContentClientProps) {
    // 状态初始化自服务端传入的数据
    const [posts] = useState<Post[]>(() => initialPosts);
    const [tags] = useState<Tag[]>(() => initialTags);
    const [selectedTag, setSelectedTag] = useState<string>('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading] = useState(false);
    const [isLoadingTags] = useState(false);
    const postsPerPage = 12;

    // 根据标签筛选文章 - 使用 useMemo 优化
    const filteredPosts = useMemo(() =>
        selectedTag
            ? posts.filter(post => post.tags.includes(selectedTag))
            : posts,
        [posts, selectedTag]
    );

    // 分页计算 - 使用 useMemo 优化
    const paginationData = useMemo(() => {
        const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
        const startIndex = (currentPage - 1) * postsPerPage;
        const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);
        return { totalPages, currentPosts };
    }, [filteredPosts, currentPage, postsPerPage]);

    const { totalPages, currentPosts } = paginationData;

    // 当当前页改变时预加载下一页
    useEffect(() => {
        const currentTotalPages = Math.ceil(filteredPosts.length / postsPerPage);
        if (currentPage < currentTotalPages) {
            const nextPagePosts = filteredPosts.slice(
                (currentPage) * postsPerPage,
                (currentPage + 1) * postsPerPage
            );
            // 预加载下一页文章的缩略图等资源
            nextPagePosts.forEach(post => {
                const img = new Image();
                img.src = `/api/og?title=${encodeURIComponent(post.title)}`;
            });
        }
    }, [currentPage, filteredPosts, postsPerPage]);

    // 从URL参数获取标签和页码
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tag = urlParams.get('tag') || '';
        const page = parseInt(urlParams.get('page') || '1', 10);
        setSelectedTag(tag);
        setCurrentPage(Math.max(1, page));
    }, []);

    // 处理标签点击 - 使用 useCallback 优化
    const handleTagClick = useCallback((tag: string) => {
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
        url.searchParams.delete('page');
        window.history.pushState({}, '', url);
    }, [selectedTag]);

    // 处理翻页 - 使用 useCallback 优化
    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 更新URL中的页码参数
        const url = new URL(window.location.href);
        if (page > 1) {
            url.searchParams.set('page', page.toString());
        } else {
            url.searchParams.delete('page');
        }
        window.history.pushState({}, '', url);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* 顶部控制区：标签栏 + 顶部分页（统一容器控制与文章列表的间距） */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 mb-6" style={{ fontFamily: 'var(--font-content)' }}>
                <div className="flex flex-wrap gap-3 justify-center">
                    <button
                        onClick={() => handleTagClick('')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedTag === '' ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                    >
                        ALL
                    </button>
                    {!isLoadingTags && tags.map((tag) => (
                        <button
                            key={tag.name}
                            onClick={() => handleTagClick(tag.name)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedTag === tag.name ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>

                {totalPages > 1 && !isLoading && (
                    <div className="flex items-center justify-center gap-2 mt-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            上一页
                        </button>

                        {(() => {
                            const pageNumbers = [] as number[];
                            const maxVisiblePages = 5;

                            if (totalPages <= maxVisiblePages) {
                                for (let i = 1; i <= totalPages; i++) {
                                    pageNumbers.push(i);
                                }
                            } else {
                                let startPage = Math.max(1, currentPage - 2);
                                let endPage = Math.min(totalPages, currentPage + 2);

                                if (endPage - startPage + 1 < maxVisiblePages) {
                                    if (startPage === 1) {
                                        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                                    } else if (endPage === totalPages) {
                                        startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                    }
                                }

                                for (let i = startPage; i <= endPage; i++) {
                                    pageNumbers.push(i);
                                }
                            }

                            return pageNumbers.map(pageNum => (
                                <button
                                    key={pageNum}
                                    onClick={() => handlePageChange(pageNum)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === pageNum ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {pageNum}
                                </button>
                            ));
                        })()}

                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">...</span>
                        )}

                        {totalPages > 5 && currentPage < totalPages - 1 && (
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                {totalPages}
                            </button>
                        )}

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                        >
                            下一页
                        </button>
                    </div>
                )}
            </div>

            {/* Posts Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-8">
                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {currentPosts.map((post, index) => (
                            <div
                                key={post.slug}
                                className={`${index < 6 ? 'animate-fade-in-up' : ''}`}
                                style={index >= 6 ? { animationDelay: `${(index - 6) * 0.1}s` } : {}}
                            >
                                <div className="bg-white/95 dark:bg-gray-800/95 rounded-xl border border-gray-200 dark:border-gray-700 backdrop-blur-[1px]">
                                    <PostCard post={post} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!isLoading && currentPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-gray-500 dark:text-gray-400 text-lg">
                            {selectedTag ? `没有找到标签 "${selectedTag}" 相关的文章` : '暂无文章'}
                        </div>
                    </div>
                )}

                {/* Bottom Pagination - 使用相同的优化逻辑 */}
                {totalPages > 1 && !isLoading && (
                    <div className="mt-8 pt-4">
                        <div className="flex items-center justify-center gap-2" style={{ fontFamily: 'var(--font-content)' }}>
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                上一页
                            </button>

                            {(() => {
                                const pageNumbers = [] as number[];
                                const maxVisiblePages = 5;

                                if (totalPages <= maxVisiblePages) {
                                    for (let i = 1; i <= totalPages; i++) {
                                        pageNumbers.push(i);
                                    }
                                } else {
                                    let startPage = Math.max(1, currentPage - 2);
                                    let endPage = Math.min(totalPages, currentPage + 2);

                                    if (endPage - startPage + 1 < maxVisiblePages) {
                                        if (startPage === 1) {
                                            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                                        } else if (endPage === totalPages) {
                                            startPage = Math.max(1, endPage - maxVisiblePages + 1);
                                        }
                                    }

                                    for (let i = startPage; i <= endPage; i++) {
                                        pageNumbers.push(i);
                                    }
                                }

                                return pageNumbers.map(pageNum => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === pageNum ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                    >
                                        {pageNum}
                                    </button>
                                ));
                            })()}

                            {totalPages > 5 && currentPage < totalPages - 2 && (
                                <span className="px-3 py-1 text-gray-500 dark:text-gray-400 text-sm">...</span>
                            )}

                            {totalPages > 5 && currentPage < totalPages - 1 && (
                                <button
                                    onClick={() => handlePageChange(totalPages)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'bg-gray-100 dark:bg-gray-700/50' : 'border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                                >
                                    {totalPages}
                                </button>
                            )}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                            >
                                下一页
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


