import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/content/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://smalltone-blog.vercel.app'

    // 静态页面
    const staticPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },

    ]

    // 博客文章
    const posts = await getAllPosts()
    const blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: new Date(post.updated || post.date),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    return [...staticPages, ...blogPages]
}
