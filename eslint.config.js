const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const eslintPluginSecurity = require('eslint-plugin-security');
const eslintConfigPrettier = require('eslint-config-prettier');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');

module.exports = tseslint.config(
	{
		files: ['**/*.ts'],
		extends: [
			eslint.configs.recommended,
			...tseslint.configs.recommended,
			...tseslint.configs.stylistic,
			...angular.configs.tsRecommended,
		],
		processor: angular.processInlineTemplates,
		rules: {
			'@angular-eslint/directive-selector': [
				'error',
				{
					type: 'attribute',
					prefix: 'app',
					style: 'camelCase',
				},
			],
			'@angular-eslint/component-selector': [
				'error',
				{
					type: 'element',
					prefix: 'app',
					style: 'kebab-case',
				},
			],
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
			'@angular-eslint/prefer-standalone': ['off'],
			'@typescript-eslint/no-explicit-any': ['off'],
		},
	},
	{
		files: ['**/*.html'],
		extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
		rules: {
			'prettier/prettier': [
				'error',
				{
					endOfLine: 'auto',
				},
			],
		},
	},
	eslintPluginSecurity.configs.recommended,
	eslintConfigPrettier,
	eslintPluginPrettierRecommended
);
