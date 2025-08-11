# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run post` - Create new blog post interactively

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