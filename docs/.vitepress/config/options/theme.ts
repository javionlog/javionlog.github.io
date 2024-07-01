import { defineConfigWithTheme, DefaultTheme } from 'vitepress'
import { getNavData } from '../../utils/theme'
console.log('🚀 ~ getNavData2:', getNavData())

export default defineConfigWithTheme<
  | DefaultTheme.Config
  | {
      nav: Array<Record<PropertyKey, unknown>>
    }
>({
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
    nav: getNavData(),
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
