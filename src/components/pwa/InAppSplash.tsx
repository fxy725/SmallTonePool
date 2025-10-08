"use client";

import { useEffect, useState } from "react";

export function InAppSplash() {
  const [hidden, setHidden] = useState(false);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // ���Ѱ�װ�� PWA��standalone���б�����ϵͳ�����ظ���ͬʱÿ���Ựֻ��ʾһ�Ρ�
    try {
      // Type guard for iOS Safari's non-standard `navigator.standalone`
      const hasNavigatorStandalone = (n: Navigator): n is Navigator & { standalone: boolean } => 'standalone' in n;

      const isStandalone =
        (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) ||
        // iOS Safari ����ģʽ
        (typeof navigator !== 'undefined' && hasNavigatorStandalone(navigator) && navigator.standalone === true);

      const alreadyShown = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('inapp:splash:shown') === '1';

      if (isStandalone || alreadyShown) {
        setEnabled(false);
        setHidden(true);
        return;
      }
      try { sessionStorage.setItem('inapp:splash:shown', '1'); } catch {}
    } catch {}

    const hide = () => setHidden(true);

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

  if (!enabled) return null;

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
      {/* ͬһ�� Logo����ǳɫ�� .dark class ���� */}
      <div className="relative w-40 h-40 select-none pointer-events-none">
        {/* ǳɫ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Logo-512.png"
          alt="Splash Logo"
          className="absolute inset-0 w-full h-full object-contain dark:hidden"
          draggable={false}
        />
        {/* ��ɫ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/Logo-dark-512.png"
          alt="Splash Logo Dark"
          className="absolute inset-0 w-full h-full object-contain hidden dark:block"
          draggable={false}
        />
      </div>
      <style>{`
        /* �ڲ�֧�� CSS �����Ļ���������ɫ���� */
        .dark #inapp-splash { background-color: #0f172a; }
      `}</style>
    </div>
  );
}

