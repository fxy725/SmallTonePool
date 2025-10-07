"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export function BackToListButton() {
  const router = useRouter();

  const goBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // 优先使用历史返回，保留原页面滚动位置
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
      return;
    }
    // 无历史可返回（如直接打开详情页），则兜底跳到列表页
    router.push('/blog');
  };

  return (
    <Link
      href="/blog"
      onClick={goBack}
      className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400"
      style={{ fontFamily: 'var(--font-tech-stack)' }}
    >
      返回文章列表
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}
