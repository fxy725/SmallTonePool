import { getAllPosts } from '@/lib/content/posts';
import RSS from 'rss';

export async function GET() {
    const posts = await getAllPosts();
    const site_url = 'https://smalltone-blog.vercel.app';

    const feed = new RSS({
        title: '小石潭记 - 技术心得与经验总结',
        description: '分享编程路上的点点滴滴，记录技术成长的心路历程',
        feed_url: `${site_url}/rss.xml`,
        site_url: site_url,
        language: 'zh-CN',
        copyright: `© ${new Date().getFullYear()} 小石潭记. All rights reserved.`,
        managingEditor: '小石潭记',
        webMaster: '小石潭记',
        ttl: 60,
    });

    posts.forEach((post) => {
        feed.item({
            title: post.title,
            description: post.summary,
            url: `${site_url}/blog/${post.slug}`,
            guid: `${site_url}/blog/${post.slug}`,
            date: new Date(post.date),
            author: '小石潭记',
            categories: post.tags,
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    });
}
