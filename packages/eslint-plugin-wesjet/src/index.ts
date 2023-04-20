/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

module.exports = {
  rules: {
    'no-html-link-for-pages': require('./rules/no-html-link-for-pages'),
  },
  configs: {
    recommended: {
      // Wesjet plugin configuration
      plugins: ['wesjet'],
      // Parser
      parserOptions: {
        babelOptions: {
          presets: [require.resolve('next/babel')],
        },
      },
      extends: ['plugin:react-hooks/recommended', 'next', 'prettier', 'turbo'],
      rules: {
        'wesjet/no-html-link-for-pages': 'warn',
        '@next/next/no-html-link-for-pages': 'off',
        '@next/next/no-page-custom-font': 'off',
        '@next/next/no-img-element': 'off',
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-key': 'off',
        'turbo/no-undeclared-env-vars': 'off',
        'react/no-unescaped-entities': 'off',
      },
    },
    next: {
      plugins: ['wesjet'],
      extends: ['plugin:wesjet/recommended'],
      rules: {
        'wesjet/no-html-link-for-pages': 'error',
      },
    },
  },
}
