// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Your Name',
  tagline: 'Hi! I\'m Your Name - welcome! ❤️ 🌻',
  //favicon: 'img/favicon.ico',
  favicon: 'img/image.png',

  // Set the production url of your site here
  url: 'https://your-blog-url.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'your-github-username', // Usually your GitHub org/user name.
  projectName: 'your-blog-repo', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // 添加 Font Awesome
  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // 禁用文档功能
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/your-github-username/your-blog-repo/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus.png',
      navbar: {
        title: 'Your Name',
        logo: {
          alt: 'Your Logfo',
          src: 'img/image.png',
          className: 'navbar-avatar',
        },
        items: [
          {to: '/about', label: 'About', position: 'left'},
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/talks', label: 'Talks', position: 'left'},
          {
            href: 'https://github.com/your-github-username',
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
            title: 'Content',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Archive',
                to: '/blog/archive',
              },
            ],
          },
          {
            title: 'Connect',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/your-github-username',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/your-twitter',
              },
              {
                label: 'LinkedIn',
                href: 'https://linkedin.com/in/your-linkedin',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'My Talks',
                to: '/talks',
              },
              {
                label: 'Blog Archive',
                to: '/blog/archive',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Your Name. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
    }),
};

export default config;
