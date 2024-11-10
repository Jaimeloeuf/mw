// @ts-ignore Allow JS import
import eslintConfig from "../../../eslint.config.js";
import { logger } from "../../logging/Logger.js";

const defaultEslintRulesToDisable = [
  // Disable sorting rules since the template is not sorted and can be dynamic
  "perfectionist/sort-imports",
  "perfectionist/sort-exports",
];

export function getAllEslintRulesToDisable(
  codegenStepSpecificEslintRulesToDisable: Array<string> = [],
) {
  const eslintRulesToDisable = [
    ...defaultEslintRulesToDisable,
    ...codegenStepSpecificEslintRulesToDisable,
  ];

  const combinedEslintRuleDisableString = eslintRulesToDisable
    .map(function (ruleName) {
      // A rule can only be disabled if it is specified in eslint config
      if (eslintConfig[0]["rules"][ruleName] !== undefined) {
        return `/* eslint-disable ${ruleName} */`;
      }

      logger.error(
        getAllEslintRulesToDisable.name,
        `Found invalid ESLint rule '${ruleName}' to disable, please remove this eslint disable from codegen.`,
      );
      return "";
    })
    .join("\n")

    // Add extra newline to prevent last disable to be on the same line as first
    // generated code statement
    .concat("\n");

  return combinedEslintRuleDisableString;
}
