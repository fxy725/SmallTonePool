import Link from "next/link";
import { Tag } from "@/types/blog";

interface TagCloudProps {
    tags: Tag[];
}

export function TagCloud({ tags }: TagCloudProps) {
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
            'from-purple-500 to-pink-500',
            'from-green-500 to-teal-500',
            'from-orange-500 to-red-500',
            'from-indigo-500 to-purple-500',
            'from-pink-500 to-rose-500',
            'from-yellow-500 to-orange-500',
            'from-teal-500 to-blue-500',
        ];
        return gradients[index % gradients.length];
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center">
            {tags.map((tag, index) => (
                <Link
                    key={tag.name}
                    href={`/tags/${tag.name}`}
                    className={`
            group relative ${getSizeClasses(tag.count)} 
            bg-gradient-to-r ${getGradient(index)} 
            text-white font-medium rounded-full 
            shadow-lg hover:shadow-xl 
            transform hover:scale-105 
            transition-all duration-300 
            overflow-hidden
          `}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        #{tag.name}
                        <span className="text-xs opacity-80">
                            ({tag.count})
                        </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
            ))}
        </div>
    );
}
