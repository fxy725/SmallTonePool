import { Post } from '@/types/blog';
import path from 'path';
import fs from 'fs';

// 统一的缓存池
interface CachePool {
    posts: Post[] | null;
    postMap: Map<string, Post> | null;
    mdxContent: Map<string, string> | null;
    lastModified: Map<string, number> | null; // 文件最后修改时间
    cacheTimestamp: number | null; // 缓存时间戳
}

// 缓存文章数据
const cachePool = {
    posts: null,
    postMap: null,
    mdxContent: null,
    lastModified: null,
    cacheTimestamp: null
} as CachePool;

// 缓存失效检测
function shouldInvalidateCache(): boolean {
    try {
        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
            return true; // 目录不存在，需要重新缓存
        }

        const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'));

        // 首次缓存
        if (!cachePool.lastModified) {
            cachePool.lastModified = new Map();
            return true;
        }

        // 检查是否有新文件或文件被修改
        for (const fileName of fileNames) {
            const fullPath = path.join(postsDirectory, fileName);
            const stats = fs.statSync(fullPath);
            const lastModified = stats.mtime.getTime();

            const cachedModified = cachePool.lastModified.get(fileName);
            if (!cachedModified || cachedModified < lastModified) {
                return true;
            }
        }

        // 检查是否有文件被删除
        for (const [fileName] of cachePool.lastModified) {
            if (!fileNames.includes(fileName)) {
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error('Error checking cache invalidation:', error);
        return true; // 出错时重新缓存
    }
}

// 更新文件修改时间缓存
function updateFileModificationCache() {
    try {
        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
            return;
        }

        const fileNames = fs.readdirSync(postsDirectory).filter(fileName => fileName.endsWith('.mdx'));

        if (!cachePool.lastModified) {
            cachePool.lastModified = new Map();
        }

        for (const fileName of fileNames) {
            const fullPath = path.join(postsDirectory, fileName);
            const stats = fs.statSync(fullPath);
            cachePool.lastModified.set(fileName, stats.mtime.getTime());
        }

        cachePool.cacheTimestamp = Date.now();
    } catch (error) {
        console.error('Error updating file modification cache:', error);
    }
}

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
    // 检查缓存是否需要失效
    if (cachePool.posts && !shouldInvalidateCache()) {
        return cachePool.posts;
    }

    try {
        // 动态导入只在服务端运行
        const grayMatter = await import('gray-matter');

        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
            cachePool.posts = [];
            updateFileModificationCache();
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

        // 更新缓存池和文件修改时间
        cachePool.posts = filteredPosts;
        cachePool.postMap = new Map(filteredPosts.map(post => [post.slug, post]));
        updateFileModificationCache();

        console.log(`✅ 动态加载了 ${filteredPosts.length} 篇文章，缓存已更新`);
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
        if (cachePool.postMap && !shouldInvalidateCache()) {
            const cachedPost = cachePool.postMap.get(slug);
            if (cachedPost && cachedPost.published) {
                return cachedPost;
            }
        }

        // 如果缓存中没有或缓存已失效，尝试从缓存的文章列表中查找
        if (cachePool.posts && !shouldInvalidateCache()) {
            const cachedPost = cachePool.posts.find(post => post.slug === slug);
            if (cachedPost && cachedPost.published) {
                return cachedPost;
            }
        }

        // 如果缓存中没有或需要重新加载，才读取文件
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

        // 确保缓存池已初始化
        if (!cachePool.postMap) {
            cachePool.postMap = new Map();
        }
        if (!cachePool.posts) {
            cachePool.posts = [];
        }

        // 更新缓存池
        cachePool.postMap.set(slug, post);

        // 如果文章不在列表中，添加到列表并重新排序
        const existingIndex = cachePool.posts.findIndex(p => p.slug === slug);
        if (existingIndex === -1) {
            cachePool.posts.push(post);
            cachePool.posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        } else {
            cachePool.posts[existingIndex] = post;
        }

        // 更新文件修改时间缓存
        updateFileModificationCache();

        console.log(`📝 动态加载了新文章: ${post.title}`);
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
