module.exports = {
  plugins: ['@typescript-eslint', 'deprecation'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        // typescript will handle this so no need for it
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-redeclare': 'off',

        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/ban-ts-comment': [
          'error',
          {
            'ts-expect-error': 'allow-with-description',
            'ts-ignore': 'allow-with-description',
            'ts-nocheck': true,
            'ts-check': false,
            minimumDescriptionLength: 3,
          },
        ],
        'deprecation/deprecation': 'warn',
      },
    },
  ],
}
