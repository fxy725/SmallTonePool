"use client";

import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Header } from "@/components/layout/Header";
import { Post } from "@/types/blog";
import { useState, useEffect, useRef } from "react";

export default function HomeClientPage({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 触摸事件状态
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchScrollLeft, setTouchScrollLeft] = useState(0);
  const [isTouchScrolling, setIsTouchScrolling] = useState(false);

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const oneSetWidthRef = useRef(0);
  const SPEED_PX_PER_SEC = 120; // 自动滚动速度（像素/秒）
  const dragMovedRef = useRef(false); // 拖拽移动阈值标记，避免误触点击
  const DRAG_CLICK_SUPPRESS_THRESHOLD_PX = 8; // 拖拽判定阈值（像素）
  const isHoveringRef = useRef(false); // 记录鼠标是否悬停，避免误恢复自动滚动
  const isPageScrollingRef = useRef(false); // 记录页面是否处于垂直滚动中
  const pageScrollIdleTimerRef = useRef<NodeJS.Timeout | null>(null); // 垂直滚动停止后的恢复定时器

  useEffect(() => {
    setMounted(true);
  }, []);

  // 如果服务端传入的 posts 变化（例如 ISR），同步到客户端 state
  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  // 精确测量一组宽度，并初始化至中间组的起点
  useEffect(() => {
    if (!scrollContainerRef.current || posts.length === 0) return;

    const container = scrollContainerRef.current;

    const measure = () => {
      try {
        const items = container.querySelectorAll('[data-scroll-item="true"]');
        if (items.length >= posts.length * 2) {
          const first = items[0] as HTMLElement;
          const secondGroupFirst = items[posts.length] as HTMLElement;
          const width = secondGroupFirst.offsetLeft - first.offsetLeft;
          if (width > 0) {
            oneSetWidthRef.current = width;
            container.style.scrollBehavior = 'auto';
            container.scrollLeft = width;
          }
        } else {
          const fallback = (320 + 24) * posts.length;
          oneSetWidthRef.current = fallback;
          container.style.scrollBehavior = 'auto';
          container.scrollLeft = fallback;
        }
      } catch {
        // 忽略测量失败
      }
    };

    const raf = requestAnimationFrame(measure);
    return () => cancelAnimationFrame(raf);
  }, [posts.length]);

  // 全局鼠标事件处理，确保拖拽在鼠标离开容器时也能正常工作
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        setTimeout(() => setIsAutoScrolling(true), 2000);
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging && scrollContainerRef.current) {
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        scrollContainerRef.current.scrollLeft = scrollLeft - walk;
      }
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mousemove', handleGlobalMouseMove);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [isDragging, startX, scrollLeft]);

  // 自动滚动逻辑 - 基于 deltaTime 的速度控制，并在边界处瞬时重置
  useEffect(() => {
    if (!scrollContainerRef.current || !isAutoScrolling || posts.length === 0) return;

    const container = scrollContainerRef.current;
    let animationId = 0;
    let lastTime = 0;
    let isActive = true;

    const step = (currentTime: number) => {
      if (!isActive) return;

      if (lastTime === 0) {
        lastTime = currentTime;
      } else {
        const dt = (currentTime - lastTime) / 1000; // 秒
        const distance = SPEED_PX_PER_SEC * dt;
        // 一次读取与一次写入，避免交错读写引发布局抖动
        const nextLeft = container.scrollLeft + distance;
        const oneSet = oneSetWidthRef.current || (320 + 24) * posts.length;
        container.scrollLeft = nextLeft >= oneSet * 2 ? nextLeft - oneSet : nextLeft;

        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    return () => {
      isActive = false;
      cancelAnimationFrame(animationId);
    };
  }, [isAutoScrolling, posts.length]);

  // 监听窗口垂直滚动：滚动过程中暂停自动横向滚动，空闲后延时恢复
  useEffect(() => {
    const handleWindowScroll = () => {
      if (pageScrollIdleTimerRef.current) {
        clearTimeout(pageScrollIdleTimerRef.current);
      }
      // 若当前正在自动滚动，则先暂停
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
      isPageScrollingRef.current = true;
      pageScrollIdleTimerRef.current = setTimeout(() => {
        isPageScrollingRef.current = false;
        if (!isDragging && !isHoveringRef.current) {
          setIsAutoScrolling(true);
        }
      }, 250);
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleWindowScroll);
      if (pageScrollIdleTimerRef.current) {
        clearTimeout(pageScrollIdleTimerRef.current);
        pageScrollIdleTimerRef.current = null;
      }
    };
  }, [isDragging, isAutoScrolling]);

  // 仅当列表可见时才允许自动滚动
  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const isVisible = entry.isIntersecting && entry.intersectionRatio > 0.2;
        if (!isVisible) {
          if (isAutoScrolling) setIsAutoScrolling(false);
        } else {
          if (!isDragging && !isHoveringRef.current && !isPageScrollingRef.current && !isAutoScrolling) {
            setIsAutoScrolling(true);
          }
        }
      },
      { threshold: [0, 0.2, 0.5, 1] }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [isDragging, isAutoScrolling]);

  // 拖拽滚动处理函数
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setIsAutoScrolling(false);
    dragMovedRef.current = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      e.stopPropagation();
      if (scrollContainerRef.current) {
        const delta = e.key === 'ArrowLeft' ? -200 : 200;
        scrollContainerRef.current.scrollBy({ left: delta, behavior: 'smooth' });
        setIsAutoScrolling(false);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setTimeout(() => setIsAutoScrolling(true), 2000);
      if (dragMovedRef.current) {
        (window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__ = true;
        setTimeout(() => {
          (window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__ = false;
        }, 300);
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const delta = x - startX;
    const walk = delta * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    if (Math.abs(delta) > DRAG_CLICK_SUPPRESS_THRESHOLD_PX) {
      dragMovedRef.current = true;
    }
  };

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (!isDragging) {
      setIsAutoScrolling(false);
    }
  };

  const handleMouseLeaveContainer = () => {
    isHoveringRef.current = false;
    if (!isDragging && !isPageScrollingRef.current) {
      setTimeout(() => setIsAutoScrolling(true), 1000);
    }
  };

  // 触摸事件处理 - 移动端支持
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const touch = e.touches[0];
    setTouchStartX(touch.clientX);
    setTouchStartY(touch.clientY);
    setTouchScrollLeft(scrollContainerRef.current.scrollLeft);
    setIsAutoScrolling(false);
    setIsTouchScrolling(false);
    dragMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollContainerRef.current) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 15) {
      e.preventDefault();
      setIsTouchScrolling(true);
      const newScrollLeft = touchScrollLeft - deltaX;
      scrollContainerRef.current.scrollLeft = newScrollLeft;
      if (Math.abs(deltaX) > DRAG_CLICK_SUPPRESS_THRESHOLD_PX) {
        dragMovedRef.current = true;
      }
    }
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsAutoScrolling(true);
      setIsTouchScrolling(false);
    }, 2000);
    if (dragMovedRef.current) {
      (window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__ = true;
      setTimeout(() => {
        (window as Window & { __suppressNextPostClick__?: boolean }).__suppressNextPostClick__ = false;
        dragMovedRef.current = false;
      }, 100);
    } else {
      dragMovedRef.current = false;
    }
  };

  const recentPosts = posts.slice(0, 7);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
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
              <img src="/assets/Logo-horizontal.png" alt="Smalltone Logo" className="w-full h-auto max-w-md mx-auto" />
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-lg md:text-xl text-gray-600 dark:text-gray-400 font-medium text-hero theme-color-sync">
              <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">📚 项目介绍</span>
              <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">💡 技术探讨</span>
              <span className="px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50">📝 个人简历</span>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto space-y-6">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed text-hero">分享编程路上的点点滴滴，记录技术成长的心路历程</p>
              <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed text-hero">
                让每一次学习都有迹可循，让每个经验都能帮助他人， 在代码的世界里，我们都是不断成长的探索者。
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
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .cursor-grab { cursor: grab; }
          .cursor-grabbing { cursor: grabbing; }
          .post-card-unselectable {
            -webkit-backface-visibility: hidden; backface-visibility: hidden; perspective: 1000px;
            will-change: transform; transform: translateZ(0);
            -webkit-user-select: none; user-select: none; -webkit-touch-callout: none; -webkit-tap-highlight-color: transparent;
          }
          .scroll-container-bg { background-color: #f9fafb; }
          @media (prefers-color-scheme: dark) { .scroll-container-bg { background-color: #111827; } }
        `}</style>
      </section>

      {/* Recent Posts Section */}
      <section className="relative py-20 bg-gray-50 dark:bg-gray-900">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl" style={{ fontFamily: 'var(--font-tech-stack)' }}>最新发布</span>
            </div>
          </div>

          {/* Posts Slider */}
          <div className="relative">
            {/* Left/Right Indicators */}
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <div className="absolute -right-12 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
              <svg className="w-8 h-8 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Fade gradients */}
            <div className="absolute left-0 top-0 bottom-6 w-24 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-6 w-24 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

            {/* Scrollable Posts */}
            <div
              ref={scrollContainerRef}
              className={`overflow-x-auto pb-6 scrollbar-hide select-none outline-none focus:outline-none user-select-none post-card-unselectable scroll-container-bg ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onKeyDown={handleKeyDown}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeaveContainer}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              tabIndex={0}
              onContextMenu={(e) => e.preventDefault()}
              onClickCapture={(e) => {
                if (dragMovedRef.current || isTouchScrolling) {
                  e.preventDefault();
                  e.stopPropagation();
                  dragMovedRef.current = false;
                }
              }}
              style={{
                WebkitUserSelect: 'none', userSelect: 'none', scrollBehavior: 'auto',
                WebkitOverflowScrolling: 'touch', willChange: 'scroll-position', transform: 'translateZ(0)',
                WebkitTouchCallout: 'none', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation'
              }}
            >
              <div className="flex gap-6" style={{ minWidth: 'max-content' }}>
                {[...recentPosts, ...recentPosts, ...recentPosts].map((post, index) => (
                  <div data-scroll-item="true" key={`${post.slug}-${index}`} className="w-80 flex-shrink-0">
                    <PostCard post={post} requireDoubleClick={true} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 用户提示 */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 text-center" style={{ fontFamily: 'var(--font-tech-stack)' }}>
            （鼠标悬浮以暂停，拖曳以滑动）
          </p>

          {/* 查看更多 */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px]" style={{ fontFamily: 'var(--font-tech-stack)' }}>
              <Link href="/blog" className="inline-flex items-center gap-3 text-blue-700 dark:text-blue-300">
                <span className="text-lg font-medium">查看更多文章</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

