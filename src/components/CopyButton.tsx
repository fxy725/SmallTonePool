'use client';

import { useState, useEffect } from 'react';

interface CopyToastProps {
    message: string;
    isVisible: boolean;
    onHide: () => void;
}

export function CopyToast({ message, isVisible, onHide }: CopyToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onHide();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onHide]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-4 right-4 z-50 transform transition-all duration-300 ease-out">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">{message}</span>
            </div>
        </div>
    );
}

interface CopyButtonProps {
    text: string;
    children: React.ReactNode;
    className?: string;
    successMessage?: string;
    style?: React.CSSProperties;
}

export function CopyButton({ text, children, className, successMessage = "已复制到剪贴板", style }: CopyButtonProps) {
    const [showToast, setShowToast] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setShowToast(true);
        } catch {/* 降级处理已注释掉 */
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                setShowToast(true);
            } catch (err) {
                console.error('复制失败:', err);
            }
            
            document.body.removeChild(textArea);
        }
    };

    return (
        <>
            <button
                onClick={handleCopy}
                className={className}
                style={style}
                title="点击复制"
            >
                {children}
            </button>
            <CopyToast
                message={successMessage}
                isVisible={showToast}
                onHide={() => setShowToast(false)}
            />
        </>
    );
}