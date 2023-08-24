/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    '@remix-run/eslint-config',
    '@remix-run/eslint-config/node',
    '@remix-run/eslint-config/jest-testing-library',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
  ],
  parser: '@typescript-eslint/parser',
  globals: {
    shopify: 'readonly',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    // allow any
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'separate-type-imports',
      },
    ],
    'import/no-anonymous-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'index',
          'sibling',
          'parent',
          'internal',
          'external',
          'builtin',
          'object',
          'type',
        ],
      },
    ],
    'tailwindcss/enforces-shorthand': 'error',
    'tailwindcss/classnames-order': 'error',
    'tailwindcss/no-custom-classname': 0,
  },
}
