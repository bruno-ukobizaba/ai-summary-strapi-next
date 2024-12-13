// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  jsxSingleQuote: false,
  arrowParens: "always",
  bracketSpacing: true,
  bracketSameLine: true,
  endOfLine: "lf",
  printWidth: 80,
  trailingComma: "es5",
  preferArrowFunctions: true,
  importOrder: [
    "^(react|next?/?([a-zA-Z/]*))$",
    "<THIRD_PARTY_MODULES>",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    "prettier-plugin-organize-attributes",
    "prettier-plugin-tailwindcss",
    "prettier-plugin-classnames",
  ],
  endingPosition: "absolute",
};

export default config;
