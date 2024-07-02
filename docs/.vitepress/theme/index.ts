import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Layout from './components/layout/index.vue'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp() {}
} satisfies Theme
