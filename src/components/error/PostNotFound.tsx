import Link from 'next/link';

interface PostNotFoundProps {
    slug: string;
}

export function PostNotFound({ slug }: PostNotFoundProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="text-gray-400 dark:text-gray-600 mb-8">
                    <svg className="w-32 h-32 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    文章未找到
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                    抱歉，您访问的文章 &quot;{slug}&quot; 不存在或已被删除。
                </p>

                <div className="text-gray-500 dark:text-gray-400 mb-8">
                    <p className="mb-2">可能的原因：</p>
                    <ul className="text-left max-w-md mx-auto space-y-1">
                        <li>• 文章链接错误</li>
                        <li>• 文章已被删除</li>
                        <li>• 文章尚未发布</li>
                        <li>• 链接已过期</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/blog"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        返回文章列表
                    </Link>

                    <Link
                        href="/home"
                        className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        返回首页
                    </Link>
                </div>

                <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
                    <p>如果您认为这是一个错误，请联系网站管理员。</p>
                </div>
            </div>
        </div>
    );
}
