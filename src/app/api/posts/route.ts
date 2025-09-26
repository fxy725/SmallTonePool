import { NextResponse } from 'next/server';
import { unstable_cache } from 'next/cache';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { Post } from '@/types/blog';
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

// 动态获取所有文章（包括新添加的）
const getAllPostsDynamic = unstable_cache(
  async (): Promise<Post[]> => {
    try {
      const postsDirectory = path.join(process.cwd(), 'src/data/posts');

      if (!fs.existsSync(postsDirectory)) {
        return [];
      }

      const fileNames = fs.readdirSync(postsDirectory);

      // 并行处理所有MDX文件
      const processPromises = fileNames
        .filter(fileName => fileName.endsWith('.mdx'))
        .map(async fileName => {
          try {
            const slug = fileName.replace(/\.mdx$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            // 检查是否已发布
            if (matterResult.data.published === false) {
              return null;
            }

            // 处理MDX内容
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
            } as Post;
          } catch (error) {
            console.error(`Error processing file ${fileName}:`, error);
            return null;
          }
        });

      // 等待所有处理完成
      const results = await Promise.all(processPromises);

      // 过滤掉null值并排序
      const validPosts = results.filter((post): post is Post => post !== null);
      return validPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  },
  ['all-posts-dynamic'],
  {
    revalidate: 60, // 1分钟后重新验证，允许更快更新
    tags: ['posts', 'dynamic-posts']
  }
);

export async function GET() {
  try {
    const posts = await getAllPostsDynamic();
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}