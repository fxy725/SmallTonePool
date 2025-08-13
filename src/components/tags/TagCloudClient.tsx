"use client";

import { Tag } from "@/types/blog";
import { useRouter, useSearchParams } from "next/navigation";

interface TagCloudProps {
    tags: Tag[];
}

export function TagCloud({ tags }: TagCloudProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentTag = searchParams.get("tag");

    const maxCount = Math.max(...tags.map(tag => tag.count));
    const minCount = Math.min(...tags.map(tag => tag.count));

    const getSizeClasses = (count: number) => {
        if (maxCount === minCount) return 'px-4 py-2 text-base';
        const ratio = (count - minCount) / (maxCount - minCount);
        if (ratio > 0.8) return 'px-6 py-3 text-xl';
        if (ratio > 0.6) return 'px-5 py-2.5 text-lg';
        if (ratio > 0.4) return 'px-4 py-2 text-base';
        return 'px-3 py-1.5 text-sm';
    };

    const getGradient = (index: number) => {
        const gradients = [
            'from-blue-500 to-cyan-500',
            'from-slate-500 to-gray-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-amber-500',
            'from-indigo-500 to-blue-500',
            'from-teal-500 to-cyan-500',
            'from-yellow-500 to-orange-500',
            'from-teal-500 to-blue-500',
        ];
        return gradients[index % gradients.length];
    };

    const handleTagClick = (tagName: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (currentTag === tagName) {
            // 如果点击的是当前选中的标签，则清除过滤
            params.delete("tag");
        } else {
            // 否则设置新的标签过滤
            params.set("tag", tagName);
        }

        router.push(`/blog?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {tags.map((tag, index) => {
                const isActive = currentTag === tag.name;

                return (
                    <button
                        key={tag.name}
                        onClick={() => handleTagClick(tag.name)}
                        className={`
              group relative ${getSizeClasses(tag.count)} 
              bg-gradient-to-r ${getGradient(index)} 
              text-white font-medium rounded-full 
              shadow-lg hover:shadow-xl 
              transform hover:scale-105 
              transition-all duration-300 
              overflow-hidden
              ${isActive ? 'ring-4 ring-white ring-opacity-50 scale-105' : ''}
            `}
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {tag.name}
                            <span className="text-xs opacity-80">
                                ({tag.count})
                            </span>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                );
            })}
        </div>
    );
}
