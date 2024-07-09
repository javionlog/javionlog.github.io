const { defineConfig } = require('eslint-define-config')

const config = defineConfig({
  root: true,
  env: {
    browser: true,
    es2023: true,
    node: true
  },
  plugins: [],
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
    yoda: 'off',
    'sort-keys': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    complexity: ['error', 10]
  }
})

module.exports = config
