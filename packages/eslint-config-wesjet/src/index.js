module.exports = {
  configs: {
    vital: {
      // Wesjet plugin configuration
      plugins: ['wesjet'],
      // Parser
      parserOptions: {
        babelOptions: {
          presets: [require.resolve('next/babel')],
        },
      },
      extends: ['plugin:react-hooks/recommended', 'next', 'prettier', 'turbo'],
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
    server: {
      plugins: ['wesjet'],
      extends: ['eslint:recommended'],
      env: {
        node: true,
        es6: true,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
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
