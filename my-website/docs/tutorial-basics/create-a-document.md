---
sidebar_position: 2
---

# 创建文档

文档是通过以下方式连接的**页面组**：

- **侧边栏**导航
- **上一页/下一页**导航
- **版本控制**功能

## 创建您的第一个文档

在 `docs/hello.md` 创建一个 Markdown 文件：

```md title="docs/hello.md"
# 你好

这是我的**第一个 Docusaurus 文档**！
```

现在可以通过 [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello) 访问这个新文档。

## 配置侧边栏

Docusaurus 会自动从 `docs` 文件夹**创建侧边栏**。

添加元数据来自定义侧边栏标签和位置：

```md title="docs/hello.md" {1-4}
---
sidebar_label: '你好！'
sidebar_position: 3
---

# 你好

这是我的**第一个 Docusaurus 文档**！
```

您也可以在 `sidebars.js` 中显式创建侧边栏：

```js title="sidebars.js"
export default {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: '教程',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```
