module.exports = {
  configs: {
    recommended: {
      // plugin configuration
      plugins: ['wesjet'],
      env: {
        browser: true,
        es2021: true,
        node: true,
      },
      extends: [
        'plugin:react-hooks/recommended',
        'plugin:@next/next/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'turbo',
      ],
      overrides: [
        {
          files: ['**/*.ts?(x)'],
          parser: '@typescript-eslint/parser',
          parserOptions: {
            sourceType: 'module',
            ecmaFeatures: {
              jsx: true,
            },
            warnOnUnsupportedTypeScriptVersion: true,
          },
        },
      ],
      settings: {
        react: {
          version: 'detect',
        },
        'import/parsers': {
          [require.resolve('@typescript-eslint/parser')]: ['.ts', '.mts', '.cts', '.tsx', '.d.ts'],
        },
        'import/resolver': {
          [require.resolve('eslint-import-resolver-node')]: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          [require.resolve('eslint-import-resolver-typescript')]: {
            alwaysTryTypes: true,
          },
        },
      },
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
    },
  },
}
