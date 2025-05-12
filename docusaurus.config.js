/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '我太擅长表演',
  tagline: 'Hi! I\'m L - Welcome! ❤️ 🌻',
  favicon: 'img/image.png',

  url: 'https://Hei-LuQi.github.io',
  baseUrl: '/',

  organizationName: 'Hei-LuQi',
  projectName: 'Hei-LuQi.github.io',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  themes: ['@docusaurus/theme-mermaid'],

  markdown: {
    mermaid: true,
  },

  stylesheets: [
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    },
    // 其他主题配置...
    metadata: [
      { name: 'robots', content: 'max-image-preview:large' },
      { name: 'keywords', content: '博客,技术,编程,开发' },
    ],
    mermaid: {
      theme: { light: 'neutral', dark: 'forest' },
    },
    navbar: {
      title: '我太擅长表演',
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
          type: 'search',
          position: 'right',
        },
      ],
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
};

module.exports = config; 