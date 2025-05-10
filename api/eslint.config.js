import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

import perfectionist from "eslint-plugin-perfectionist";
import mwEslintPlugin from "./eslint-rules/eslint-plugin-mw.cjs";

export default [
  {
    files: ["src/**/*.ts"],
    ignores: ["dist/**", "src/next/.next/**", "**/tmp/**"],
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
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-console": "warn",
      "no-restricted-properties": [
        "error",
        {
          object: "crypto",
          property: "randomUUID",
          message: "Please use the globally available $UUID.generate()",
        },
      ],
      "no-fallthrough": [
        "error",
        {
          // Allow a one or more empty cases to be stacked on top of a case that
          // actually implements some logic, to share the logic between these
          // stacked cases.
          allowEmptyCase: true,
        },
      ],
      curly: ["error", "all"],
      // Potentially helpful when doing codegen with manual sections for users
      // to fill in before committing.
      // "no-warning-comments": [
      //   "error",
      //   {
      //     terms: ["@nocommit"],
      //   },
      // ],
      "perfectionist/sort-imports": "error",
      "perfectionist/sort-exports": "error",
      "mwEslintPlugin/require-function-name-for-addJob": "error",
      "mwEslintPlugin/dataFn": "error",
      "mwEslintPlugin/httpController": "error",
      "mwEslintPlugin/codegen-function-and-module-same-name": "error",
      "mwEslintPlugin/startup-function-and-module-same-name": "error",
      "mwEslintPlugin/generated-file-is-valid": "error",
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
