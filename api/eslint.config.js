import globals from "globals";
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
      // Disabling this for now so that we can add arbitrary eslint-disable
      // lines to codegen generated files without issue.
      reportUnusedDisableDirectives: "off",
    },
    rules: {
      "use-isnan": "error",
      "prefer-const": "error",
      "no-console": "warn",
      "no-throw-literal": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "no-irregular-whitespace": "error",
      "no-unused-private-class-members": "error",
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
      "default-case": "error",
      curly: "error",
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
  tseslint.configs.base,
];
