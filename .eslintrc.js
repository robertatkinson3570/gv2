module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'], // TypeScript files extensions
      plugins: ['@typescript-eslint'],
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
      rules: {
        'react/no-unknown-property': [
          2,
          {
            ignore: ['jsx'],
          },
        ],
        'prettier/prettier': 'off', // Turn off prettier
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/semi': [2, 'always'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/member-delimiter-style': [
          'error',
          {
            multiline: {
              delimiter: 'semi',
              requireLast: true,
            },
            singleline: {
              delimiter: 'semi',
              requireLast: false,
            },
          },
        ],
        'comma-dangle': ['error', 'always-multiline'],
      },
      extends: ['standard-with-typescript', 'plugin:react/recommended', 'plugin:@typescript-eslint/recommended'],
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    semi: [2, 'always'],
    'no-use-before-define': 'off',
    'comma-dangle': ['error', 'always-multiline'],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
