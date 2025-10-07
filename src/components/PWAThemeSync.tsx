"use client";

import { useEffect } from "react";

export function PWAThemeSync() {
    useEffect(() => {
        // 动态更新状态栏颜色
        const updateThemeColor = () => {
            const theme = localStorage.getItem("theme") || "system";
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const isDark = theme === "dark" || (theme === "system" && systemDark);

            // 读取设计系统颜色变量，尽量与页面背景完全一致
            const rootStyles = getComputedStyle(document.documentElement);
            const bgPrimary = (rootStyles.getPropertyValue("--bg-primary") || '').trim();
            const fallback = isDark ? "#0f172a" : "#f9fafb";
            const resolved = bgPrimary || fallback;

            // 更新 theme-color（影响地址栏/状态栏）
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');
            if (themeColorMeta) themeColorMeta.setAttribute("content", resolved);

            // iOS PWA 状态栏：只能在 fixed 预设里选，取近似
            const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
            if (statusBarMeta) statusBarMeta.setAttribute("content", isDark ? "black" : "default");

            // Windows 磁贴颜色
            const tileMeta = document.querySelector('meta[name="msapplication-TileColor"]');
            if (tileMeta) tileMeta.setAttribute("content", resolved);
        };

        // 初始化
        updateThemeColor();

        // 监听主题变化
        const observer = new MutationObserver(() => {
            updateThemeColor();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        });

        // 监听系统主题变化
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", updateThemeColor);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener("change", updateThemeColor);
        };
    }, []);

    return null;
}
