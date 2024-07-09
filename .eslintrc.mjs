import { defineConfig } from 'eslint-define-config'

const config = defineConfig({
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:all',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended',
    'prettier'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    complexity: ['error', 10],
    yoda: 'off'
  }
})

export default config
