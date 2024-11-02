module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure functions passed to 'dataFn' are named",
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

        for (const item of node.arguments) {
          if (item.name !== undefined || item?.id?.name !== undefined) {
            continue;
          }

          context.report({
            message: `Functions passed to 'dataFn' function must be named`,
            loc: {
              start: node.callee.loc.end,
              end: node.callee.loc.end,
            },
          });
        }
      },
    };
  },
};
