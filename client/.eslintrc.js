module.exports = {
	'env': {
		'browser': true,
		'node': true,
		'es6': true
	},
	'extends': 'eslint:recommended',
	'globals': {
		'Atomics': 'readonly',
		'SharedArrayBuffer': 'readonly'
	},
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 2018,
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': [
			'error',
			2
		],
		'linebreak-style': [
			1,
			'unix'
		],
		'quotes': [
			1,
			'single'
		],
		'semi': [
			1,
			'always'
		],
		'curly': 1,
		'eqeqeq': 1,
		'no-delete-var': 0,
		'no-useless-return': 1,
		'array-bracket-spacing': 1,
		'comma-dangle': 1,
		'prefer-spread': 1,
		'no-unused-vars': 1,
		'react/jsx-uses-react': 2,
		'react/jsx-uses-vars': 2
	}
};