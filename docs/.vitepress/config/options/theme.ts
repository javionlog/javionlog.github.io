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
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        _render(src, env, md) {
          console.log('🚀 ~ _render ~ env:', env)
          let html = md.render(src, env)
          if (env.frontmatter?.search === false) {
            return ''
          }
          if (env.frontmatter?.title) {
            const title = md.render(`# ${env.frontmatter.title}`)
            html = `${title}${html}`
          }
          return html
        }
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
    socialLinks: [{ icon: 'github', link: 'https://github.com/fourdusk/fourdusk.github.io' }]
  }
})
