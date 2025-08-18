"use client";

import { useState } from 'react';

export default function EmailContact() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = async () => {
        try {
            await navigator.clipboard.writeText('849517015@qq.com');
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy email:', err);
        }
    };

    return (
        <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
                有任何问题或想要交流技术话题，欢迎通过邮箱联系我：
            </p>

            <button
                onClick={handleCopyEmail}
                aria-pressed={copied}
                aria-label={copied ? `已复制 849517015@qq.com` : `复制邮箱 849517015@qq.com`}
                className={
                    `inline-flex items-center gap-2 px-4 py-2 rounded-full focus:outline-none focus:ring-2 transition` +
                    (copied ? ' bg-green-600 text-white focus:ring-green-600/30' : ' bg-white/90 dark:bg-gray-800/70 text-gray-700 dark:text-gray-300')
                }
            >
                <span className="flex items-center gap-1 text-sm truncate">
                    <svg className="w-4 h-4 text-current" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate max-w-[14rem] text-sm font-medium select-text">849517015@qq.com</span>
                </span>

                <span className="flex items-center justify-center">
                    {!copied ? (
                        <svg className="w-4 h-4 icon-copy-button" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8M8 12h8m-7-4h6" />
                        </svg>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-xs font-medium">已复制</span>
                        </span>
                    )}
                </span>
            </button>
        </div>
    );
}