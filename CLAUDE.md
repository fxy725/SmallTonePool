# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发流程

### 核心开发命令
- `npm run dev` - 启动开发服务器（支持 Turbopack）
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查
- `npm run post` - 交互式创建新博客文章

### Git 工作流程
- **提交信息**：使用简体中文编写提交信息
- **状态查看**：`git status` 查看变更状态
- **差异对比**：`git diff` 查看具体修改内容
- **添加变更**：`git add .` 添加所有变更
- **提交变更**：`git commit -m "中文提交信息"`
- **推送代码**：`git push origin master` 推送到远程仓库

### 部署流程
项目已配置 GitHub 与 Vercel 自动集成：

1. **本地开发** - 使用 `npm run dev` 开发功能
2. **功能完成** - 实现功能后进行本地构建测试
3. **本地构建** - 运行 `npm run build` 验证构建成功
4. **修复错误** - 如果构建失败，根据错误信息修改代码
5. **推送代码** - 构建成功后推送到 GitHub
6. **自动部署** - Vercel 自动感知并部署最新版本

## 项目架构

### 技术栈
- **Next.js 15.4.6** - App Router + 静态站点生成
- **React 19.1.0** - 用户界面框架
- **TypeScript** - 类型安全
- **MDX 3.1.0** - 内容管理（支持 @next/mdx）
- **Tailwind CSS 4** - 样式系统（使用 @tailwindcss/postcss）
- **Vercel** - 部署平台

### 核心架构模式

#### 1. Next.js 15 App Router
```typescript
// 异步参数模式
interface PageProps {
  params: Promise<{ slug: string }>;
}

// 静态生成
export async function generateStaticParams() {
  // 生成所有文章和标签的静态路径
}
```

#### 2. 内容管理系统
- **MDX 文件**存储在 `src/data/posts/`
- **Frontmatter 解析**使用 gray-matter
- **内存缓存**避免重复文件系统读取
- **服务端专用**文件操作使用动态导入

#### 3. 中文优先设计
- 所有内容和界面使用中文
- 中文日期格式化
- 中文元数据和 SEO
- 文化适应性设计模式

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
│   └── TagCloud.tsx        # 标签云
├── lib/
│   └── posts.ts            # 核心文章管理逻辑
├── types/
│   └── post.ts             # TypeScript 接口
└── data/
    └── posts/              # MDX 博客文章
```

### 关键组件说明

#### 文章管理 (`src/lib/posts.ts`)
- 内存缓存优化性能
- 服务端专用文件操作
- 阅读时间计算
- 全文搜索功能（标题、摘要、内容、标签）
- 标签过滤和统计

#### MDX 渲染 (`src/components/MDXRenderer.tsx`)
- 所有 MDX 元素的自定义样式
- highlight.js 语法高亮
- 响应式设计
- 深色模式支持

#### SEO 优化
- 全面的页面元数据
- 结构化数据（JSON-LD）：Blog、BlogPosting、BreadcrumbList
- Open Graph 和 Twitter Cards
- 自动站点地图和 robots.txt
- RSS 订阅源生成

### 配置文件

#### Next.js 配置 (`next.config.ts`)
- MDX Rust 编译器提升性能
- 图片优化支持 WebP/AVIF
- 性能优化（压缩等）
- 日志配置

#### Vercel 配置 (`vercel.json`)
- 安全头（CSP、XSS 保护等）
- 函数执行时长限制
- RSS 订阅源重定向
- 静态资源缓存控制

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

### 重要实现细节
- **服务端专用操作**：文件系统操作使用动态导入和 `typeof window` 检查
- **搜索功能**：客户端搜索组件，支持标题、摘要、内容和标签的实时过滤
- **缓存机制**：文章在内存中缓存，避免开发时重复文件系统读取
- **中文内容**：所有内容和界面使用中文，包括日期格式化和阅读时间显示