import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerAttributifyJsx,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

const themeColors = ['default', 'brand', 'success', 'warning', 'danger']

export default defineConfig({
  presets: [presetUno(), presetAttributify()],
  transformers: [transformerVariantGroup(), transformerDirectives(), transformerAttributifyJsx()],
  rules: [['h-default', { height: '1.5rem' }]],
  shortcuts: [],
  theme: {
    colors: {
      ...themeColors.reduce((prev: Record<PropertyKey, string>, curr) => {
        prev[curr] = `var(--vp-c-${curr}-1)`
        return prev
      }, {}),
      'hover-1': 'var(--vp-c-hover-1)',
      'hover-2': 'var(--vp-c-hover-2)',
      'placeholder-1': 'var(--vp-c-placeholder-1)',
      'placeholder-2': 'var(--vp-c-placeholder-2)'
    }
  },
  safelist: themeColors.map(val => [`bg-${val}`, `text-${val}`, `border-${val}`]).flat()
})
