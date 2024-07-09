/** @type {require('stylelint/types/stylelint').Config} */
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
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
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
