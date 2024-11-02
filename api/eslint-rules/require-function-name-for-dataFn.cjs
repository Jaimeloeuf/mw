const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure functions passed to 'dataFn' are named and match the file name",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
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
            message: `'dataFn' can only be used within the /dal/* folder`,
          });
          return;
        }

        const fileName = fileBaseName.replace(".df.ts", "");

        for (const item of node.arguments) {
          const dataFnName = item.name ?? item?.id?.name;

          if (dataFnName === undefined) {
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

                return fixer.insertTextAfter(functionKeyword, ` ${fileName}`);
              },
            });

            continue;
          }

          // Implement the fix function
          if (dataFnName !== fileName) {
            context.report({
              node: item,
              message: `Function passed to 'dataFn' must have the same name as module name. Expected '${fileName}', found '${dataFnName}'`,
              loc: {
                start: node.callee.loc.end,
                end: node.callee.loc.end,
              },
              fix(fixer) {
                const invalidFunctionName = context.sourceCode.getFirstToken(
                  node,
                  {
                    filter: (token) => token.type === "Identifier",
                    // Skip pass the function keyword to get the function name
                    skip: 1,
                  },
                );

                if (!invalidFunctionName) {
                  return null;
                }

                return fixer.replaceText(invalidFunctionName, fileName);
              },
            });

            continue;
          }
        }
      },
    };
  },
};

function isFileInDalFolder(filePath) {
  const relativePath = path.relative(
    path.join(__dirname, `../src/dal`),
    filePath,
  );

  return (
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
}
