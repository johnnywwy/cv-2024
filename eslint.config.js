import js from '@eslint/js'
import ts from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
export default ts.config(
  { ignores: ['dist/**', 'node_modules/**', 'src/*copy*', 'tmp/**', 'output/**'] },
  js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: ts.parser } } },
  {
    languageOptions: {
      globals: Object.fromEntries(
        [
          'window',
          'fetch',
          'Event',
          'HTMLInputElement',
          'HTMLElement',
          'ResizeObserver',
          'document',
          'navigator',
          'console',
          'Blob',
          'URL',
          'File',
          'FileReader',
          'Image',
          'crypto',
          'setTimeout',
          'clearTimeout',
        ].map((k) => [k, 'readonly']),
      ),
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-indent': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/html-closing-bracket-newline': 'off',
      'vue/attributes-order': 'off',
      'vue/multiline-html-element-content-newline': 'off',
    },
  },
)
