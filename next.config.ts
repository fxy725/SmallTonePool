import type { NextConfig } from "next";
import createMDX from '@next/mdx';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkToc],
    rehypePlugins: [rehypeSlug, rehypeHighlight],
  },
});

export default withMDX(nextConfig);
