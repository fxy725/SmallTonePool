"use client";

import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Header } from "@/components/layout/Header";
import { Post } from "@/types/blog";
import { useState, useEffect, useRef } from "react";

export default function Home() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        async function loadPosts() {
            try {
                const response = await fetch('/api/posts');
                const allPosts = await response.json();
                setPosts(allPosts.slice(0, 6));
            } catch (error) {
                console.error("Failed to load posts:", error);
            } finally {
                setLoading(false);
            }
        }

        loadPosts();
    }, []);

    // 拖拽滚动处理函数
    const handleMouseDown = (e: React.MouseEvent) => {
        if (!scrollContainerRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
        setScrollLeft(scrollContainerRef.current.scrollLeft);
    };

    const handleMouseLeave = () => {
        setIsDragging(false);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging || !scrollContainerRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 2; // 滚动速度
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    };

    const recentPosts = posts;

    return (
        <div className="min-h-screen">
            <Header />
            {/* Hero Section - 直接内联 */}
            <section className="relative min-h-screen flex justify-center overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900"></div>

                {/* Animated Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse"></div>
                    <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200 dark:bg-cyan-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
                    <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-indigo-200 dark:bg-indigo-800 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
                </div>

                {/* Floating Elements - render only on client after mounted to avoid hydration mismatch */}
                {mounted && (
                    <div className="absolute inset-0">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                                    animationDelay: `${Math.random() * 2}s`,
                                }}
                            />
                        ))}
                    </div>
                )}

                {/* Content */}
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className={`space-y-8 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                        {/* Logo */}
                        <div className="max-w-3xl mx-auto pt-24">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/assets/Logo-horizontal.png"
                                alt="Smalltone Logo"
                                className="w-full h-auto max-w-md mx-auto"
                            />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium">
                            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                                📚 项目介绍
                            </span>
                            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                                💡 技术探讨
                            </span>
                            <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">
                                📝 个人简历
                            </span>
                        </div>

                        {/* Description */}
                        <div className="max-w-3xl mx-auto space-y-6">
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                                分享编程路上的点点滴滴，记录技术成长的心路历程
                            </p>
                            <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                让每一次学习都有迹可循，让每个经验都能帮助他人，
                                在代码的世界里，我们都是不断成长的探索者。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-8 h-8 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>

                {/* Custom Animation */}
                <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(180deg); }
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
            </section>

            {/* Recent Posts Section */}
            <section className="relative py-20 bg-gray-50 dark:bg-gray-900/50">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            最新发布
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {loading ? (
                        <div className="text-center py-16">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                <svg className="w-8 h-8 text-gray-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                加载中...
                            </h3>
                        </div>
                    ) : (
                        <>
                            {/* Horizontal Scroll Container */}
                            <div className="relative">
                                {/* Scroll Indicators */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                                    <div className="w-8 h-16 bg-gradient-to-r from-gray-50 dark:from-gray-900/50 to-transparent"></div>
                                </div>
                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                                    <div className="w-8 h-16 bg-gradient-to-l from-gray-50 dark:from-gray-900/50 to-transparent"></div>
                                </div>

                                {/* Scrollable Posts */}
                                <div
                                    ref={scrollContainerRef}
                                    className="overflow-x-auto pb-6 scrollbar-hide cursor-grab active:cursor-grabbing select-none"
                                    onMouseDown={handleMouseDown}
                                    onMouseLeave={handleMouseLeave}
                                    onMouseUp={handleMouseUp}
                                    onMouseMove={handleMouseMove}
                                >
                                    <div className="flex gap-6 px-4" style={{ minWidth: 'max-content' }}>
                                        {recentPosts.map((post) => (
                                            <div
                                                key={post.slug}
                                                className="w-80 flex-shrink-0 transform transition-all duration-500 hover:scale-105"
                                            >
                                                <PostCard post={post} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Scroll Hint */}
                                <div className="text-center mt-4">
                                    <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                        鼠标拖拽查看更多文章
                                    </div>
                                </div>
                            </div>

                            {/* Empty State */}
                            {posts.length === 0 && (
                                <div className="text-center py-16">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mb-6">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                        暂无文章
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        敬请期待精彩内容...
                                    </p>
                                </div>
                            )}

                            {/* View All Button */}
                            {posts.length > 0 && (
                                <div className="text-center mt-16">
                                    <Link
                                        href="/blog"
                                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                                    >
                                        查看所有文章
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}
