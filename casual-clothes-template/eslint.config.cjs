const { defineConfigWithVueTs, vueTsConfigs } = require('@vue/eslint-config-typescript')
const vue = require('eslint-plugin-vue')
const unusedImports = require('eslint-plugin-unused-imports')

module.exports = [
	{
		ignores: [
			'dist/**',
			'node_modules/**',
			'preview/**',
			'*.config.js',
			'*.config.cjs',
		],
	},
	...defineConfigWithVueTs(
		vue.configs['flat/essential'],
		vueTsConfigs.recommended,
		{
			plugins: {
				'unused-imports': unusedImports,
			},
			rules: {
				'eqeqeq': ['error', 'always'],
				'quotes': ['error', 'single', { avoidEscape: true }],
				'object-curly-spacing': ['error', 'always'],
				'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0, maxBOF: 0 }],
				'object-curly-newline': ['error', {
					ObjectExpression: { consistent: true, multiline: true },
					ObjectPattern: { consistent: true, multiline: true },
				}],
				'object-property-newline': ['error', { allowAllPropertiesOnSameLine: true }],
				'semi': ['error', 'never'],
				'comma-dangle': ['error', 'always-multiline'],
				'indent': ['error', 'tab', { SwitchCase: 1 }],
				'no-tabs': 'off',
				'space-infix-ops': 'error',
				'keyword-spacing': 'error',

				// Vue
				'vue/mustache-interpolation-spacing': ['error', 'always'],
				'vue/html-indent': ['error', 'tab'],
				'vue/html-quotes': ['error', 'double'],
				'vue/multi-word-component-names': 'off',
				'vue/max-attributes-per-line': ['error', {
					singleline: 3,
					multiline: 1,
				}],
				'vue/first-attribute-linebreak': ['error', {
					singleline: 'ignore',
					multiline: 'below',
				}],

				// TypeScript
				'@typescript-eslint/no-explicit-any': 'warn',
				'@typescript-eslint/explicit-function-return-type': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'unused-imports/no-unused-imports': 'error',
				'unused-imports/no-unused-vars': [
					'warn',
					{
						vars: 'all',
						varsIgnorePattern: '^_',
						args: 'after-used',
						argsIgnorePattern: '^_',
					},
				],

				'max-params': ['error', 5],

				// use const as const objects
				'no-restricted-syntax': ['error', {
					selector: 'TSEnumDeclaration',
					message: 'Use const objects instead of enums for better tree-shaking',
				}],

				// SSR warnings
				'no-restricted-globals': [
					'warn',
					{
						name: 'document',
						message: 'Use onMounted or check if running in browser before accessing document',
					},
					{
						name: 'window',
						message: 'Use onMounted or check if running in browser before accessing window',
					},
					{
						name: 'localStorage',
						message: 'localStorage is not available during SSR. Use onMounted or check typeof window !== "undefined"',
					},
					{
						name: 'sessionStorage',
						message: 'sessionStorage is not available during SSR. Use onMounted or check typeof window !== "undefined"',
					},
				],
			},
		}),
]
