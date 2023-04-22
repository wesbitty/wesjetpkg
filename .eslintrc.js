module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: 'plugin:wesjet/recommended',
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': 'error',
    'import/no-duplicates': 'warn',
    // "func-style": ["warn", "expression"],
    'import/no-extraneous-dependencies': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
  },
}
