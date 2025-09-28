"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TripleThemeToggle } from "@/components/ui/ThemeToggle";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${isScrolled
        ? "bg-white/20 dark:bg-gray-900/20 backdrop-blur-xl"
        : "bg-white/5 dark:bg-gray-900/5 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 桌面端左侧占位区域 - 用于平衡布局 */}
          <div className="hidden md:block w-32"></div>

          {/* Desktop Navigation - 绝对居中 */}
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 transform -translate-x-1/2">
            <NavLink href="/home" className="font-hero">
              首页
            </NavLink>
            <NavLink href="/blog" className="font-hero">
              文章
            </NavLink>
            <NavLink href="/about" className="font-hero">
              关于
            </NavLink>
          </nav>

          {/* Desktop Theme Toggle - 右侧固定 */}
          <div className="hidden md:block">
            <TripleThemeToggle />
          </div>

          {/* 移动端导航 - 顶栏显示 */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* 移动端导航链接 */}
            <nav className="flex items-center gap-6 flex-1 justify-center">
              <MobileNavLink
                href="/home"
                onClick={() => setIsMenuOpen(false)}
                className="font-hero text-base"
              >
                首页
              </MobileNavLink>
              <MobileNavLink
                href="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="font-hero text-base"
              >
                文章
              </MobileNavLink>
              <MobileNavLink
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="font-hero text-base"
              >
                关于
              </MobileNavLink>
            </nav>

            {/* 移动端展开按钮 */}
            <button
              className="p-2 transition-colors bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg ml-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle theme menu"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Theme Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200 dark:border-gray-700 bg-transparent">
            <div className="flex items-center justify-center">
              <TripleThemeToggle />
            </div>
          </div>
        )}
      </div>

      {/* 局部覆盖：移除导航链接的焦点轮廓 */}
      <style jsx global>{`
        a.nav-link:focus,
        a.nav-link:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </header>
  );
}

function NavLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`nav-link relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-lg px-2 py-2 select-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full"></span>
    </Link>
  );
}

function MobileNavLink({
  href,
  onClick,
  children,
  className = "",
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`nav-link relative group text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium px-2 py-1 select-none focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 transition-colors duration-200 ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}
