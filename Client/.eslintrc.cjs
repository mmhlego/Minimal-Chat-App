module.exports = {
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json"
	},
	plugins: ["react-refresh", "react", "@typescript-eslint"],
	rules: {
		"react-refresh/only-export-components": "warn",
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "always"],
		"react/jsx-uses-react": "off",
		"react/react-in-jsx-scope": "off",
		"no-empty-function": "off",
		"import/no-extraneous-dependencies": "off",
		"@typescript-eslint/no-empty-function": "off",
		"react/no-unused-prop-types": 2
	}
};
