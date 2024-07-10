/** @type {import('stylelint').Config} */
const config = {
  overrides: [
    {
      files: ['**/*.{vue,html}'],
      customSyntax: 'postcss-html'
    },
    {
      files: ['**/*.{scss,sass}'],
      customSyntax: 'postcss-scss'
    }
  ],
  plugins: [],
  extends: ['stylelint-config-standard-scss'],
  rules: {
    'scss/at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'layer', 'apply', 'config']
      }
    ]
  }
}

module.exports = config
