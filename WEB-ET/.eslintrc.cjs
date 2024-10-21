const { over } = require("lodash");

/*
 * @Date: 2024-07-29 16:16:18
 * @FilePath: /AS-WEB-3.5/.eslintrc.cjs
 * @Description:
 */
module.exports = {
  root: true,
  ignorePatterns: ['!src', '*'],
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'off',
    'max-lines': ['error', { max: 400 }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-var-requires": "off"
  },
  // 部分目录最大行数限制
  overrides: [
    {
      files: [
        'src/core/services/**',
        'src/**/language/**'
      ],
      rules: {
        'max-lines': ['error', { max: 10000 }],
      },
    },
  ],
}
