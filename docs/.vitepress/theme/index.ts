import type { Theme } from 'vitepress'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import slot from './components/slot/index'

const slotMap: { [name: string]: unknown } = {}

for (const s of slot) {
  slotMap[s.name] = () => h(s.mod)
}

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, slotMap)
  },
  enhanceApp() {
    // ...
  }
} satisfies Theme
