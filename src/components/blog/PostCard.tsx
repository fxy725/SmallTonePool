"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Post } from "@/types/blog";
import { useState } from "react";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/blog/${post.slug}`}>
            <article
                className="group relative bg-white dark:bg-gray-800 rounded-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 interactive-card hover-lift cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
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

                <div className="relative p-6">
                    {/* Meta Information */}
                    <div className="flex items-center gap-3 mb-4 text-sm text-gray-500 dark:text-gray-400">
                        <time
                            dateTime={post.date}
                            className="flex items-center gap-1"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(post.date)}
                        </time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold mb-3 leading-tight">
                        <span className="text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                            {post.title}
                        </span>
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                        {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <button
                                    key={tag}
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
                                    className={`px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-600 hover-scale ${isHovered ? `animate-bounce-in animation-delay-${index * 100}` : ''}`}
                                >
                                    {tag}
                                </button>
                            ))}
                            {post.tags.length > 3 && (
                                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs font-medium rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
