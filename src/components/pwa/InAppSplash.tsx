"use client";

import { useEffect, useState } from "react";

export function InAppSplash() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const hide = () => setHidden(true);

    // 尽快在首次可交互后淡出（两种兜底：DOMContentLoaded 或超时）
    if (document.readyState === "complete" || document.readyState === "interactive") {
      const t = window.setTimeout(hide, 250);
      return () => window.clearTimeout(t);
    } else {
      const onReady = () => hide();
      document.addEventListener("DOMContentLoaded", onReady, { once: true });
      const t = window.setTimeout(hide, 600);
      return () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        window.clearTimeout(t);
      };
    }
  }, []);

  return (
    <div
      id="inapp-splash"
      aria-hidden
      role="presentation"
      className={
        `fixed inset-0 z-[9999] flex items-center justify-center ` +
        `bg-[var(--bg-primary,#f9fafb)] transition-opacity duration-300 ` +
        (hidden ? "opacity-0 pointer-events-none" : "opacity-100")
      }
      style={{
        WebkitTapHighlightColor: "transparent",
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {/* 根据主题显示不同的 Logo（利用 .dark class 控制）*/}
      <div className="relative w-40 h-40 select-none pointer-events-none">
        {/* 浅色 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Logo-512.png"
          alt="Splash Logo"
          className="absolute inset-0 w-full h-full object-contain dark:hidden"
          draggable={false}
        />
        {/* 深色 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Logo-dark-512.png"
          alt="Splash Logo Dark"
          className="absolute inset-0 w-full h-full object-contain hidden dark:block"
          draggable={false}
        />
      </div>
      <style>{`
        /* 在不支持 CSS 变量的环境兜底深色 */
        .dark #inapp-splash { background-color: #0f172a; }
      `}</style>
    </div>
  );
}

