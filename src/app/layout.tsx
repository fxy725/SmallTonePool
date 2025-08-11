import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { StructuredData } from "@/components/StructuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "小石潭记 - 技术心得与经验总结",
  description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
  keywords: ["技术博客", "编程", "学习笔记", "经验总结"],
  openGraph: {
    title: "小石潭记 - 技术心得与经验总结",
    description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "小石潭记 - 技术心得与经验总结",
    description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
  },
  alternates: {
    canonical: "https://smalltone-blog.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <StructuredData type="Blog" data={{}} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
