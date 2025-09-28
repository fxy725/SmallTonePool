"use client";

import { useEffect } from "react";

export function PWAInstall() {
    useEffect(() => {
        if (
            typeof window !== "undefined" &&
            "serviceWorker" in navigator &&
            process.env.NODE_ENV === "production"
        ) {
            navigator.serviceWorker
                .register("/sw.js", { scope: "/" })
                .then((registration) => {
                    console.log("SW 注册成功:", registration);
                })
                .catch((registrationError) => {
                    console.error("SW 注册失败:", registrationError);
                });
        }
    }, []);

    return null;
}
