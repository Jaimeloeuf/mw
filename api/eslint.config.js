import globals from "globals";
// import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.ts"],
    ignores: ["dist/**"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  // pluginJs.configs.recommended,
  // ...tseslint.configs.recommended,
  tseslint.configs.base,
];
