/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  rules: {
    'no-html-link-for-pages': require('../src/rules/no-html-link-for-pages'),
  },
  configs: {
    recommended: {
      // plugin configuration
      plugins: ['wesjet'],
      extends: ['plugin:react-hooks/recommended', 'next', 'prettier', 'turbo'],
      parserOptions: { tsconfigRootDir: __dirname },
      // Rules
      rules: {
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
      extends: ['wesjet:recommended'],
      // env
      env: {
        node: true,
        es6: true,
      },
      // Parser
      parserOptions: {
        babelOptions: {
          presets: [require.resolve('next/babel')],
        },
      },
      overrides: [
        {
          files: ['**/__tests__/**/*'],
          env: {
            jest: true,
          },
        },
      ],
    },
  },
}
