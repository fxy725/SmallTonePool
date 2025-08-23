import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// 缓存管理API
export async function GET() {
    return NextResponse.json({
        status: 'ok',
        message: '缓存管理API',
        endpoints: {
            'POST /api/cache/clear': '清理所有缓存',
            'POST /api/cache/status': '查看缓存状态'
        }
    });
}

// 清理缓存
export async function POST(request: Request) {
    try {
        const { action } = await request.json();

        if (action === 'clear') {
            // 清理Next.js缓存
            revalidateTag('posts');
            revalidateTag('dynamic');
            revalidateTag('dynamic-posts');

            // 清理自定义缓存（如果需要的话）
            // 这里可以添加清理自定义缓存池的逻辑

            return NextResponse.json({
                success: true,
                message: '缓存已清理',
                timestamp: new Date().toISOString()
            });
        }

        if (action === 'status') {
            // 这里可以返回缓存状态信息
            return NextResponse.json({
                status: 'active',
                timestamp: new Date().toISOString(),
                cacheTags: ['posts', 'dynamic', 'dynamic-posts']
            });
        }

        return NextResponse.json({ error: '未知操作' }, { status: 400 });
    } catch (error) {
        console.error('Cache management error:', error);
        return NextResponse.json({ error: '缓存管理失败' }, { status: 500 });
    }
}
