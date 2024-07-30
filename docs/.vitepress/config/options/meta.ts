import { defineConfig } from 'vitepress'

import { getPackageJson } from '../../utils/theme'

export default defineConfig({
  base: '/',
  lang: 'zh-cn',
  title: '四夕的博客',
  titleTemplate: false,
  description: '一个实用的博客',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'author', content: getPackageJson().author }],
    ['meta', { name: 'keywords', content: '前端,后端,全栈,程序员,实用,博客' }]
  ]
})
