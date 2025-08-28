# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 开发守则
- 根据用户要求实现功能、修复错误、优化细节
- 完成任务后由用户决定继续开发还是本地构建，构建报错即修复错误
- 如果开发流程创建或删除文件，需修改Claude.md中目录结构部分内容，如果文件作用发生较大变化，也需修改
- 内容为简体中文。
- 不要自行启动开发服务器，交由用户完成并告诉你结果，除非用户明确要求。

## 最新更新 (2024)
### 手动主题切换功能 ✅ 已完成
✅ **已实现并优化完整的手动主题切换系统**：
- **Tailwind CSS 4.0 配置**：创建 `tailwind.config.ts`，设置 `darkMode: 'class'` 策略
- **主题上下文管理**：React Context + localStorage 持久化
- **防闪烁优化**：服务端预加载脚本，避免主题切换闪烁
- **三选一切换器**：系统/浅色/深色三种模式，默认系统主题
- **优化过渡效果**：使用 cubic-bezier 缓动函数，自然流畅的切换动画
- **简洁设计**：移除花哨装饰，无悬浮提示，专注核心功能
- **Header集成**：三选一按钮固定右侧，不影响导航居中布局
- **代码优化**：删除测试页面，简化组件结构，提升性能

## 项目架构

### 技术栈
- **Next.js 15.4.6** - App Router + 静态站点生成
- **React 19.1.0** - 用户界面框架
- **TypeScript** - 类型安全
- **MDX 3.1.0** - 内容管理（支持 @next/mdx）
- **Tailwind CSS 4** - 样式系统（使用 @tailwindcss/postcss）
- **Vercel** - 部署平台


### 目录结构
```
src/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 根布局（字体和元数据 + ThemeProvider）
│   ├── page.tsx             # 首页（最新文章）
│   ├── blog/
│   │   ├── page.tsx         # 博客列表页
│   │   └── [slug]/
│   │       └── page.tsx     # 单篇文章页
│   ├── tags/
│   │   ├── page.tsx         # 标签列表
│   │   └── [tag]/
│   │       └── page.tsx     # 单个标签页
│   ├── home/               # 首页路由
│   ├── rss.xml/
│   │   └── route.ts         # RSS 订阅源生成
│   ├── sitemap.ts          # 站点地图生成
│   ├── robots.ts           # 爬虫配置
│   └── globals.css         # 全局样式（增强主题切换动画）
├── components/              # 可复用组件
│   ├── layout/
│   │   └── Header.tsx      # 导航头部（使用极简主题切换器）
│   ├── ui/                 # UI 组件目录
│   │   └── ThemeToggle.tsx # 三选一主题切换按钮组件
│   ├── Hero.tsx            # 首页英雄区域
│   ├── PostCard.tsx        # 文章卡片
│   ├── MDXRenderer.tsx     # MDX 组件样式
│   ├── Search.tsx          # 搜索功能
│   ├── StructuredData.tsx  # SEO 结构化数据
│   ├── TagCloud.tsx        # 标签云
│   └── CopyButton.tsx      # 复制按钮组件
├── contexts/                # 【新增】React Context 管理
│   └── ThemeContext.tsx    # 主题状态管理和持久化
├── lib/
│   └── posts.ts            # 核心文章管理逻辑
├── types/
│   └── post.ts             # TypeScript 接口
└── data/
    └── posts/              # MDX 博客文章
```

### 配置文件
```
├── tailwind.config.ts       # ✅ Tailwind CSS 4.0 配置（darkMode: 'class'）
├── postcss.config.mjs       # PostCSS 配置
├── next.config.ts           # Next.js 配置
└── tsconfig.json           # TypeScript 配置
```

### 主题设计
**小石潭主题** - 基于石头和池塘的色彩搭配：
- 主色调：石灰色调（slate/gray）
- 强调色：池水蓝色调（blue/indigo）
- 背景：渐变效果模拟水面
- 动画：浮动元素模拟水中涟漪

### 特色功能
1. **中文技术博客** - 专注编程教程
2. **静态站点生成** - 性能优化
3. **全面 SEO** - 结构化数据支持
5. **搜索功能** - 实时过滤
6. **标签系统** - 专用标签页面
7. **RSS 订阅** - 读者订阅
8. **响应式设计** - 深色模式支持
9. **手动主题切换** - 浅色/深色/系统三种模式，带动画效果
10. **主题持久化** - localStorage 保存用户偏好
11. **防闪烁优化** - 服务端预加载，无缝主题切换
12. **自定义主题** - 小石潭视觉风格
13. **优雅的复制提示** - 替代原生alert弹窗
14. **三选一主题切换** - 系统/浅色/深色，默认系统主题
15. **优化切换动画** - 自然流畅的过渡效果

### 主题系统架构 ✅ 已完成
- **策略**: Tailwind CSS 4.0 class 模式 (`darkMode: 'class'`)
- **状态管理**: React Context + 自定义 Hook (`useTheme`)
- **持久化**: localStorage + 系统偏好检测，默认系统主题
- **UI组件**: 三选一切换器 (`TripleThemeToggle`) - 系统/浅色/深色
- **防闪烁**: 内联脚本预设主题，避免白屏闪烁
- **过渡效果**: 优化的 cubic-bezier 缓动函数，0.2-0.3s 平滑过渡
- **兼容性**: 支持 SSR，处理 hydration 同步
- **布局优化**: 三选一按钮固定右侧，不影响导航居中布局
- **简洁设计**: 无悬浮提示，无花哨装饰，专注核心功能
