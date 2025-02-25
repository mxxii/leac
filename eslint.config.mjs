import eslint from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsoncPlugin from 'eslint-plugin-jsonc';
import tsdocPlugin from 'eslint-plugin-tsdoc';
import stylistic from '@stylistic/eslint-plugin';

export default tsEslint.config(

  // Shared configuration
  eslint.configs.recommended,
  stylistic.configs.customize({
    quoteProps: 'consistent',
    semi: true,
    jsx: false,
  }),
  {
    ignores: [
      '.tsimp/**',
      '.vscode/**',
      'coverage/**',
      'deno/**',
      'lib/**',
      'node_modules/**',
      'package-lock.json',
    ],
  },

  // JS configuration
  {
    files: ['**/*.js'],
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/array-bracket-spacing': 'off',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 2 }],
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'no-var': 'error',
      'no-warning-comments': 'warn',
      'prefer-const': 'error',
    },
  },

  // TS configuration
  ...tsEslint.configs.recommendedTypeChecked.map(
    c => ({ ...c, files: ['**/*.ts'] }),
  ),
  {
    files: ['**/*.ts'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: [
            'test/*.ts',
            'examples/*.ts',
            'benchmarks/*.ts',
          ],
          maximumDefaultProjectFileMatchCount_THIS_WILL_SLOW_DOWN_LINTING: 12,
        },
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic,
      'tsdoc': tsdocPlugin,
    },
    rules: {
      '@stylistic/array-bracket-spacing': 'off',
      '@stylistic/no-multiple-empty-lines': ['error', { 'max': 2 }],
      '@stylistic/object-curly-newline': ['error', { 'ObjectExpression': { 'minProperties': 3 } }],
      '@stylistic/quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      '@stylistic/space-before-function-paren': ['error', 'always'],
      'no-var': 'error',
      'no-warning-comments': 'warn',
      'prefer-const': 'error',
      'tsdoc/syntax': 'error',
    },
  },

  // JSON configuration
  ...jsoncPlugin.configs['flat/recommended-with-jsonc'],
  {
    files: ['*.json', '*.json5', '*.jsonc'],
    plugins: {
      'jsonc': jsoncPlugin,
    },
    rules: {
      'jsonc/array-bracket-newline': ['error', 'consistent'],
      'jsonc/array-element-newline': ['error', 'consistent'],
    },
  },

);
