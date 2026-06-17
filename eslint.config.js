// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

// The body base is 14px (src/index.css), so in OUR components text-sm is redundant and text-xs shrinks
// below it. De-emphasis is color, not size. (Vendored src/components/ui/** is exempt — that's shadcn's.)
const noSizeClasses =
  'No text-xs/text-sm in our components — the body base is 14px (index.css). De-emphasize with color (text-muted-foreground), not size.'

export default defineConfig([globalIgnores(['dist']), {
  files: ['**/*.{js,jsx}'],
  extends: [
    js.configs.recommended,
    reactHooks.configs.flat.recommended,
    reactRefresh.configs.vite,
  ],
  languageOptions: {
    globals: globals.browser,
    parserOptions: { ecmaFeatures: { jsx: true } },
  },
}, {
  files: ['src/components/*.jsx'],
  rules: {
    'no-restricted-syntax': [
      'error',
      { selector: 'Literal[value=/\\btext-(xs|sm)\\b/]', message: noSizeClasses },
      { selector: 'TemplateElement[value.raw=/\\btext-(xs|sm)\\b/]', message: noSizeClasses },
    ],
  },
}, ...storybook.configs["flat/recommended"]])
