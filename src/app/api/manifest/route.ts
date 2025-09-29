import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const theme = searchParams.get('theme') || 'light';

    const isDark = theme === 'dark';
    const backgroundColor = isDark ? '#000000' : '#ffffff';
    const themeColor = isDark ? '#000000' : '#ffffff';

    const manifest = {
        name: "小石潭记 - 技术心得与经验总结",
        short_name: "小石潭记",
        description: "分享编程路上的点点滴滴，记录技术成长的心路历程",
        start_url: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: backgroundColor,
        theme_color: themeColor,
        scope: "/",
        lang: "zh-CN",
        categories: ["education", "productivity", "lifestyle"],
        dir: "ltr",
        icons: [
            {
                src: "/assets/Logo.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/assets/Logo.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any"
            },
            {
                src: "/assets/Logo.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable"
            },
            {
                src: "/assets/Logo.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable"
            }
        ],
        shortcuts: [
            {
                name: "博客首页",
                short_name: "首页",
                description: "查看最新博客文章",
                url: "/blog",
                icons: [
                    {
                        src: "/assets/Logo.png",
                        sizes: "96x96"
                    }
                ]
            },
            {
                name: "关于作者",
                short_name: "关于",
                description: "了解作者信息",
                url: "/about",
                icons: [
                    {
                        src: "/assets/Profile.png",
                        sizes: "96x96"
                    }
                ]
            }
        ],
        prefer_related_applications: false
    };

    return new Response(JSON.stringify(manifest, null, 2), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=3600', // 缓存1小时
        },
    });
}
