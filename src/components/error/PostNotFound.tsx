import Link from 'next/link';

interface PostNotFoundProps {
    slug: string;
}

export function PostNotFound({ slug }: PostNotFoundProps) {
    // 处理超长文本，限制显示长度
    const displaySlug = slug.length > 30 
        ? slug.substring(0, 27) + '...' 
        : slug;
    const isDebug = slug === '__debug-not-found__';

    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50 dark:bg-gray-950" style={{ fontFamily: 'var(--font-content)' }}>
            <div className="text-center max-w-md">
                <div className="mb-8">
                    <div className="w-20 h-20 mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-lg transform rotate-3"></div>
                        <div className="absolute inset-0 bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center transform -rotate-3 shadow-sm">
                            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-sm"></div>
                        </div>
                    </div>
                </div>
                
                <h1 className="text-3xl font-light text-gray-900 dark:text-gray-100 mb-4 tracking-wide">
                    文章未找到
                </h1>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                    您访问的文章 <span className="text-gray-800 dark:text-gray-200 font-medium break-all">&quot;{displaySlug}&quot;</span> 不存在或已被移除。
                </p>

                {isDebug && (
                    <div className="mb-8 px-4 py-3 rounded-lg border border-amber-300/70 dark:border-amber-700/70 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm leading-relaxed">
                        提示：你是通过列表底部的“文章未发现（调试）”进入的，这是一个用于开发调试的快捷按钮，方便快速验证“文章未发现”页面的样式与交互。该链接不会指向真实文章。
                    </div>
                )}
                
                <div className="flex items-center justify-center gap-3">
                    <Link
                        href="/blog"
                        scroll={false}
                        className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-200"
                    >
                        返回文章列表
                    </Link>
                    
                    <Link
                        href="/home"
                        scroll={false}
                        className="px-4 py-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                        回到首页
                    </Link>
                </div>
            </div>
        </div>
    );
}
