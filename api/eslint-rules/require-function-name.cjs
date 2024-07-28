module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure functions passed to Simple Post Processing are named",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.property?.name !== "addJob") {
          return;
        }

        for (const item of node.arguments) {
          if (item.id?.name !== undefined) {
            continue;
          }

          context.report({
            message: `Functions passed to SimplePostProcessing.addJob method must be named`,
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
