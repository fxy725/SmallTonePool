import { Post } from '@/types/blog';

// 缓存文章数据
let postsCache: Post[] | null = null;

async function mdxToHtml(mdx: string): Promise<string> {
    const { unified } = await import('unified');
    const remarkParse = (await import('remark-parse')).default as any;
    const remarkGfm = (await import('remark-gfm')).default as any;
    const remarkRehype = (await import('remark-rehype')).default as any;
    const rehypeStringify = (await import('rehype-stringify')).default as any;
    const rehypeSlug = (await import('rehype-slug')).default as any;
    const rehypeHighlight = (await import('rehype-highlight')).default as any;

    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(mdx);

    return String(file);
}

export async function getAllPosts(): Promise<Post[]> {
    if (postsCache) {
        return postsCache;
    }

    try {
        // 动态导入只在服务端运行
        const fs = await import('fs');
        const path = await import('path');
        const grayMatter = await import('gray-matter');

        const postsDirectory = path.join(process.cwd(), 'src/data/posts');

        if (!fs.existsSync(postsDirectory)) {
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

                    const html = await mdxToHtml(matterResult.content);

                    return {
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
                })
        );

        postsCache = allPostsData
            .filter(post => post.published)
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        return postsCache;
    } catch (error) {
        console.error('Error loading posts:', error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        // 动态导入只在服务端运行
        const fs = await import('fs');
        const path = await import('path');
        const grayMatter = await import('gray-matter');

        const postsDirectory = path.join(process.cwd(), 'src/data/posts');
        const fullPath = path.join(postsDirectory, `${slug}.mdx`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = grayMatter.default(fileContents);

        const html = await mdxToHtml(matterResult.content);

        return {
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
