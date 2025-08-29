import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { StructuredData } from "@/components/seo/StructuredData";
import { ThemeProvider } from "@/contexts/ThemeContext";
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
    <html lang="zh-CN" className="scroll-smooth">
      <head>
        <StructuredData type="Blog" data={{}} />
        {/* 防闪烁脚本 - 必须在body之前执行 */}
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
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <main>{children}</main>

          {/* 添加页脚 */}
          <footer className="bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="text-center">
                <p
                  className="text-gray-600 dark:text-gray-400 mb-2"
                  style={{ fontFamily: "'LXGW Marker Gothic', sans-serif" }}
                >
                  © 2024 小石潭记. All rights reserved.
                </p>
                <p
                  className="text-sm text-gray-500 dark:text-gray-500"
                  style={{ fontFamily: "'LXGW Marker Gothic', sans-serif" }}
                >
                  用心记录每一次学习，用代码书写成长故事
                </p>
              </div>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
