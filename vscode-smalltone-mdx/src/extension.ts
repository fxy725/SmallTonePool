import * as vscode from 'vscode';
// 依赖在运行时按需动态导入，避免扩展激活阶段失败

// 简单的 MDX 语法结构解析器：提取标题、代码块、区块引用等，用于大纲
function parseMdxForSymbols(text: string): vscode.DocumentSymbol[] {
    const lines = text.split(/\r?\n/);
    const root: vscode.DocumentSymbol[] = [];

    const headingRegex = /^(#{1,6})\s+(.*)$/;
    const codeFenceStart = /^```(.*)$/;
    const blockquote = /^>\s+(.*)$/;

    const headingStack: { level: number; symbol: vscode.DocumentSymbol }[] = [];
    let inFence = false;
    let fenceStart = 0;
    let fenceLang = '';

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (!inFence && headingRegex.test(line)) {
            const m = line.match(headingRegex)!;
            const level = m[1].length;
            const name = m[2].trim();
            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
            const sym = new vscode.DocumentSymbol(name, `H${level}`, vscode.SymbolKind.Namespace, range, range);

            while (headingStack.length && headingStack[headingStack.length - 1].level >= level) {
                headingStack.pop();
            }
            if (headingStack.length === 0) {
                root.push(sym);
            } else {
                headingStack[headingStack.length - 1].symbol.children.push(sym);
            }
            headingStack.push({ level, symbol: sym });
            continue;
        }

        if (!inFence && codeFenceStart.test(line)) {
            inFence = true;
            fenceStart = i;
            const m = line.match(codeFenceStart);
            fenceLang = (m && m[1]) ? m[1].trim() : '';
            continue;
        }
        if (inFence && /^```\s*$/.test(line)) {
            const start = new vscode.Position(fenceStart, 0);
            const end = new vscode.Position(i, line.length);
            const range = new vscode.Range(start, end);
            const name = fenceLang ? `代码块 (${fenceLang})` : '代码块';
            const sym = new vscode.DocumentSymbol(name, '', vscode.SymbolKind.Object, range, range);
            root.push(sym);
            inFence = false;
            fenceLang = '';
            continue;
        }

        if (!inFence && blockquote.test(line)) {
            const m = line.match(blockquote)!;
            const name = `引用: ${m[1].slice(0, 42)}`;
            const range = new vscode.Range(new vscode.Position(i, 0), new vscode.Position(i, line.length));
            const sym = new vscode.DocumentSymbol(name, '', vscode.SymbolKind.String, range, range);
            root.push(sym);
            continue;
        }
    }

    return root;
}

class MdxDocumentSymbolProvider implements vscode.DocumentSymbolProvider {
    // 提供文档符号供大纲视图使用
    provideDocumentSymbols(document: vscode.TextDocument): vscode.ProviderResult<vscode.DocumentSymbol[]> {
        try {
            const text = document.getText();
            return parseMdxForSymbols(text);
        } catch (e) {
            console.error(e);
            return [];
        }
    }
}

// Webview 预览：渲染与站点一致的 HTML 结构和样式占位符
async function readWorkspaceFileText(relPath: string): Promise<string> {
    try {
        const ws = vscode.workspace.workspaceFolders?.[0];
        if (!ws) return '';
        const uri = vscode.Uri.joinPath(ws.uri, relPath);
        const bytes = await vscode.workspace.fs.readFile(uri);
        return Buffer.from(bytes).toString('utf8');
    } catch {
        return '';
    }
}

async function getPreviewHtml(webview: vscode.Webview, mdxHtml: string, fm?: { title?: string; summary?: string; tags?: string[] }): Promise<string> {
    // 这里通过简单样式占位，扩展与站点保持一致的 CSS 由用户项目提供；
    // 我们提供基础的深浅主题自适应和代码高亮容器。
    const nonce = String(Date.now());
    const cfg = vscode.workspace.getConfiguration('smalltoneMdx');
    const cssPath = cfg.get<string>('preview.cssPath', 'src/app/globals.css');
    const wrapperClass = cfg.get<string>('preview.wrapperClass', 'prose prose-lg dark:prose-invert max-w-none text-content article-content-selectable');
    const siteCss = await readWorkspaceFileText(cssPath);
    // 映射项目内字体到 Webview 可访问的 URI
    const ws = vscode.workspace.workspaceFolders?.[0];
    let fontFaceCss = '';
    if (ws) {
        const f = (name: string) => webview.asWebviewUri(vscode.Uri.joinPath(ws.uri, 'public', 'fonts', name)).toString();
        const fontDefs = [
            { family: 'LXGW Marker Gothic', file: 'LXGWMarkerGothic-Regular.ttf' },
            { family: 'Cascadia Mono', file: 'CascadiaMono-Regular.ttf' },
            { family: 'LXGW WenKai Mono TC', file: 'LXGWWenKaiMonoTC-Regular.ttf' },
            { family: 'Jacquard 24 Charted', file: 'Jacquard24-Regular.ttf' }
        ];
        fontFaceCss = fontDefs.map(d => `@font-face{font-family:"${d.family}";src:url('${f(d.file)}') format('truetype');font-weight:400;font-style:normal;font-display:swap;}`).join('\n');
    }

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>MDX 预览</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" />
  <style>
    body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
    .container { padding: 0 24px 24px; }
    .prose { max-width: 860px; margin: 0 auto; font-size: 1rem; }
    pre { overflow: auto; }
    ${fontFaceCss}
    ${siteCss}
  </style>
  <script nonce="${nonce}">
    const vscode = acquireVsCodeApi();
    function setHeader(data){
      const t = document.getElementById('headerTitle');
      const s = document.getElementById('headerSummary');
      const tags = document.getElementById('headerTags');
      if (t) t.textContent = (data?.title||'').trim();
      if (s) s.textContent = (data?.summary||'').trim();
      if (tags) {
        tags.innerHTML = '';
        (data?.tags||[]).forEach((txt)=>{
          const span = document.createElement('span');
          span.className = 'px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm';
          span.textContent = txt;
          tags.appendChild(span);
        });
      }
    }
    window.addEventListener('message', (e) => {
      if (e?.data?.type === 'update') {
        const el = document.getElementById('content');
        if (el) el.innerHTML = e.data.html || '';
        if (e?.data?.fm) setHeader(e.data.fm);
      }
    });
  </script>
  </head>
  <body>
    <div class="container">
      <header class="bg白 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700" style="font-family: var(--font-content); padding: 1rem 0; margin-bottom: .75rem;">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 id="headerTitle" class="text-3xl md:text-4xl font-bold mb-3 text-gray-900 dark:text-white">${(fm?.title || '').replace(/[<>]/g, '')}</h1>
          ${fm?.summary !== undefined ? `<p id=\"headerSummary\" class=\"text-lg text-gray-600 dark:text-gray-400\">${(fm.summary || '').replace(/[<>]/g, '')}</p>` : `<p id=\"headerSummary\" class=\"text-lg text-gray-600 dark:text-gray-400\"></p>`}
          <div id="headerTags" class="flex flex-wrap gap-2 mt-3">${(fm?.tags || []).map(t => `<span class=\"px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm\">${t.replace(/[<>]/g, '')}</span>`).join('')}</div>
        </div>
      </header>
      <div id="content" class="${wrapperClass}" style="font-size: .95rem;">${mdxHtml}</div>
      <footer class="mt-10 text-center text-xs text-gray-500 dark:text-gray-400" style="font-family: var(--font-content); padding-top: 1.25rem; border-top: 1px solid rgba(0,0,0,0.08);">
        <div>实时预览 · 与站点样式一致</div>
      </footer>
    </div>
  </body>
  </html>`;
}

// 简化的 MDX 渲染：此处不执行 MDX 组件，仅按已有 remark/rehype 的 HTML 输出做占位。
// VSCode 扩展内无法直接复用 Next 项目的运行时代码，这里将文本作为 HTML 传递。
// 如果需要完全一致的样式，建议在 HTML 中注入与站点相同的 CSS（未来可通过设置项指定 CSS 路径）。
async function renderToHtmlWithPipeline(text: string): Promise<string> {
    try {
        // 去除 frontmatter
        const content = text.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '');
        const { unified } = await import('unified');
        const remarkParse = (await import('remark-parse')).default;
        const remarkGfm = (await import('remark-gfm')).default;
        const remarkBreaks = (await import('remark-breaks')).default;
        const remarkMath = (await import('remark-math')).default;
        const remarkRehype = (await import('remark-rehype')).default;
        const rehypeKatex = (await import('rehype-katex')).default;
        const rehypeSlug = (await import('rehype-slug')).default;
        const rehypeHighlight = (await import('rehype-highlight')).default;
        const rehypeStringify = (await import('rehype-stringify')).default;
        const file = await unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkBreaks)
            .use(remarkMath)
            .use(remarkRehype)
            .use(rehypeKatex)
            .use(rehypeSlug)
            .use(rehypeHighlight)
            .use(rehypeStringify)
            .process(content);
        // 移除 h1 行为可配置
        const removeH1 = vscode.workspace.getConfiguration('smalltoneMdx').get<boolean>('preview.removeFirstH1', true);
        const html = String(file);
        return removeH1 ? html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, '') : html;
    } catch (e) {
        console.error(e);
        const escaped = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return `<pre>${escaped}</pre>`;
    }
}

function parseFrontmatter(content: string): { title?: string; summary?: string; tags?: string[] } {
    try {
        const m = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
        if (!m) return {};
        const body = m[1];
        const lines = body.split(/\n/).filter(Boolean);
        const map: Record<string, string> = {};
        for (const line of lines) {
            const idx = line.indexOf(':');
            if (idx === -1) continue;
            const k = line.slice(0, idx).trim();
            const v = line.slice(idx + 1).trim().replace(/^['"]|['"]$/g, '');
            map[k] = v;
        }
        const tags = map['tags'] ? map['tags'].replace(/[\[\]]/g, '').split(',').map(s => s.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean) : undefined;
        return { title: map['title'], summary: map['summary'], tags };
    } catch { return {}; }
}

export function activate(context: vscode.ExtensionContext) {
    // 注册大纲提供器
    context.subscriptions.push(
        vscode.languages.registerDocumentSymbolProvider({ language: 'mdx' }, new MdxDocumentSymbolProvider())
    );

    // 新建 MDX 文件命令
    context.subscriptions.push(
        vscode.commands.registerCommand('smalltoneMdx.createFile', async () => {
            try {
                const ws = vscode.workspace.workspaceFolders?.[0];
                if (!ws) {
                    vscode.window.showErrorMessage('未找到工作区');
                    return;
                }
                const folderUri = ws.uri;
                const name = await vscode.window.showInputBox({ prompt: '输入文件名（不含扩展名）', value: 'new-post' });
                if (!name) return;
                const fileUri = vscode.Uri.joinPath(folderUri, `${name}.mdx`);
                const exists = await vscode.workspace.fs.stat(fileUri).then(() => true, () => false);
                if (exists) {
                    const overwrite = await vscode.window.showQuickPick(['是', '否'], { placeHolder: '文件已存在，是否覆盖？' });
                    if (overwrite !== '是') return;
                }
                const now = new Date().toISOString().slice(0, 10);
                const boilerplate = `---\n` +
                    `title: "${name}"\n` +
                    `date: "${now}"\n` +
                    `summary: ""\n` +
                    `tags: []\n` +
                    `---\n\n# ${name}\n\n开始创作...\n`;
                await vscode.workspace.fs.writeFile(fileUri, Buffer.from(boilerplate, 'utf8'));
                const doc = await vscode.workspace.openTextDocument(fileUri);
                await vscode.window.showTextDocument(doc);
                vscode.window.showInformationMessage('已创建 MDX 文件');
            } catch (e) {
                console.error(e);
                vscode.window.showErrorMessage('创建 MDX 文件失败');
            }
        })
    );

    // 打开预览命令
    context.subscriptions.push(
        vscode.commands.registerCommand('smalltoneMdx.openPreview', async () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor || editor.document.languageId !== 'mdx') {
                vscode.window.showWarningMessage('请先在一个 MDX 文件中使用该命令');
                return;
            }
            const panel = vscode.window.createWebviewPanel(
                'smalltoneMdxPreview',
                'MDX 预览',
                vscode.ViewColumn.Beside,
                { enableScripts: true, retainContextWhenHidden: true }
            );

            const doc = editor.document;
            const raw = doc.getText();
            const fm = parseFrontmatter(raw);
            const html = await renderToHtmlWithPipeline(raw);
            panel.webview.html = await getPreviewHtml(panel.webview, html, fm);

            const auto = vscode.workspace.getConfiguration('smalltoneMdx').get<boolean>('preview.autoUpdate', true);
            if (auto) {
                const sub = vscode.workspace.onDidChangeTextDocument(async (e: vscode.TextDocumentChangeEvent) => {
                    if (e.document.uri.toString() === doc.uri.toString()) {
                        const raw = e.document.getText();
                        const html = await renderToHtmlWithPipeline(raw);
                        const fm = parseFrontmatter(raw);
                        panel.webview.postMessage({ type: 'update', html, fm });
                    }
                });
                panel.onDidDispose(() => sub.dispose());
            }
        })
    );

    // 状态栏提示扩展已激活
    const item = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    item.text = '$(markdown)';
    item.tooltip = 'Smalltone MDX Tools';
    item.command = 'smalltoneMdx.openPreview';
    item.show();
    context.subscriptions.push(item);
}

export function deactivate() {
    // 空实现
}


