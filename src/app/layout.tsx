import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
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
  title: "小石潭记 - 技术心得与经验总结",
  description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
  keywords: ["技术博客", "编程", "学习笔记", "经验总结", "前端开发", "后端开发"],
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
        {/* 添加 favicon 等元标签 */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Header />
        <main className="pt-16">
          {children}
        </main>
        
        {/* 添加页脚 */}
        <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                © 2024 小石潭记. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                用心记录每一次学习，用代码书写成长故事
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
