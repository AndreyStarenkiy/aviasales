import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import globals from 'globals';
import js from '@eslint/js';
import babelPlugin from '@babel/eslint-plugin';
import eslintPluginReact from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
/* const compat    = new FlatCompat({ baseDirectory: __dirname }) */
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

export default [
  // 1. Core JS rules
  js.configs.recommended,

  // 2. Legacy shareable configs (converted via FlatCompat)
  ...compat.extends('plugin:react/recommended'),
  ...compat.extends('plugin:react-hooks/recommended'),
  ...compat.extends('plugin:jsx-a11y/recommended'),
  ...compat.extends('plugin:import/errors'),
  ...compat.extends('plugin:import/warnings'),
  ...compat.extends('airbnb-base'),
  ...compat.extends('plugin:prettier/recommended'),

  {
    files: ['eslint.config.js', 'vite.config.js', '*.config.js'],
    rules: { 'import/no-extraneous-dependencies': 'off' }
  },

  // 3. Per-file override for all JS/TS/JSX/TSX
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['node_modules', 'dist', 'build', 'vite.config.js'],

    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        ecmaFeatures: { jsx: true }
      },
      globals: {
        ...globals.browser,
        ...globals.es2021
      }
    },

    plugins: {
      react: eslintPluginReact,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      import: importPlugin,
      'react-refresh': reactRefreshPlugin,
      prettier: prettierPlugin,
      '@babel': babelPlugin
    },

    /* rules: {
      indent: ['error', 2],
      'prettier/prettier': 'error',
      'linebreak-style': 'off',
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ]
    }, */
    rules: {
      'implicit-arrow-linebreak': 'off',
      'comma-dangle': ['error', { functions: 'never' }],
      'no-underscore-dangle': ['error', { allow: ['__dirname', '__filename'] }],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 3 },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: { multiline: false, minProperties: 3 }
        }
      ],
      indent: ['error', 2, { SwitchCase: 1 }],
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always'
        }
      ],
      'no-unused-vars': ['off', { varsIgnorePattern: 'React' }],
      // "tabWidth": 2,
      'max-len': ['error', 120],
      'linebreak-style': [0, 'unix'],
      'operator-linebreak': [0, 'after'],
      singleQuote: 0,
      'arrow-body-style': 0,
      'import/no-named-as-default': 0,
      'import/extensions': ['off'],
      'react/prop-types': 0,
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
      /* "no-invalid-this": 0, */
      '@babel/no-invalid-this': 'error',
      'no-param-reassign': [
        'error',
        {
          props: true,
          ignorePropertyModificationsFor: ['state']
        }
      ]

      // add customize rules here as per your project's needs
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'src/']
        }
      }
    }
  }
];

/* import js from '@eslint/js';
import babelPlugin from '@babel/eslint-plugin';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactRecommended from 'eslint-plugin-react';
import reactHooksRecommended from 'eslint-plugin-react-hooks';
import prettierRecommended from 'eslint-plugin-prettier';
import jsxRuntime from 'eslint-plugin-react/configs/jsx-runtime.js';
import importErrors from 'eslint-plugin-import/config/errors.js';
import importWarnings from 'eslint-plugin-import/config/warnings.js';
import airbnbBase from 'eslint-config-airbnb-base';

export default [
  js.configs.recommended,
  reactRecommended,
  reactHooksRecommended,
  jsxRuntime,
  prettierRecommended,
  importErrors,
  importWarnings,
  airbnbBase,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: true,
        document: true,
      },
    },
    plugins: {
      '@babel': babelPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    settings: {
      react: {
        version: 'detect',
        defaultVersion: '18.3.1',
      },
    },
    rules: {
      'implicit-arrow-linebreak': 'off',
      'comma-dangle': ['error', { functions: 'never' }],
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 2 },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: { multiline: false, minProperties: 3 },
        },
      ],
      indent: ['error', 2, { SwitchCase: 1 }],
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': [2, { caseSensitive: false }],
      'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
      'import/order': [
        2,
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'no-unused-vars': [
        'off',
        {
          varsIgnorePattern: 'React',
        },
      ],
      'max-len': ['error', 120],
      'linebreak-style': [0, 'unix'],
      'operator-linebreak': [0, 'after'],
      singleQuote: 0,
      'arrow-body-style': 0,
      'import/no-named-as-default': 0,
      'import/extensions': ['off'],
      'react/prop-types': 0,
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'class-methods-use-this': ['error', { exceptMethods: ['render'] }],
      '@babel/no-invalid-this': 'error',
    },
  },
];
 */
