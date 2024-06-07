const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  extends: [
    "eslint:recommended",
    "prettier",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier",
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project,
      },
    },
    react: { version: "detect" },
  },
  ignorePatterns: [".*.js", "node_modules/", "dist/", "dist", ".eslintrc.cjs"],
  overrides: [
    // Force ESLint to detect .tsx files
    { files: ["*.js?(x)", "*.ts?(x)"] },
  ],
  rules: {
    semi: ["error", "always"],
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "react/prop-types": "off",
    "no-use-before-define": "off",
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".tsx"] },
    ],
    "@typescript-eslint/no-use-before-define": "off",
    "react/no-unescaped-entities": "warn",
    "no-console": ["error"],
    "react-hooks/exhaustive-deps": "off",
    "no-restricted-imports": ["error"],
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
