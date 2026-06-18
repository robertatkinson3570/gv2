module.exports = {
  env: {
    node: true,
    es2021: true,
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'semi': [2, 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'never',
        exports: 'never',
        functions: 'never',
      },
    ],
    'no-unused-vars': ['warn', { vars: 'all', args: 'none' }],
    'no-async-promise-executor': 'off',
    'space-before-function-paren': 0,
    'quote-props': [
      'error',
      'consistent',
    ],
    'valid-typeof': [
      'error',
      { 'requireStringLiterals': false },
    ],
  },
};
