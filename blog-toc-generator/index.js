const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

// 创建命令行交互界面
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 博客文章目录路径
const BLOG_DIR = path.join(__dirname, '..', 'my-website', 'blog');

// 可用的作者列表
const AVAILABLE_AUTHORS = ['yangshun', 'slorber'];

// 生成文章模板内容
function generatePostTemplate(title, slug, author = 'yangshun', tags = ['blog']) {
    const date = new Date();
    const formattedDate = date.toISOString().split('T')[0];
    
    return `---
slug: ${slug}
title: ${title}
authors: [${author}]
tags: [${tags.join(', ')}]
---

{/* truncate */}

## 简介

在这里添加文章简介...

## 正文

在这里添加文章正文...

## 总结

在这里添加文章总结...

## 参考资料

- 参考资料 1
- 参考资料 2
`;
}

// 创建文章文件
async function createBlogPost(title, author, tags) {
    try {
        // 生成 slug
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        
        // 创建日期
        const date = new Date();
        const dateStr = date.toISOString().split('T')[0];
        
        // 生成文件名
        const fileName = `${dateStr}-${slug}.md`;
        const postFile = path.join(BLOG_DIR, fileName);
        
        // 生成文章内容
        const content = generatePostTemplate(title, slug, author, tags);
        
        // 写入文章文件
        await fs.writeFile(postFile, content);
        
        // 创建资源目录
        const assetsDir = path.join(BLOG_DIR, 'assets', slug);
        await fs.ensureDir(assetsDir);
        
        console.log('\n博客文章创建成功！');
        console.log(`文章: ${postFile}`);
        console.log(`资源目录: ${assetsDir}`);
        console.log('\n你可以在资源目录中添加图片等资源文件。');
        
    } catch (error) {
        console.error('创建博客文章时出错:', error);
    }
}

// 主函数
async function main() {
    console.log('欢迎使用博客文章生成器！\n');
    console.log('可用的作者:');
    AVAILABLE_AUTHORS.forEach(author => console.log(`- ${author}`));
    console.log('');
    
    rl.question('请输入文章标题: ', (title) => {
        rl.question(`请输入作者名称 (${AVAILABLE_AUTHORS.join('/')}): `, (author) => {
            rl.question('请输入标签，用逗号分隔 (默认: blog): ', (tags) => {
                const authorName = author.trim() || 'yangshun';
                if (!AVAILABLE_AUTHORS.includes(authorName)) {
                    console.error(`错误: 作者 "${authorName}" 不在可用作者列表中`);
                    rl.close();
                    return;
                }
                
                const tagList = tags.trim() ? tags.split(',').map(tag => tag.trim()) : ['blog'];
                
                createBlogPost(title, authorName, tagList)
                    .then(() => rl.close())
                    .catch(error => {
                        console.error('发生错误:', error);
                        rl.close();
                    });
            });
        });
    });
}

main(); 