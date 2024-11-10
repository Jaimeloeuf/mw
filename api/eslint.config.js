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
    linterOptions: {
      // Disabling this for now so that we can add arbitrary eslint-disable lines
      // to codegen generated files without issue.
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "prefer-const": "error",
      "no-console": "warn",
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-exports": "error",
      "mwEslintPlugin/require-function-name-for-addJob": "error",
      "mwEslintPlugin/dataFn": "error",
      "mwEslintPlugin/httpController": "error",
      "mwEslintPlugin/codegen-function-and-module-same-name": "error",
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
