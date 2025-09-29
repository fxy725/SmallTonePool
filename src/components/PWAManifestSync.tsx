"use client";

import { useEffect } from "react";

export function PWAManifestSync() {
    useEffect(() => {
        // 动态更新manifest背景色以匹配当前主题
        const updateManifestCache = () => {
            const theme = localStorage.getItem("theme") || "system";
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const isDark = theme === "dark" || (theme === "system" && systemDark);

            // 更新manifest的主题参数
            const manifestLink = document.querySelector('link[rel="manifest"]') as HTMLLinkElement;
            if (manifestLink) {
                const baseUrl = '/api/manifest';
                const url = new URL(baseUrl, window.location.origin);
                url.searchParams.set('theme', isDark ? 'dark' : 'light');
                manifestLink.href = url.toString();
            }
        };

        // 监听主题变化
        const observer = new MutationObserver(() => {
            updateManifestCache();
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        });

        // 监听系统主题变化
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQuery.addEventListener("change", updateManifestCache);

        return () => {
            observer.disconnect();
            mediaQuery.removeEventListener("change", updateManifestCache);
        };
    }, []);

    return null;
}
