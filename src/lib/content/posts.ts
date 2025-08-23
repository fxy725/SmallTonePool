import { Post } from '@/types/blog';
import path from 'path';
import fs from 'fs';

// 统一的缓存池
interface CachePool {
    posts: Post[] | null;
    postMap: Map<string, Post> | null;
    mdxContent: Map<string, string> | null;
}

// 缓存文章数据
const cachePool = {
    posts: null,
    postMap: null,
    mdxContent: null
} as CachePool;

async function mdxToHtml(mdx: string, cacheKey?: string): Promise<string> {
    // 如果提供了缓存键，尝试从缓存获取
    if (cacheKey && cachePool.mdxContent) {
        const cached = cachePool.mdxContent.get(cacheKey);
        if (cached) {
            return cached;
        }
    }

    try {
        const { unified } = await import('unified');
        const remarkParse = (await import('remark-parse')).default;
        const remarkGfm = (await import('remark-gfm')).default;
        const remarkRehype = (await import('remark-rehype')).default;
        const rehypeStringify = (await import('rehype-stringify')).default;
        const rehypeSlug = (await import('rehype-slug')).default;
        const rehypeHighlight = (await import('rehype-highlight')).default;

        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeSlug)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(mdx);

        const result = String(file);

        // 如果提供了缓存键，保存到缓存
        if (cacheKey) {
            if (!cachePool.mdxContent) {
                cachePool.mdxContent = new Map();
            }
            cachePool.mdxContent.set(cacheKey, result);
        }

        return result;
    } catch (error) {
        console.error('Error processing MDX:', error);
        return mdx; // fallback to original content
    }
}

export async function getAllPosts(): Promise<Post[]> {
    if (cachePool.posts) {
        return cachePool.posts;
    }

    try {
        // 动态导入只在服务端运行
        const grayMatter = await import('gray-matter');

        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
            cachePool.posts = [];
            return [];
        }

        const fileNames = fs.readdirSync(postsDirectory);
        const allPostsData = await Promise.all(
            fileNames
                .filter(fileName => fileName.endsWith('.mdx'))
                .map(async fileName => {
                    const slug = fileName.replace(/\.mdx$/, '');
                    const fullPath = path.join(postsDirectory, fileName);
                    const fileContents = fs.readFileSync(fullPath, 'utf8');
                    const matterResult = grayMatter.default(fileContents);

                    // 使用缓存键来避免重复处理MDX
                    const cacheKey = `mdx_${slug}`;
                    const html = await mdxToHtml(matterResult.content, cacheKey);

                    const post: Post = {
                        slug,
                        title: matterResult.data.title || slug,
                        date: matterResult.data.date || new Date().toISOString(),
                        updated: matterResult.data.updated,
                        summary: matterResult.data.summary || '',
                        content: html,
                        tags: matterResult.data.tags || [],
                        published: matterResult.data.published !== false,
                        readingTime: calculateReadingTime(matterResult.content),
                    };

                    return post;
                })
        );

        const filteredPosts = allPostsData
            .filter(post => post.published)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        // 更新缓存池
        cachePool.posts = filteredPosts;
        cachePool.postMap = new Map(filteredPosts.map(post => [post.slug, post]));

        return filteredPosts;
    } catch (error) {
        console.error('Error loading posts:', error);
        cachePool.posts = [];
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        // 首先尝试从缓存池获取
        if (cachePool.postMap) {
            const cachedPost = cachePool.postMap.get(slug);
            if (cachedPost && cachedPost.published) {
                return cachedPost;
            }
        }

        // 如果缓存中没有，尝试从缓存的文章列表中查找
        if (cachePool.posts) {
            const cachedPost = cachePool.posts.find(post => post.slug === slug);
            if (cachedPost && cachedPost.published) {
                return cachedPost;
            }
        }

        // 如果缓存中没有，才重新读取文件
        const grayMatter = await import('gray-matter');
        const postsDirectory = path.join(process.cwd(), 'src/data/posts');
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = grayMatter.default(fileContents);

        // 检查是否已发布
        if (matterResult.data.published === false) {
            return null;
        }

        // 使用缓存键来避免重复处理MDX
        const cacheKey = `mdx_${slug}`;
        const html = await mdxToHtml(matterResult.content, cacheKey);

        const post: Post = {
            slug,
            title: matterResult.data.title || slug,
            date: matterResult.data.date || new Date().toISOString(),
            updated: matterResult.data.updated,
            summary: matterResult.data.summary || '',
            content: html,
            tags: matterResult.data.tags || [],
            published: true,
            readingTime: calculateReadingTime(matterResult.content),
        };

        // 更新缓存池
        if (cachePool.postMap) {
            cachePool.postMap.set(slug, post);
        }

        return post;
    } catch (error) {
        console.error('Error loading post:', error);
        return null;
    }
}

export async function getPostsByTag(tag: string): Promise<Post[]> {
    const allPosts = await getAllPosts();
    return allPosts.filter(post =>
        post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
}

export async function getAllTags(): Promise<Array<{ name: string; count: number }>> {
    const allPosts = await getAllPosts();
    const tagCounts: { [key: string]: number } = {};

    allPosts.forEach(post => {
        post.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });

    return Object.entries(tagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);
}

export async function searchPosts(query: string): Promise<Post[]> {
    const allPosts = await getAllPosts();
    const lowercaseQuery = query.toLowerCase();

    return allPosts.filter(post => {
        return (
            post.title.toLowerCase().includes(lowercaseQuery) ||
            post.summary.toLowerCase().includes(lowercaseQuery) ||
            post.content.toLowerCase().includes(lowercaseQuery) ||
            post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
        );
    });
}

function calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
}
