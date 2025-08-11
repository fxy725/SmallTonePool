import { getAllTags } from "@/lib/posts";
import { TagCloud } from "@/components/TagCloud";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "标签 - 小石潭记",
  description: "按标签浏览小石潭记博客文章",
};

export default async function TagsPage() {
  const tags = await getAllTags();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">所有标签</h1>
          <p className="text-gray-600 dark:text-gray-400">
            按标签浏览相关文章
          </p>
        </div>
        
        <TagCloud tags={tags} />
        
        {tags.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              暂无标签
            </p>
          </div>
        )}
      </div>
    </div>
  );
}