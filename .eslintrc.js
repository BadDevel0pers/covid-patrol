// Use the default moovweb eslint style guide by running
// `npm install eslint-config-moov; npm install eslint-plugin-react-storefront`,
// or use your own style guide.
//
module.exports = {
  extends: 'plugin:react-storefront/recommended',
  plugins: ['react-storefront'],
  env: {
    'react-storefront/server': true,
  },
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {
    fetch: 'readonly',
    env: 'readonly',
    sendResponse: 'readonly',
    fns: 'readonly',
    $: 'readonly',
  },
  rules: {
    'sort-imports': 'off',
    'no-console': 'off',
    'react/no-unused-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/forbid-prop-types': 'off',
    'quote-props': ['error', 'as-needed'],
    'no-alert': 'off',
    semi: 'off',
  },
}
