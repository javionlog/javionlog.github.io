import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  title: '四夕的博客',
  titleTemplate: false,
  description: '一个实用的博客',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  lastUpdated: true
})
