import { NextRequest, NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
  try {
    const posts = await getAllPosts();
    return NextResponse.json(posts);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}