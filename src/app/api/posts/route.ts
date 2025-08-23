import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/content/posts';
import { unstable_cache } from 'next/cache';

const getCachedPosts = unstable_cache(
  async () => getAllPosts(),
  ['all-posts'],
  {
    revalidate: 3600, // 1小时后重新验证
    tags: ['posts']
  }
);

export async function GET() {
  try {
    const posts = await getCachedPosts();
    return NextResponse.json(posts, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}