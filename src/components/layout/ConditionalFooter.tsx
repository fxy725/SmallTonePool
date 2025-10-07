"use client";

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function ConditionalFooter() {
  const pathname = usePathname();
  const [isEditor, setIsEditor] = useState(false);

  useEffect(() => {
    // 编辑器页面已移除，始终显示页脚
    setIsEditor(false);
  }, [pathname]);

  if (isEditor) {
    return null;
  }

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200/70 dark:border-gray-800/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p
            className="text-gray-600 dark:text-gray-400 mb-2"
            style={{ fontFamily: "'LXGW Marker Gothic', sans-serif" }}
          >
            © 2024 小石潭记. All rights reserved.
          </p>
          <p
            className="text-sm text-gray-500 dark:text-gray-500"
            style={{ fontFamily: "'LXGW Marker Gothic', sans-serif" }}
          >
            用心记录每一次学习，用代码书写成长故事
          </p>
        </div>
      </div>
    </footer>
  );
}
