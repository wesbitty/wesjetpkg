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
