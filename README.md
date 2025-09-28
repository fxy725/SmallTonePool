# 小石潭记 - 个人技术博客

一个基于 Next.js 15 构建的现代化个人技术博客，采用 App Router 和 MDX 内容管理系统，以"小石潭"为主题的视觉设计。

## 🌟 特性

- **🚀 Next.js 15** - 使用 App Router 和静态站点生成
- **📝 MDX 支持** - 支持 Markdown 和 React 组件混合编写
- **🎨 响应式设计** - 完美适配桌面、平板和移动设备
- **🌙 深色模式** - 自动适应系统主题
- **🏷️ 标签系统** - 灵活的标签分类和导航
- **🔍 全文搜索** - 实时搜索文章内容
- **⚡ 性能优化** - 图片优化、代码分割、缓存策略
- **📱 SEO 友好** - 结构化数据、Open Graph、元数据优化
- **🎭 动画效果** - 丰富的交互动画和过渡效果

## 🎨 设计主题

博客采用"小石潭"主题，融合了中国传统美学与现代设计：

- **色彩系统** - 石色/池水色彩板，模拟小石潭的自然色调
- **字体排版** - 优化的中文阅读体验
- **交互动画** - 流畅的过渡效果和微交互
- **品牌元素** - 统一的视觉语言和设计组件

## 🛠️ 技术栈

- **前端框架**: Next.js 15 (App Router)
- **内容管理**: MDX + frontmatter
- **样式系统**: Tailwind CSS 4
- **类型安全**: TypeScript
- **部署平台**: Vercel
- **开发工具**: ESLint, Prettier

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm, yarn, pnpm 或 bun

### 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run dev
# 或
yarn dev
# 或
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 📁 项目结构

```
src/
├── app/                 # Next.js App Router 页面
│   ├── blog/           # 博客相关页面
│   ├── tags/           # 标签相关页面
│   ├── layout.tsx      # 根布局
│   └── page.tsx        # 首页
├── components/         # React 组件
│   ├── PostCard.tsx    # 文章卡片
│   ├── Header.tsx      # 页面头部
│   ├── Hero.tsx        # 首页英雄区
│   └── ...
├── lib/               # 工具库
│   ├── posts.ts       # 文章管理
│   └── ...
└── data/              # 数据文件
    └── posts/         # MDX 文章文件
```

## 🎯 开发命令

```bash
# 开发服务器
npm run dev

# 构建项目
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint

```

## 🚀 部署

### Vercel 部署

项目已配置 Vercel，可以直接部署：

1. 推送代码到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

### 其他平台

项目支持部署到任何支持 Next.js 的平台：

- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- 作者: 小石潭记
- 邮箱: [你的邮箱]
- GitHub: [你的 GitHub 地址]

---

💡 **提示**: 这是一个现代化的技术博客模板，适合开发者分享技术心得和经验总结。
