const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that 'httpController' is used correctly, which includes making sure it is only used in .ct.ts files within controllers-http/.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    return {
      CallExpression(node) {
        if (node.callee.name !== "httpController") {
          return;
        }

        if (!path.basename(context.filename).endsWith(".ct.ts")) {
          context.report({
            node,
            message: `'httpController' can only be used in files with the '.ct.ts' file extension`,
          });
        }

        if (!isFileInHttpControllersFolder(context.filename)) {
          context.report({
            node,
            message: `'httpController' can only be used within the /controllers-http/* folder`,
          });
        }
      },
    };
  },
};

function isFileInHttpControllersFolder(filePath) {
  const relativePath = path.relative(
    path.join(__dirname, `../src/controllers-http`),
    filePath,
  );

  return (
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
}
