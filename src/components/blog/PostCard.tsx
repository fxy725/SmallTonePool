"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "@/types/blog";
import { useState } from "react";
import React from "react";

interface PostCardProps {
    post: Post;
    requireDoubleClick?: boolean;
}

export function PostCard({ post, requireDoubleClick = false }: PostCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // 触摸事件状态
    const [touchStartTime, setTouchStartTime] = useState(0);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [hasMoved, setHasMoved] = useState(false);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };
    // const [clickCount, setClickCount] = useState(0);
    // const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

    // 触摸事件处理函数
    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setTouchStartTime(Date.now());
        setTouchStartX(touch.clientX);
        setTouchStartY(touch.clientY);
        setHasMoved(false);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const deltaX = Math.abs(touch.clientX - touchStartX);
        const deltaY = Math.abs(touch.clientY - touchStartY);

        // 如果移动距离超过阈值，标记为已移动
        if (deltaX > 10 || deltaY > 10) {
            setHasMoved(true);

            // 只在水平滚动列表中且水平移动大于垂直移动时才阻止默认行为
            if (requireDoubleClick && deltaX > deltaY && deltaX > 15) {
                e.preventDefault();
            }
        }
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const touchEndTime = Date.now();
        const touchDuration = touchEndTime - touchStartTime;

        // 如果不是水平滚动列表，简化处理
        if (!requireDoubleClick) {
            // 在博客列表页，允许快速点击通过
            if (!hasMoved || touchDuration < 200) {
                return; // 允许点击事件继续
            }
        } else {
            // 在水平滚动列表中，更严格的处理
            if (!hasMoved && touchDuration < 300) {
                return; // 允许点击事件继续
            }

            // 如果有移动，则阻止点击
            if (hasMoved && touchDuration < 500) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    };

    return (
        <Link href={`/blog/${post.slug}`} draggable={false} prefetch={true} onClick={(e) => {
            // 若外层容器在拖拽中设置了抑制标记，这里仍会被捕获，保底阻止
            if ((window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__) {
                e.preventDefault();
                e.stopPropagation();
                (window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__ = false;
                return;
            }

            // 在水平滚动列表中，如果刚发生移动，则阻止点击
            if (requireDoubleClick && hasMoved) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }}>
            <article
                className={`group relative bg-white/95 dark:bg-gray-800/95 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 backdrop-blur-[1px] select-none user-select-none post-card-unselectable ${requireDoubleClick ? 'cursor-grab' : 'cursor-pointer'}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onMouseDown={(e) => e.preventDefault()}
                onMouseUp={(e) => e.preventDefault()}
                onMouseMove={(e) => e.preventDefault()}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                onDragEnd={(e) => e.preventDefault()}
                onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
                onDoubleClick={(e: React.MouseEvent) => e.preventDefault()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    userSelect: 'none',
                    WebkitTouchCallout: 'none',
                    KhtmlUserSelect: 'none',
                    // 在移动端允许垂直滚动，只在水平滚动列表中限制水平滑动
                    touchAction: requireDoubleClick ? 'manipulation' : 'auto'
                }}
            >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-600 animate-pulse-glow"></div>
                    <div className="absolute inset-0 brand-pattern-dots"></div>
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                <div
                    className="relative p-6 select-none user-select-none post-card-unselectable"
                    style={{
                        fontFamily: 'var(--font-content)',
                        WebkitUserSelect: 'none',
                        MozUserSelect: 'none',
                        msUserSelect: 'none',
                        userSelect: 'none'
                    }}
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseUp={(e) => e.preventDefault()}
                    onMouseMove={(e: React.MouseEvent) => e.preventDefault()}
                    onDoubleClick={(e: React.MouseEvent) => e.preventDefault()}
                >
                    {/* Meta Information */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400 select-none user-select-none post-card-unselectable">
                        <time
                            dateTime={post.date}
                            className="flex items-center gap-1 select-none user-select-none post-card-unselectable"
                            style={{ pointerEvents: 'none' }}
                        >
                            <svg className="w-4 h-4 select-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.date)}
                        </time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 leading-tight select-none user-select-none post-card-unselectable" style={{ pointerEvents: 'none' }}>
                        <span className="text-gray-900 dark:text-white line-clamp-2 select-none user-select-none post-card-unselectable">
                            {post.title}
                        </span>
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3 select-none user-select-none post-card-unselectable" style={{ pointerEvents: 'none' }}>
                        {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 select-none user-select-none post-card-unselectable" style={{ pointerEvents: 'none' }}>
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <div
                                    key={tag}
                                    className="inline-block"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        if (pathname === '/blog') {
                                            // 如果在文章页，进行过滤
                                            const url = new URL(window.location.href);
                                            if (url.searchParams.get('tag') === tag) {
                                                url.searchParams.delete('tag');
                                            } else {
                                                url.searchParams.set('tag', tag);
                                            }
                                            router.push(url.pathname + url.search);
                                        } else {
                                            // 如果在其他页面，跳转到文章页并过滤
                                            router.push(`/blog?tag=${encodeURIComponent(tag)}`);
                                        }
                                    }}
                                >
                                    <span
                                        className={`px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-600 hover-scale select-none user-select-none post-card-unselectable inline-block ${isHovered ? `animate-bounce-in animation-delay-${index * 100}` : ''}`}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        {tag}
                                    </span>
                                </div>
                            ))}
                            {post.tags.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 select-none user-select-none post-card-unselectable" style={{ pointerEvents: 'none' }}>
                                    +{post.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
}
