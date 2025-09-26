'use client';

import { useEffect, useState } from 'react';

// 将语言标识转换为友好的显示名称（尽量覆盖常见语言）
function normalizeLanguageName(raw: string | null): string {
  if (!raw) return '文本';
  const lower = raw.toLowerCase();
  const map: Record<string, string> = {
    js: 'JavaScript', javascript: 'JavaScript', jsx: 'JSX',
    ts: 'TypeScript', typescript: 'TypeScript', tsx: 'TSX',
    json: 'JSON', yaml: 'YAML', yml: 'YAML', toml: 'TOML', ini: 'INI',
    html: 'HTML', css: 'CSS', scss: 'SCSS', less: 'LESS',
    md: 'Markdown', markdown: 'Markdown', mdx: 'MDX',
    bash: 'Bash', sh: 'Shell', shell: 'Shell', zsh: 'Zsh',
    powershell: 'PowerShell', ps1: 'PowerShell',
    py: 'Python', python: 'Python',
    java: 'Java',
    c: 'C', cpp: 'C++', cplusplus: 'C++', cxx: 'C++',
    cs: 'C#', csharp: 'C#',
    go: 'Go',
    rs: 'Rust', rust: 'Rust',
    php: 'PHP',
    rb: 'Ruby', ruby: 'Ruby',
    swift: 'Swift',
    kt: 'Kotlin', kotlin: 'Kotlin',
    dart: 'Dart',
    lua: 'Lua',
    sql: 'SQL',
    graphql: 'GraphQL', gql: 'GraphQL',
    vue: 'Vue', svelte: 'Svelte',
    dockerfile: 'Dockerfile', makefile: 'Makefile'
  };
  return map[lower] || raw.toUpperCase();
}

// 尝试从元素类名/属性中提取语言
function detectLanguage(pre: Element, code: Element | null): string | null {
  const getFrom = (el: Element | null): string | null => {
    if (!el) return null;
    // data-language 优先
    const dataLang = el.getAttribute('data-language');
    if (dataLang) return dataLang;
    // 类名中查找 language-xxx 或 lang-xxx
    for (const cls of Array.from(el.classList)) {
      if (cls.startsWith('language-')) return cls.replace(/^language-/, '');
      if (cls.startsWith('lang-')) return cls.replace(/^lang-/, '');
    }
    return null;
  };
  return getFrom(code) || getFrom(pre) || null;
}

export function CodeBlockCopyButtons() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const enhanceCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll('.prose pre');

      codeBlocks.forEach((pre) => {
        // 已经处理过则跳过
        if (pre.querySelector('.codeblock-toolbar')) return;

        // 移除旧版本直接挂在 pre 下的复制按钮
        pre.querySelectorAll(':scope > button.copy-button').forEach((btn) => btn.remove());

        const codeEl = pre.querySelector('code');
        const rawLang = detectLanguage(pre, codeEl);
        const langLabel = normalizeLanguageName(rawLang);

        // 顶部工具栏容器
        const toolbar = document.createElement('div');
        toolbar.className = 'codeblock-toolbar';

        // 语言标签
        const label = document.createElement('span');
        label.className = 'codeblock-lang';
        label.textContent = langLabel;

        // 复制按钮
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = '复制';
        button.setAttribute('aria-label', '复制代码');

        button.addEventListener('click', async (ev) => {
          ev.stopPropagation();
          // 只复制代码内容，不包含工具栏
          const codeText = (codeEl?.innerText || '').trim();
          try {
            await navigator.clipboard.writeText(codeText);
            button.textContent = '已复制';
            button.classList.add('copied');
            setTimeout(() => {
              button.textContent = '复制';
              button.classList.remove('copied');
            }, 1500);
          } catch (error) {
            console.error('复制失败:', error);
            button.textContent = '失败';
            setTimeout(() => {
              button.textContent = '复制';
            }, 1500);
          }
        });

        toolbar.appendChild(label);
        toolbar.appendChild(button);

        // 将工具栏插入到代码块顶部
        pre.insertBefore(toolbar, pre.firstChild);
        // 添加标记类，为 CSS 预留顶部空间
        pre.classList.add('has-toolbar');
      });
    };

    // 初始处理一次
    enhanceCodeBlocks();

    // 监听内容变化（例如页面导航/渲染完成）
    const observer = new MutationObserver(() => {
      enhanceCodeBlocks();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!isMounted) {
    return null;
  }

  return null;
}