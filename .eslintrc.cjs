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
    complexity: ['error', 10],
    'vue/block-lang': [
      'error',
      {
        script: {
          lang: 'ts'
        },
        style: {
          lang: 'scss'
        }
      }
    ],
    'vue/block-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/component-api-style': ['error', ['script-setup']],
    'vue/component-name-in-template-casing': [
      'error',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: []
      }
    ],
    'vue/component-options-name-casing': ['error', 'PascalCase'],
    'vue/custom-event-name-casing': [
      'error',
      'camelCase',
      {
        ignores: []
      }
    ],
    'vue/define-emits-declaration': ['error', 'type-literal'],
    'vue/define-macros-order': [
      'error',
      {
        order: ['defineOptions', 'defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
        defineExposeLast: true
      }
    ],
    'vue/no-ref-object-reactivity-loss': ['error'],
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'SLOT',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'ATTR_DYNAMIC',
          'ATTR_STATIC',
          'ATTR_SHORTHAND_BOOL',
          'EVENTS',
          'CONTENT'
        ],
        alphabetical: false
      }
    ],
    'vue/order-in-components': [
      'error',
      {
        order: [
          'el',
          'name',
          'key',
          'parent',
          'functional',
          'delimiters',
          'comments',
          'components',
          'directives',
          'filters',
          'extends',
          'mixins',
          'provide',
          'inject',
          'ROUTER_GUARDS',
          'layout',
          'middleware',
          'validate',
          'scrollToTop',
          'transition',
          'loading',
          'inheritAttrs',
          'model',
          'props',
          'propsData',
          'emits',
          'setup',
          'asyncData',
          'data',
          'fetch',
          'head',
          'computed',
          'watch',
          'watchQuery',
          'LIFECYCLE_HOOKS',
          'methods',
          'template',
          'render',
          'renderError'
        ]
      }
    ]
  }
})

module.exports = config
