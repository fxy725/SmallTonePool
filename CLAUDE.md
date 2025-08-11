# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run post` - Create new blog post interactively

## Git Workflow

- 提交变更至本地仓库时注释使用简体中文
- 使用 `git status` 查看变更状态
- 使用 `git diff` 查看具体修改内容
- 使用 `git add .` 添加所有变更
- 使用 `git commit -m "中文提交信息"` 提交变更
- 使用 `git push origin master` 推送到远程仓库



## 开发流程
项目已配置 GitHub 与 Vercel 自动集成，采用以下工作流程：

1. **本地开发** - 使用 `npm run dev` 开发功能
2. **功能完成** - 实现好一定的功能后进行本地构建测试
3. **本地构建** - 运行 `npm run build` 验证构建成功
4. **修复错误** - 如果构建失败，根据错误信息修改代码
5. **推送代码** - 构建成功后推送到 GitHub
6. **自动部署** - Vercel 自动感知并部署最新版本



## Project Architecture

This is a Next.js 15 blog using App Router with MDX for content management. The blog is called "小石潭记" (Small Stone Pool Records) and features:

### Core Technology Stack
- **Next.js 15** with App Router and static site generation
- **MDX** for blog posts with frontmatter metadata
- **TypeScript** for type safety
- **Tailwind CSS** for styling with dark mode support
- **Vercel** for deployment

### Key Architectural Patterns

**Async Parameters Pattern**: All dynamic routes use Next.js 15's async params:
```typescript
interface PageProps {
  params: Promise<{ slug: string }>;
}
```

**Static Generation**: Uses `generateStaticParams()` for SSG:
- Blog posts at `/blog/[slug]`
- Tag pages at `/tags/[tag]`

**Content Management**: 
- MDX files stored in `src/data/posts/`
- Frontmatter parsing with `gray-matter`
- Dynamic imports for server-side only operations

**SEO Optimization**:
- Structured data (JSON-LD) for Blog, BlogPosting, BreadcrumbList
- Open Graph metadata
- Automatic reading time calculation
- Tag-based organization

### File Structure

- `src/lib/posts.ts` - Core post management with caching
- `src/types/post.ts` - TypeScript interfaces
- `src/components/` - Reusable UI components
- `src/app/` - Next.js App Router pages
- `scripts/create-post.js` - Interactive post creation

### Important Implementation Details

**Server-Side Only Operations**: File system operations use dynamic imports and `typeof window` checks to prevent client-side execution.

**Search Functionality**: Client-side search component with real-time filtering across title, summary, content, and tags.

**Caching**: Posts are cached in memory to avoid repeated file system reads during development.

**Chinese Content**: All content and UI is in Chinese, including date formatting and reading time display.
- 提交变更至本地仓库时注释使用简体中文。