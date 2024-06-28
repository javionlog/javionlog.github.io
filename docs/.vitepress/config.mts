import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  lang: 'zh-CN',
  lastUpdated: true,
  title: '四夕的博客',
  description: '一个实用的博客',
  themeConfig: {
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
  },
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, './')
      }
    },
    plugins: [vueJsx()]
  }
})
