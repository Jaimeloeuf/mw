import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import perfectionist from "eslint-plugin-perfectionist";
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
      "mwEslintPlugin/httpController": "error",
    },
    plugins: {
      perfectionist,
      mwEslintPlugin,
    },
  },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  tseslint.configs.base,
];
