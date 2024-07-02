import { defineConfig } from 'vitepress'

export default defineConfig({
  srcDir: 'src',
  srcExclude: [],
  outDir: './.vitepress/dist',
  assetsDir: 'assets',
  cacheDir: './.vitepress/cache',
  ignoreDeadLinks: false,
  buildEnd: () => {},
  postRender: () => {},
  transformHead: () => {},
  transformPageData: () => {},
  transformHtml: () => {}
})
