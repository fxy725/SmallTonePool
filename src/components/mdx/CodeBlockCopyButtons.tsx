'use client';

import { useEffect, useState } from 'react';

export function CodeBlockCopyButtons() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('.prose pre');
      
      codeBlocks.forEach((block) => {
        // 避免重复添加按钮
        if (block.querySelector('.copy-button')) {
          return;
        }

        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code');
        
        button.addEventListener('click', async () => {
          const codeText = block.textContent || '';
          
          try {
            await navigator.clipboard.writeText(codeText);
            
            // 显示复制成功状态
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            // 2秒后恢复原状
            setTimeout(() => {
              button.textContent = 'Copy';
              button.classList.remove('copied');
            }, 2000);
          } catch (error) {
            console.error('Failed to copy code:', error);
            
            // 显示复制失败状态
            button.textContent = 'Failed!';
            button.style.background = 'var(--error)';
            
            setTimeout(() => {
              button.textContent = 'Copy';
              button.style.background = '';
            }, 2000);
          }
        });

        block.appendChild(button);
      });
    };

    // 初始添加按钮
    addCopyButtons();

    // 监听内容变化（例如页面导航）
    const observer = new MutationObserver(() => {
      addCopyButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return null;
}