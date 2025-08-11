#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const postsDir = path.join(process.cwd(), 'src/data/posts');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

async function createPost() {
  console.log('\n📝 创建新的博客文章\n');

  const title = await question('文章标题: ');
  const summary = await question('文章摘要: ');
  const tagsInput = await question('标签 (用逗号分隔): ');
  const tags = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag);

  const today = new Date().toISOString().split('T')[0];
  const slug = slugify(title);

  const frontmatter = `---
title: "${title}"
date: "${today}"
summary: "${summary}"
tags: [${tags.map(tag => `"${tag}"`).join(', ')}]
published: true
---

# ${title}

在这里开始写你的文章内容...

## 引言

## 正文

## 总结
`;

  const filename = `${slug}.mdx`;
  const filepath = path.join(postsDir, filename);

  if (fs.existsSync(filepath)) {
    console.log(`\n❌ 文章 "${filename}" 已存在！`);
    rl.close();
    return;
  }

  fs.writeFileSync(filepath, frontmatter);
  console.log(`\n✅ 文章创建成功！`);
  console.log(`📄 文件路径: ${filepath}`);
  console.log(`🔗 文章链接: /blog/${slug}`);
  
  rl.close();
}

if (!fs.existsSync(postsDir)) {
  fs.mkdirSync(postsDir, { recursive: true });
}

createPost();