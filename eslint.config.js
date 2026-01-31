import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      
      // --- Custom Rules for this Project ---
      
      // Disable prop-types validation since we aren't using TypeScript or PropTypes
      'react/prop-types': 'off',
      
      // Allow target="_blank" without rel="noreferrer" (modern browsers handle this better now, but good to check)
      'react/jsx-no-target-blank': 'off',
      
      // Warn about unused variables instead of erroring, and ignore variables starting with _
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],

      // Vite React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
]