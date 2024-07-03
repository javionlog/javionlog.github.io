import { defineConfigWithTheme, DefaultTheme } from 'vitepress'
import { getNavData } from '../../utils/theme'
import { getSidebarData } from '../../utils/theme'

export default defineConfigWithTheme<DefaultTheme.Config>({
  appearance: true,
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    lastUpdated: {
      text: '最近更新时间',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer: {
      message: '@2024 by Fourdusk',
      copyright: 'Power by vitepress'
    },
    nav: getNavData(),
    sidebar: getSidebarData(),
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  }
})
