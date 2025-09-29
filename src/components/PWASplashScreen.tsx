"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function PWASplashScreen() {
    const [isVisible, setIsVisible] = useState(false);
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        // 检查是否是PWA模式启动
        const isPWA = window.matchMedia("(display-mode: standalone)").matches ||
            ("standalone" in window.navigator && (window.navigator as { standalone?: boolean }).standalone) ||
            document.referrer.includes("android-app://");

        if (isPWA) {
            setIsVisible(true);

            // 检测主题
            const currentTheme = localStorage.getItem("theme") || "system";
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const isDark = currentTheme === "dark" || (currentTheme === "system" && systemDark);

            setTheme(isDark ? "dark" : "light");

            // 3秒后隐藏开屏画面
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ${theme === "dark" ? "bg-black" : "bg-white"
                }`}
        >
            {/* Logo动画 */}
            <div className="flex flex-col items-center justify-center animate-pulse">
                <div className="relative mb-6">
                    <Image
                        src="/assets/Logo.png"
                        alt="小石潭记"
                        width={120}
                        height={120}
                        className="rounded-2xl shadow-lg animate-bounce"
                        priority
                    />
                </div>

                {/* 应用名称 */}
                <h1 className={`text-2xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                    小石潭记
                </h1>

                {/* 副标题 */}
                <p className={`text-sm opacity-70 ${theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }`}>
                    分享编程路上的点点滴滴
                </p>

                {/* 加载动画 */}
                <div className="mt-8 flex space-x-1">
                    <div className={`w-2 h-2 rounded-full animate-bounce ${theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                        }`} style={{ animationDelay: "0ms" }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                        }`} style={{ animationDelay: "150ms" }}></div>
                    <div className={`w-2 h-2 rounded-full animate-bounce ${theme === "dark" ? "bg-blue-400" : "bg-blue-500"
                        }`} style={{ animationDelay: "300ms" }}></div>
                </div>
            </div>
        </div>
    );
}
