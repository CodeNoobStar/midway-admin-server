import globals from 'globals';
import tseslint from '@typescript-eslint/eslint-plugin';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ['**/*.{js,mjs,cjs,ts}'] },
	{ files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				jest: true,
			},
		},
	},
	{ ignores: ['node_modules', 'dist', 'test', 'jest.config.js', 'typings'] },
	{
		plugins: {
			'@typescript-eslint': tseslint,
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_',
				},
			],
		},
	},
	...compat.extends('plugin:@typescript-eslint/recommended'),
];
