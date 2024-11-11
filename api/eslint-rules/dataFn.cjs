const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that 'dataFn' is used correctly, which includes making sure it is only used in .df.ts files within dal/ and the function is named the same as the module name.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // @todo
    // Make this more efficient, by making sure this is the right folder first
    // before doing the CallExpression node visit check.

    return {
      CallExpression(node) {
        if (node.callee.name !== "dataFn") {
          return;
        }

        const fileBaseName = path.basename(context.filename);

        if (!fileBaseName.endsWith(".df.ts")) {
          context.report({
            node,
            message: `'dataFn' can only be used in files with the '.df.ts' file extension`,
          });
          return;
        }

        if (!isFileInDalFolder(context.filename)) {
          context.report({
            node,
            message: `'dataFn' can only be used within the /dal/df/* folder`,
          });
          return;
        }

        const expectedDataFunctionName = generateFullFileNameFromRelativePath(
          dataFunctionFolderPath,
          context.filename,
        );

        for (const item of node.arguments) {
          const dataFunctionName = item.name ?? item?.id?.name;

          if (dataFunctionName === undefined) {
            context.report({
              node: item,
              message: `Function passed to 'dataFn' must be named`,
              loc: {
                start: node.callee.loc.end,
                end: node.callee.loc.end,
              },
              fix(fixer) {
                const functionKeyword = context.sourceCode.getFirstToken(node, {
                  filter: (token) =>
                    token.type === "Keyword" && token.value === "function",
                });

                if (!functionKeyword) {
                  return null;
                }

                return fixer.insertTextAfter(
                  functionKeyword,
                  ` ${expectedDataFunctionName}`,
                );
              },
            });

            continue;
          }

          if (dataFunctionName !== expectedDataFunctionName) {
            context.report({
              node: item,
              message: `Function passed to 'dataFn' must have the same name as module name. Expected '${expectedDataFunctionName}', found '${dataFunctionName}'`,
              loc: {
                start: node.callee.loc.end,
                end: node.callee.loc.end,
              },
              fix(fixer) {
                const invalidFunctionName = context.sourceCode.getFirstToken(
                  node,
                  {
                    filter: (token) =>
                      token.type === "Identifier" && token.value !== "async",
                    // Skip pass the function keyword to get the function name
                    skip: 1,
                  },
                );

                if (!invalidFunctionName) {
                  return null;
                }

                return fixer.replaceText(
                  invalidFunctionName,
                  expectedDataFunctionName,
                );
              },
            });

            continue;
          }
        }
      },
    };
  },
};

const dataFunctionFolderPath = path.join(__dirname, `../src/dal/df`);

function isFileInDalFolder(filePath) {
  const relativePath = path.relative(dataFunctionFolderPath, filePath);

  return (
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
}

/**
 * Utility function to generate a name/string using the relative path with camel
 * case. This allow names in folders to be uniquely "namespaced" in the global
 * scope as long as they are unique in their own folders.
 *
 * Copied from `generateFullFileNameFromRelativePath.ts`.
 */
const generateFullFileNameFromRelativePath = (
  /**
   * Root folder path to start the namespacing from.
   */
  folderPath,

  /**
   * Path to the actual file itself.
   */
  filePath,
) =>
  path
    .relative(folderPath, filePath)

    // Remove file extension to only keep the name itself
    .replace(".df.ts", "")

    // Use regex to convert path splitters '/' into camelCase delimiters.
    // E.g. folder/another/myData to folderAnotherMyData
    .replace(/\/([a-z])/g, (_, char) => char.toUpperCase())

    // Use regex to convert strings with '-' into camelCase delimiters.
    // E.g. folder-with-dash/myData to folderWithDashMyData
    .replace(/-([a-z])/g, (_, char) => char.toUpperCase());
