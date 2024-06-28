import { defineConfig } from 'vitepress'

export default defineConfig({
  appearance: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: {
      text: '最近更新时间'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: '@2024 by Fourdusk',
      copyright: 'Power by vitepress'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],
    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
