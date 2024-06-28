import { defineConfig } from 'vitepress'
import { resolve } from 'path'
import vueJsx from '@vitejs/plugin-vue-jsx'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@': resolve(__dirname, '../')
      }
    },
    plugins: [vueJsx()]
  }
})
