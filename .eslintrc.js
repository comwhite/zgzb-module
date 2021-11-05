module.exports = {
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-unused-vars': 0,
		'vue/require-default-prop': 0,
		'vue/no-template-shadow': 0,
		'vue/no-lone-template': 0,
		'vue/no-v-html': 0,
		'vue/prop-name-casing': 0,
		'vue/attributes-order': 0,
		'vue/attribute-hyphenation': 0,
		'vue/this-in-template': 0,
		'vue/require-valid-default-prop': 0,
		'vue/require-prop-types': 0,
		'vue/order-in-components': 0,
		'no-async-promise-executor': 0,
		'no-prototype-builtins': 0, //FIXME:直接使用原型上的方法报错
		'vue/no-mutating-props': 0 //FIXME:子组件更改props属性 报错
	},
	parserOptions: {
		ecmaVersion: 6,
		sourceType: 'module',
		parser: 'babel-eslint'
	},
	extends: ['eslint:recommended', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'prettier/vue'],
	plugins: ['prettier']
}
