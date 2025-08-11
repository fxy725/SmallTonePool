"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { searchPosts } from "@/lib/posts";
import { Post } from "@/types/post";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim()) {
        const searchResults = await searchPosts(query);
        setResults(searchResults);
      } else {
        setResults([]);
      }
    };
    
    handleSearch();
  }, [query]);

  const handleResultClick = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          placeholder="搜索文章..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-64 px-4 py-2 pl-10 pr-4 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <svg
          className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="p-2">
              {results.slice(0, 10).map((post) => (
                <button
                  key={post.slug}
                  onClick={() => handleResultClick(post.slug)}
                  className="w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <div className="font-medium text-gray-900 dark:text-white mb-1">
                    {post.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {post.summary}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
                    {post.readingTime && (
                      <span>· {post.readingTime}分钟</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              没有找到相关文章
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}