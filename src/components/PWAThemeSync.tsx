"use client";

import { useEffect } from "react";

export function PWAThemeSync() {
    useEffect(() => {
        // 动态更新状态栏颜色
        const updateThemeColor = () => {
            const theme = localStorage.getItem("theme") || "system";
            const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            const isDark = theme === "dark" || (theme === "system" && systemDark);

            // 更新theme-color meta标签
            const themeColorMeta = document.querySelector('meta[name="theme-color"]');
            if (themeColorMeta) {
                themeColorMeta.setAttribute("content", isDark ? "#000000" : "#ffffff");
            }

            // 为iOS更新状态栏样式
            const statusBarMeta = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
            if (statusBarMeta) {
                statusBarMeta.setAttribute("content", isDark ? "black" : "default");
            }

            // 更新Microsoft瓦片颜色
            const tileMeta = document.querySelector('meta[name="msapplication-TileColor"]');
            if (tileMeta) {
                tileMeta.setAttribute("content", isDark ? "#000000" : "#ffffff");
            }
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
