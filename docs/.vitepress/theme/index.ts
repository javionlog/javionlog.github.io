import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Layout from './components/layout/index.vue'
import './style/index.css'
import 'virtual:uno.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {}
} satisfies Theme
