/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./docs/.vitepress/**/*.{js,ts,vue}', './docs/**/*.md'],
  theme: {
    extend: {
      height: {
        'vp-default': '24px'
      }
    }
  },
  plugins: []
}
