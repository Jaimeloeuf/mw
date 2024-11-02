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

        const fileName = path.basename(context.filename).replace(".df.ts", "");

        for (const item of node.arguments) {
          const dataFnName = item.name ?? item?.id?.name;

          if (dataFnName === undefined) {
            context.report({
              node,
              message: `Function passed to 'dataFn' must be named`,
              loc: {
                start: node.callee.loc.end,
                end: node.callee.loc.end,
              },
            });

            continue;
          }

          // Implement the fix function
          if (dataFnName !== fileName) {
            context.report({
              node,
              message: `Function passed to 'dataFn' must have the same name as module name. Expected '${fileName}', found '${dataFnName}'`,
              loc: {
                start: node.callee.loc.end,
                end: node.callee.loc.end,
              },
            });

            continue;
          }
        }
      },
    };
  },
};
