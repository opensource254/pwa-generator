import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,vue}'] },
	{
		ignores: ['dist/*'],
	},
	{
		rules: {
			'@stylistic/semi': 'error',
			'@stylistic/js/indent': ["error", "tab"],
			'@stylistic/js/no-tabs': ["error", { allowIndentationTabs: true }]
		},
	},
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	stylistic.configs.customize({}),
	...pluginVue.configs['flat/essential'],
]
