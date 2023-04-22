module.exports = {
  configs: {
    recommended: {
      // plugins
      plugins: ['wesjet'],
      env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true,
      },
      // Parser
      parser: '@typescript-eslint/parser',
      parserOptions: {
        babelOptions: {
          sourceType: 'module',
          presets: [require.resolve('next/babel')],
        },
      },
      extends: [
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@next/next/recommended',
        'prettier',
      ],
      // Rules
      rules: {
        // react plugin configuration
        'react-hooks/rules-of-hooks': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'react/jsx-key': 'off',
        'react/no-unescaped-entities': 'off',
        // @typescript-eslint plugin configuration
        'import/no-named-as-default-member': 'warn',
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': [
          'warn',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@next/next/no-html-link-for-pages': 'off',
      },
    },
    next: {
      env: {
        browser: true,
        node: true,
      },
      plugins: ['wesjet'],
      extends: ['plugin:@next/next/recommended', 'plugin:wesjet/recommended'],
      rules: {
        '@next/next/no-html-link-for-pages': 'off',
        '@next/next/no-sync-scripts': 'off',
        '@next/next/no-img-element': 'off',
      },
    },
  },
}
