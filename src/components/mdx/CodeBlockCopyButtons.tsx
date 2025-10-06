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

        // 复制按钮（使用图标表示状态）
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.setAttribute('aria-label', '复制代码');
        button.setAttribute('title', '复制代码');

        const copyIcon = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke-width="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" stroke-width="2" fill="none"></path>
          </svg>
        `;
        const checkIcon = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        `;
        const errorIcon = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M12 9v4m0 4h.01" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke-width="2" fill="none"></path>
          </svg>
        `;

        button.innerHTML = copyIcon;

        // 收缩/扩展按钮（位于复制按钮左侧）
        const collapseIcon = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M6 15l6-6 6 6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        `;
        const expandIcon = `
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M6 9l6 6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        `;
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'copy-button toggle-button';
        toggleBtn.setAttribute('aria-label', '折叠代码');
        toggleBtn.setAttribute('title', '折叠代码');
        toggleBtn.innerHTML = collapseIcon;

        toggleBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const isCollapsed = pre.classList.toggle('collapsed');
          if (isCollapsed) {
            toggleBtn.innerHTML = expandIcon;
            toggleBtn.setAttribute('aria-label', '展开代码');
            toggleBtn.setAttribute('title', '展开代码');
          } else {
            toggleBtn.innerHTML = collapseIcon;
            toggleBtn.setAttribute('aria-label', '折叠代码');
            toggleBtn.setAttribute('title', '折叠代码');
          }
        });

        button.addEventListener('click', async (ev) => {
          ev.stopPropagation();
          // 若仍在冷却期，则忽略本次点击
          if (button.dataset.cooldown === '1') {
            ev.preventDefault();
            return;
          }

          // 开启冷却与禁用
          button.dataset.cooldown = '1';
          button.disabled = true;
          button.setAttribute('aria-disabled', 'true');

          // 只复制代码内容，不包含工具栏
          const codeText = (codeEl?.innerText || '').trim();

          // 清除上一次的恢复计时器（如有）
          type BtnWithTimer = HTMLButtonElement & { __copyResetTimer?: number };
          const btnWithTimer = button as BtnWithTimer;
          if (btnWithTimer.__copyResetTimer) {
            clearTimeout(btnWithTimer.__copyResetTimer);
            btnWithTimer.__copyResetTimer = undefined;
          }

          const scheduleReset = (delay = 1500) => {
            btnWithTimer.__copyResetTimer = window.setTimeout(() => {
              button.innerHTML = copyIcon;
              button.classList.remove('copied');
              button.disabled = false;
              button.removeAttribute('aria-disabled');
              button.dataset.cooldown = '0';
              btnWithTimer.__copyResetTimer = undefined;
            }, delay);
          };

          try {
            await navigator.clipboard.writeText(codeText);
            button.innerHTML = checkIcon;
            button.classList.add('copied');
            scheduleReset(1500);
          } catch (error) {
            console.error('复制失败:', error);
            button.innerHTML = errorIcon;
            scheduleReset(1500);
          }
        });

        toolbar.appendChild(label);
        const actions = document.createElement('div');
        actions.className = 'codeblock-actions';
        actions.appendChild(toggleBtn);
        actions.appendChild(button);
        toolbar.appendChild(actions);

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
