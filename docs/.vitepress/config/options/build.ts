import { defineConfig } from 'vitepress'
import { getPackageJson } from '../../utils/theme'

export default defineConfig({
  srcDir: 'src',
  srcExclude: [],
  outDir: './.vitepress/dist',
  assetsDir: 'assets',
  cacheDir: './.vitepress/cache',
  ignoreDeadLinks: false,
  transformPageData() {
    return {
      author: getPackageJson().author.name
    }
  }
})
