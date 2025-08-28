
import { StructuredData } from "@/components/seo/StructuredData";
import { Header } from "@/components/layout/Header";
import { CodeBlockCopyButtons } from "@/components/mdx/CodeBlockCopyButtons";
import { PostNotFound } from "@/components/error/PostNotFound";
import Link from "next/link";
import { unstable_cache } from "next/cache";
import path from "path";
import fs from "fs";
import { Post } from "@/types/blog";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/github.css";

interface PostPageProps {
    params: Promise<{
        detail: string;
    }>;
}

// 动态读取MDX文件的函数
async function readMDXFile(slug: string): Promise<string> {
    const postsDirectory = path.join(process.cwd(), 'src/data/posts');
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error('File not found');
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return fileContents;
}

// 动态处理MDX内容
async function processMDXContent(mdxContent: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(mdxContent);

    return String(file);
}

// 动态获取文章数据（带缓存）
const getDynamicPostData = unstable_cache(
    async (slug: string): Promise<Post | null> => {
        try {
            const mdxContent = await readMDXFile(slug);
            const matterResult = matter(mdxContent);

            // 检查是否已发布
            if (matterResult.data.published === false) {
                return null;
            }

            const html = await processMDXContent(matterResult.content);

            return {
                slug,
                title: matterResult.data.title || slug,
                date: matterResult.data.date || new Date().toISOString(),
                updated: matterResult.data.updated,
                summary: matterResult.data.summary || '',
                content: html,
                tags: matterResult.data.tags || [],
                published: true,
                readingTime: Math.ceil(matterResult.content.split(/\s+/).length / 200),
            };
        } catch (error) {
            console.error(`Error loading post ${slug}:`, error);
            return null;
        }
    },
    ['dynamic-post'],
    {
        revalidate: 300, // 5分钟后重新验证
        tags: ['posts', 'dynamic']
    }
);



export async function generateMetadata({ params }: PostPageProps) {
    const { detail } = await params;
    const post = await getDynamicPostData(detail);

    if (!post) {
        return {
            title: "文章未找到 - 小石潭记",
            description: "抱歉，您访问的文章不存在或已被删除。",
        };
    }

    return {
        title: `${post.title} - 小石潭记`,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            type: "article",
            publishedTime: post.date,
            modifiedTime: post.updated || post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.summary,
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { detail } = await params;
    const post = await getDynamicPostData(detail);

    if (!post) {
        return <PostNotFound slug={detail} />;
    }

    return (
        <>
            <Header />
            <StructuredData
                type="BlogPosting"
                data={{
                    title: post.title,
                    summary: post.summary,
                    date: post.date,
                    updated: post.updated || post.date,
                    slug: post.slug,
                    tags: post.tags,
                    content: post.content,
                    author: {
                        "@type": "Person",
                        name: "小石潭记"
                    }
                }}
            />
            <CodeBlockCopyButtons />

            <article className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Header */}
                <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700" style={{ fontFamily: 'var(--font-content)' }}>
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {/* Breadcrumb */}
                        <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-8 mt-12">
                            <Link href="/home" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                首页
                            </Link>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                文章
                            </Link>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-gray-900 dark:text-white">{post.title}</span>
                        </nav>

                        <div className="text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white relative">
                                <span className="relative z-10">{post.title}</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 dark:from-blue-400/10 dark:to-cyan-400/10 rounded-lg -z-10"></div>
                            </h1>

                            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                {post.summary}
                            </p>


                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap justify-center gap-2">
                                    {post.tags.map((tag) => (
                                        <Link
                                            href={`/blog?tag=${encodeURIComponent(tag)}`}
                                            key={tag}
                                            className="article-tag px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium select-none no-underline transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                                        >
                                            {tag}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pt-6">
                    <div
                        className="prose prose-lg dark:prose-invert max-w-none text-content article-content-selectable"
                        dangerouslySetInnerHTML={{
                            __html: post.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '')
                        }}
                        style={{
                            // 让代码块可以选中
                            '--prose-pre-bg': 'var(--bg-secondary)',
                            '--prose-code-bg': 'var(--bg-secondary)',
                            fontFamily: 'var(--font-content)',
                            // 确保深色模式下的代码块样式正确
                            '--hljs-bg': 'var(--bg-secondary)',
                            '--hljs-color': 'var(--text-primary)',
                            // 代码块边框颜色
                            '--prose-pre-border': 'var(--accent-subtle)'
                        } as React.CSSProperties}
                    />

                    {/* Date info */}
                    <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: 'var(--font-content)' }}>
                        <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <time dateTime={post.date}>
                                {new Date(post.date).toLocaleDateString('zh-CN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </time>
                        </div>

                        {post.updated && (
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>更新于 {new Date(post.updated).toLocaleDateString('zh-CN')}</span>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="mt-16 flex justify-center">
                        <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-800/70 backdrop-blur-[2px] text-gray-700 dark:text-gray-300">
                            <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400" style={{ fontFamily: 'var(--font-tech-stack)' }}>
                                返回文章列表
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </article>
        </>
    );
}
