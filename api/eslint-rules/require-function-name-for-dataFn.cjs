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
          const dataFnName = item.name ?? item?.id?.name;

          if (dataFnName === undefined) {
            context.report({
              message: `Function passed to 'dataFn' must be named`,
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
