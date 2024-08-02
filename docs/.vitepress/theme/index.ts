import './style/index.css'
import 'virtual:uno.css'

import { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'

import Layout from './components/layout/index.vue'
import Mermaid from './components/common/mermaid/index.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Mermaid', Mermaid)
  }
} satisfies Theme
