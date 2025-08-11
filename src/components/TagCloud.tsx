import Link from "next/link";
import { Tag } from "@/types/post";

interface TagCloudProps {
  tags: Tag[];
}

export function TagCloud({ tags }: TagCloudProps) {
  const maxCount = Math.max(...tags.map(tag => tag.count));
  const minCount = Math.min(...tags.map(tag => tag.count));
  
  const getFontSize = (count: number) => {
    if (maxCount === minCount) return 'text-base';
    const ratio = (count - minCount) / (maxCount - minCount);
    if (ratio > 0.8) return 'text-2xl';
    if (ratio > 0.6) return 'text-xl';
    if (ratio > 0.4) return 'text-lg';
    return 'text-base';
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {tags.map((tag) => (
        <Link
          key={tag.name}
          href={`/tags/${tag.name}`}
          className={`${getFontSize(tag.count)} px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400`}
        >
          #{tag.name}
          <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
            ({tag.count})
          </span>
        </Link>
      ))}
    </div>
  );
}