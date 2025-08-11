# 小石潭记 博客部署指南

## 项目概述

小石潭记 是一个基于 Next.js 14 构建的个人博客系统，专注于技术心得与经验总结。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **内容**: MDX
- **部署**: Vercel

## 本地开发

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看博客。

### 构建项目

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 部署到 Vercel

### 方法一：通过 Vercel Dashboard（推荐）

1. **准备代码**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**
   ```bash
   # 创建 GitHub 仓库后
   git remote add origin https://github.com/your-username/xiaoshitanji.git
   git branch -M main
   git push -u origin main
   ```

3. **部署到 Vercel**
   - 访问 [Vercel Dashboard](https://vercel.com/dashboard)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - 点击 "Deploy"

### 方法二：使用 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **登录并部署**
   ```bash
   vercel login
   vercel --prod
   ```

## 自定义配置

### 环境变量

在 Vercel 项目设置中添加以下环境变量：

```env
# 可选：自定义域名
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### 自定义域名

1. 在 Vercel 项目设置中添加自定义域名
2. 按照提示配置 DNS 记录

## 内容管理

### 添加新文章

1. 在 `src/data/posts/` 目录下创建新的 `.mdx` 文件
2. 文件名格式：`文章标题.mdx`（使用英文连字符）
3. 在文件开头添加 frontmatter：

```mdx
---
title: "文章标题"
date: "2024-01-20"
summary: "文章摘要"
tags: ["标签1", "标签2"]
published: true
---

# 文章内容

这里是你的文章内容...
```

### 文章元数据说明

- `title`: 文章标题（必需）
- `date`: 发布日期（必需，格式：YYYY-MM-DD）
- `summary`: 文章摘要（必需）
- `tags`: 标签数组（可选）
- `published`: 是否发布（可选，默认 true）
- `updated`: 更新日期（可选）

## SEO 优化

博客已内置以下 SEO 功能：

- 自动生成 sitemap.xml
- 自动生成 robots.txt
- 结构化数据支持
- Open Graph 标签
- Twitter Card 支持
- RSS 订阅支持

## 性能优化

- 图片自动优化
- 代码分割
- 预渲染策略
- 字体优化
- 缓存策略

## 监控和分析

### Vercel Analytics

1. 在 Vercel 项目设置中启用 Analytics
2. 安装 Analytics 包：

```bash
npm install @vercel/analytics
```

### Google Analytics

1. 在 Google Analytics 中创建项目
2. 在 `src/app/layout.tsx` 中添加追踪代码

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 TypeScript 错误
   - 确保 MDX 文件格式正确
   - 检查依赖是否完整

2. **样式问题**
   - 确认 Tailwind CSS 配置正确
   - 检查 CSS 导入顺序

3. **MDX 渲染问题**
   - 检查 MDX 文件语法
   - 确认 frontmatter 格式正确

### 获取帮助

- 查看 [Next.js 文档](https://nextjs.org/docs)
- 查看 [Vercel 文档](https://vercel.com/docs)
- 检查项目 Issues

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 发起 Pull Request

## 许可证

MIT License