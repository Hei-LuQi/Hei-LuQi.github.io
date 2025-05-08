// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

// 添加结构化数据（SEO 优化）
const siteStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://Hei-LuQi.github.io',
      url: 'https://Hei-LuQi.github.io',
      name: 'Your Name',
      description: 'Hi! I\'m Your Name - welcome! ❤️ 🌻',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://Hei-LuQi.github.io/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'zh-CN',
    },
    {
      '@type': 'Person',
      '@id': 'https://Hei-LuQi.github.io/about',
      name: 'Your Name',
      image: {
        '@type': 'ImageObject',
        inLanguage: 'zh-CN',
        '@id': 'https://Hei-LuQi.github.io/about#image',
        url: 'https://Hei-LuQi.github.io/img/image.png',
        contentUrl: 'https://Hei-LuQi.github.io/img/image.png',
        caption: 'Your Name',
      },
      description: '这里是您的个人简介',
      url: 'https://Hei-LuQi.github.io',
      sameAs: [
        'https://github.com/your-github-username',
        'https://twitter.com/your-twitter',
        'https://linkedin.com/in/your-linkedin',
      ],
    },
  ],
};

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Your Name',
  tagline: 'Hi! I\'m Your Name - welcome! ❤️ 🌻',
  //favicon: 'img/favicon.ico',
  favicon: 'img/image.png',

  // 设置你的 GitHub Pages URL
  url: 'https://Hei-LuQi.github.io',
  // 设置为仓库名称，如果是用户页面 (.github.io) 则设置为 '/'
  baseUrl: '/',

  // GitHub Pages 部署配置
  organizationName: 'Hei-LuQi', // GitHub 用户名
  projectName: 'Hei-LuQi.github.io', // 仓库名称
  deploymentBranch: 'gh-pages', // 部署分支
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  // 添加 Mermaid 支持
  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  // 添加 Font Awesome
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  ],

  // 添加头部标签
  headTags: [
    // 预加载字体
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap',
      },
    },
    // 添加结构化数据
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify(siteStructuredData),
    },
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // 请将此替换为您的存储库。
          // 删除此选项将删除"编辑此页面"链接。
          editUrl: 'https://github.com/Hei-LuQi/Hei-LuQi.github.io/tree/main/',
          showLastUpdateTime: true,
          showLastUpdateAuthor: true,
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: '最近文章',
          blogSidebarCount: 10,
          postsPerPage: 20,
          blogTitle: '博客文章',
          blogDescription: '这是我的所有博客文章!',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
            copyright: `Copyright © ${new Date().getFullYear()} Your Name.`,
          },
          editUrl: 'https://github.com/Hei-LuQi/Hei-LuQi.github.io/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    [
      'pwa',
      {
        debug: true,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/image.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#4285f4',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/image.png',
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // 添加元数据
      metadata: [
        { name: 'robots', content: 'max-image-preview:large' },
        { name: 'keywords', content: '博客,技术,编程,开发' },
      ],
      
      // 启用 mermaid 图表支持
      mermaid: {
        theme: { light: 'neutral', dark: 'forest' },
      },

      // 添加搜索功能配置（如果你想添加 Algolia 搜索，可以取消注释这部分）
      /*
      algolia: {
        appId: 'YOUR_APP_ID',
        apiKey: 'YOUR_API_KEY',
        indexName: 'YOUR_INDEX_NAME',
      },
      */

      // 替换为你的项目的社交卡片
      image: 'img/image.png',
      navbar: {
        title: 'Your Name',
        logo: {
          alt: 'Your Logo',
          src: 'img/image.png',
          className: 'navbar-avatar',
          width: 32,
          height: 32,
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '文档',
          },
          {to: '/about/', label: 'About', position: 'left'},
          {to: '/blog/archive', label: 'Blog', position: 'left'},
          {to: '/talks', label: 'Talks', position: 'left'},
          {
            href: 'https://github.com/Hei-LuQi',
            label: 'GitHub',
            position: 'right',
          },
          {
            href: 'https://twitter.com/your-twitter',
            label: 'Twitter',
            position: 'right',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'html',
            position: 'right',
            value: '<button class="clean-btn navbar-theme-toggle">🌙</button>',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '内容',
            items: [
              {
                label: '文档',
                to: '/docs/intro',
              },
              {
                label: '博客',
                to: '/blog/archive',
              },
              {
                label: '关于',
                to: '/about',
              },
              {
                label: '归档',
                to: '/blog/archive',
              },
              {
                label: '标签',
                to: '/blog/tags',
              },
            ],
          },
          {
            title: '热门分类',
            items: [
              {
                label: 'JavaScript',
                to: '/blog/tags/javascript',
              },
              {
                label: 'React',
                to: '/blog/tags/react',
              },
              {
                label: 'TypeScript',
                to: '/blog/tags/typescript',
              },
              {
                label: 'Node.js',
                to: '/blog/tags/nodejs',
              },
            ],
          },
          {
            title: '社交链接',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Hei-LuQi',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/your-twitter',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/your-linkedin',
              },
              {
                label: 'RSS 订阅',
                href: '/blog/rss.xml',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Name. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'powershell',
          'csharp',
          'docker',
          'bash',
          'json',
          'yaml',
          'java',
          'go',
          'python',
        ],
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
