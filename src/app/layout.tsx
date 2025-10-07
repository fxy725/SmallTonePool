import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { StructuredData } from "@/components/seo/StructuredData";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { PWAInstall } from "@/components/PWAInstall";
import { PWAThemeSync } from "@/components/PWAThemeSync";
import { InAppSplash } from "@/components/pwa/InAppSplash";
import "./globals.css";

// 更优雅的字体选择
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "小石潭记",
  description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
  keywords: [
    "技术博客",
    "编程",
    "学习笔记",
    "经验总结",
    "前端开发",
    "后端开发",
  ],
  authors: [{ name: "小石潭记" }],
  openGraph: {
    title: "小石潭记 - 技术心得与经验总结",
    description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
    type: "website",
    locale: "zh_CN",
    siteName: "小石潭记",
  },
  twitter: {
    card: "summary_large_image",
    title: "小石潭记 - 技术心得与经验总结",
    description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
    creator: "@smalltone",
  },
  alternates: {
    canonical: "https://smalltone-blog.vercel.app",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <StructuredData type="Blog" data={{}} />
        {/* 防闪烁脚本 - 必须在body之前执行，同时同步 theme-color */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = theme === 'dark' || (theme === 'system' && systemDark);

                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }

                  var ensureMetaTheme = function() {
                    var meta = document.querySelector('meta[name="theme-color"]');
                    if (!meta) {
                      meta = document.createElement('meta');
                      meta.setAttribute('name', 'theme-color');
                      document.head.appendChild(meta);
                    }
                    return meta;
                  };

                  var resolveThemeColor = function(isDarkMode) {
                    try {
                      var styles = getComputedStyle(document.documentElement);
                      var bg = styles.getPropertyValue('--bg-primary');
                      if (bg && bg.trim()) {
                        return bg.trim();
                      }
                    } catch (_) {}
                    return isDarkMode ? '#0f172a' : '#f9fafb';
                  };

                  var metaTheme = ensureMetaTheme();
                  metaTheme.setAttribute('content', resolveThemeColor(isDark));

                  // 初始化时不要强制开启全局过渡，避免初次渲染抖动
                } catch (e) {
                  // 静默处理错误，使用系统主题
                  var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (systemDark) {
                    document.documentElement.classList.add('dark');
                  }
                  document.documentElement.classList.add('theme-transition');
                }
              })();
            `,
          }}
        />
        {/* 添加 favicon 等元标签 */}
        <link rel="icon" href="/assets/site-Logo.ico" />
        <link rel="apple-touch-icon" href="/assets/Logo-512.png" />
        {/* 初始以接近页面底色的颜色填充，挂载后由 PWAThemeSync 精准同步为 --bg-primary */}
        <meta name="theme-color" content="#f9fafb" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9fafb" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="小石潭记" />
        <meta name="application-name" content="小石潭记" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider>
          <InAppSplash />
          <PWAInstall />
          <PWAThemeSync />
          <div className="min-h-screen flex flex-col">
            <main className="flex-1 w-full pb-16 sm:pb-20 lg:pb-24">{children}</main>
            <ConditionalFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
