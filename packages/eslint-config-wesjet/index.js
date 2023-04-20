/**
 * Copyright (c) Wesbitty, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

module.exports = {
  configs: {
    recommended: {
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      // plugin configuration
      plugins: ['wesjet'],
      extends: [
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'turbo',
      ],
      parser: '@typescript-eslint/parser',
      // Rules
      rules: {
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-key': 'off',
        'react/no-unescaped-entities': 'off',
        'simple-import-sort/imports': 'off',
        'simple-import-sort/exports': 'error',
        'import/no-duplicates': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
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
      rules: {
        '@next/next/no-html-link-for-pages': 'off',
        '@next/next/no-page-custom-font': 'off',
        '@next/next/no-img-element': 'off',
        'turbo/no-undeclared-env-vars': 'off',
      },
    },
  },
}
