import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Tag, Post } from '@/types/blog';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import remarkBreaks from 'remark-breaks';

// 动态读取和处理MDX内容
async function processMDXContent(mdxContent: string): Promise<string> {
    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(mdxContent);

    return String(file);
}

// 动态获取所有文章（每次请求读取文件）
async function getAllPostsDynamic(): Promise<Post[]> {
    try {
        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
            return [];
        }

        const fileNames = fs.readdirSync(postsDirectory);

        const processPromises = fileNames
            .filter(fileName => fileName.endsWith('.mdx'))
            .map(async fileName => {
                try {
                    const slug = fileName.replace(/\.mdx$/, '');
                    const fullPath = path.join(postsDirectory, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    const matterResult = matter(fileContents);

                    const html = await processMDXContent(matterResult.content);

                    return {
                        slug,
                        title: matterResult.data.title || slug,
                        date: matterResult.data.date || new Date().toISOString(),
                        updated: matterResult.data.updated,
                        summary: matterResult.data.summary || '',
                        content: html,
                        tags: matterResult.data.tags || [],
                        readingTime: Math.ceil(matterResult.content.split(/\s+/).length / 200),
                    } as Post;
                } catch (error) {
                    console.error(`Error processing file ${fileName}:`, error);
                    return null;
                }
            });

        const results = await Promise.all(processPromises);
        const validPosts = results.filter((post): post is Post => post !== null);
        return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

// 动态获取所有标签（每次请求重新统计）
async function getAllTagsDynamic(): Promise<Tag[]> {
    try {
        const posts: Post[] = await getAllPostsDynamic();
        const tagCounts: { [key: string]: number } = {};

        posts.forEach(post => {
            post.tags.forEach((tag: string) => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        return Object.entries(tagCounts)
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

    } catch (error) {
        console.error('Error loading tags:', error);
        return [];
    }
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
        const tags = await getAllTagsDynamic();
        return NextResponse.json(tags, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 });
    }
}
