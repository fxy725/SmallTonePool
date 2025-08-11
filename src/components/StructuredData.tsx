interface StructuredDataProps {
  type: 'Blog' | 'BlogPosting' | 'BreadcrumbList';
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: Record<string, unknown>;

  switch (type) {
    case 'Blog':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "小石潭记",
        "description": "技术心得与经验总结",
        "url": "https://smalltone-blog.vercel.app",
        "author": {
          "@type": "Person",
          "name": "小石潭记"
        },
        "publisher": {
          "@type": "Organization",
          "name": "小石潭记",
          "logo": {
            "@type": "ImageObject",
            "url": "https://smalltone-blog.vercel.app/logo.png"
          }
        }
      };
      break;

    case 'BlogPosting':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": data.title,
        "description": data.summary,
        "datePublished": data.date,
        "dateModified": data.updated || data.date,
        "author": {
          "@type": "Person",
          "name": "小石潭记"
        },
        "publisher": {
          "@type": "Organization",
          "name": "小石潭记",
          "logo": {
            "@type": "ImageObject",
            "url": "https://smalltone-blog.vercel.app/logo.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `https://smalltone-blog.vercel.app/blog/${data.slug as string}`
        },
        "keywords": (data.tags as string[]).join(", "),
        "articleSection": "Technology",
        "wordCount": (data.content as string).split(/\s+/).length
      };
      break;

    case 'BreadcrumbList':
      structuredData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": (data.items as { name: string; url: string }[]).map((item, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": item.name,
          "item": item.url
        }))
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}