import { defineConfig } from 'vitepress'
import { resolve } from 'node:path'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(process.cwd(), 'docs/.vitepress')
      }
    },
    plugins: [
      vueJsx(),
      Icons({
        scale: 1,
        compiler: 'vue3',
        customCollections: {
          vpi: FileSystemIconLoader(resolve(process.cwd(), 'docs/.vitepress/theme/icons'))
        }
      }),
      Components({
        dts: '../../types/components.d.ts',
        resolvers: [
          IconsResolver({
            prefix: false,
            customCollections: ['vpi']
          })
        ]
      })
    ]
  }
})
