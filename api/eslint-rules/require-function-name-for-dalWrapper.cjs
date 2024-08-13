module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure functions passed to 'dalWrapper' are named",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name !== "dalWrapper") {
          return;
        }

        for (const item of node.arguments) {
          if (item.name !== undefined || item?.id?.name !== undefined) {
            continue;
          }

          context.report({
            message: `Functions passed to 'dalWrapper' function must be named`,
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
