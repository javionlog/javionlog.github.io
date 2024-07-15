import { resolve } from 'node:path'

import vueJsx from '@vitejs/plugin-vue-jsx'
import unoCSS from 'unocss/vite'
import { FileSystemIconLoader as iconLoader } from 'unplugin-icons/loaders'
import iconsResolver from 'unplugin-icons/resolver'
import icons from 'unplugin-icons/vite'
import components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vitepress'
import { chineseSearchOptimize, pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'docs/.vitepress')
      }
    },
    plugins: [
      vueJsx(),
      unoCSS(),
      icons({
        scale: 1,
        compiler: 'vue3',
        customCollections: {
          vpi: iconLoader(resolve(process.cwd(), 'docs/.vitepress/theme/icons'))
        }
      }),
      components({
        dts: '../../types/components.d.ts',
        resolvers: [
          iconsResolver({
            prefix: false,
            customCollections: ['vpi']
          })
        ]
      }),
      pagefindPlugin({
        customSearchQuery: chineseSearchOptimize,
        showDate: true
      })
    ]
  }
})
