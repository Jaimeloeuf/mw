import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import mwEslintPlugin from "./eslint-rules/eslint-plugin-mw.cjs";

export default [
  {
    files: ["src/**/*.ts"],
    ignores: ["dist/**"],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      "prefer-const": "error",
      "no-console": "warn",
      "mwEslintPlugin/require-function-name-for-addJob": "error",
      "mwEslintPlugin/dataFn": "error",
    },
    plugins: {
      mwEslintPlugin,
    },
  },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  tseslint.configs.base,
];
