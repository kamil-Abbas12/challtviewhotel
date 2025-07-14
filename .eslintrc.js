/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: 'next',
  rules: {
    'react/no-unescaped-entities': 'off', // Disable apostrophe issues
    '@next/next/no-img-element': 'off',   // Allow <img> instead of <Image>
  },
};
