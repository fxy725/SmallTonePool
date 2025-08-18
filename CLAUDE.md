# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发守则
- 根据用户要求实现功能、修复错误、优化细节
- 完成任务后由用户决定继续开发还是本地构建，构建报错即修复错误
- 如果开发流程创建或删除文件，需修改Claude.md中目录结构部分内容，如果文件作用发生较大变化，也需修改
- 内容为简体中文。
- 不要自行启动开发服务器，交由用户完成并告诉你结果，除非用户明确要求。

## 项目架构

### 技术栈
- **Next.js 15.4.6** - App Router + 静态站点生成
- **React 19.1.0** - 用户界面框架
- **TypeScript** - 类型安全
- **MDX 3.1.0** - 内容管理（支持 @next/mdx）
- **Tailwind CSS 4** - 样式系统（使用 @tailwindcss/postcss）
- **Vercel** - 部署平台


### 目录结构
```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局（字体和元数据）
│   ├── page.tsx             # 首页（最新文章）
│   ├── blog/
│   │   ├── page.tsx         # 博客列表页
│   │   └── [slug]/
│   │       └── page.tsx     # 单篇文章页
│   ├── tags/
│   │   ├── page.tsx         # 标签列表
│   │   └── [tag]/
│   │       └── page.tsx     # 单个标签页
│   ├── rss.xml/
│   │   └── route.ts         # RSS 订阅源生成
│   ├── sitemap.ts          # 站点地图生成
│   ├── robots.ts           # 爬虫配置
│   └── globals.css         # 全局样式
├── components/              # 可复用组件
│   ├── Header.tsx          # 导航头部
│   ├── Hero.tsx            # 首页英雄区域
│   ├── PostCard.tsx        # 文章卡片
│   ├── MDXRenderer.tsx     # MDX 组件样式
│   ├── Search.tsx          # 搜索功能
│   ├── StructuredData.tsx  # SEO 结构化数据
│   ├── TagCloud.tsx        # 标签云
│   └── CopyButton.tsx      # 复制按钮组件
├── lib/
│   └── posts.ts            # 核心文章管理逻辑
├── types/
│   └── post.ts             # TypeScript 接口
└── data/
    └── posts/              # MDX 博客文章
```

### 主题设计
**小石潭主题** - 基于石头和池塘的色彩搭配：
- 主色调：石灰色调（slate/gray）
- 强调色：池水蓝色调（blue/indigo）
- 背景：渐变效果模拟水面
- 动画：浮动元素模拟水中涟漪

### 特色功能
1. **中文技术博客** - 专注编程教程
2. **静态站点生成** - 性能优化
3. **全面 SEO** - 结构化数据支持
4. **搜索功能** - 实时过滤
5. **标签系统** - 专用标签页面
6. **RSS 订阅** - 读者订阅
7. **响应式设计** - 深色模式支持
8. **自定义主题** - 小石潭视觉风格
9. **优雅的复制提示** - 替代原生alert弹窗
