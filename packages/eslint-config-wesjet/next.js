module.exports = {
  extends: ['wesjet/preset', '@next/next/recommended', 'turbo'],
  // env
  env: {
    browser: true,
    node: true,
  },
  // Parser
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    allowImportExportEverywhere: true,
    babelOptions: {
      presets: ['next/babel'],
      caller: {
        // Eslint supports top level await when a parser for it is included. We enable the parser by default for Babel.
        supportsTopLevelAwait: true,
      },
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    '@next/next/no-page-custom-font': 'off',
    '@next/next/no-img-element': 'off',
    'turbo/no-undeclared-env-vars': 'off',
  },
}
