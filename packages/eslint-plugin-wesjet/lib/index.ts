module.exports = {
  rules: {
    'no-html-link-for-pages': require('./rules/no-html-link-for-pages'),
  },
  configs: {
    recommended: {
      plugins: ['wesjet'],
      rules: {
        'wesjet/no-html-link-for-pages': 'warn',
      },
    },
    preset: {
      plugins: ['wesjet'],
      extends: ['plugin:wesjet/recommended'],
      rules: {
        'wesjet/no-html-link-for-pages': 'error',
      },
    },
  },
}
