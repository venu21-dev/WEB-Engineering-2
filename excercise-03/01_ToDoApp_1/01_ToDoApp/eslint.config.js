import pluginVue from 'eslint-plugin-vue'
import vueTsEslintConfig from '@vue/eslint-config-typescript'
import pluginPrettier from 'eslint-plugin-prettier/recommended'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/node_modules/**'],
  },

  ...pluginVue.configs['flat/recommended'],
  ...vueTsEslintConfig(),
  pluginPrettier,

  {
    name: 'app/rules',
    rules: {
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'never',
        },
      ],
      'no-console': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/require-default-prop': 'off',
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase',
        {
          registeredComponentsOnly: false,
          ignores: [],
        },
      ],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/v-on-event-hyphenation': [
        'error',
        'always',
        {
          autofix: false,
        },
      ],
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'any',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
      'vue/html-comment-content-spacing': ['error', 'always'],
      'vue/padding-line-between-blocks': ['error', 'always'],
      'vue/new-line-between-multi-line-property': [
        'error',
        {
          minLineOfMultilineProperty: 2,
        },
      ],
      'vue/no-useless-v-bind': [
        'error',
        {
          ignoreIncludesComment: true,
          ignoreStringEscape: true,
        },
      ],
      'vue/v-for-delimiter-style': ['error', 'in'],
      'vue/no-empty-component-block': ['error'],
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
    },
  },
]
