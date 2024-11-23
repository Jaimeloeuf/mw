const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that startup functions defined in startup modules have the same name.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If the file is not a startup step module, ignore checks by returning
    // empty visitor object.
    if (!isStartupStepModule(context.filename)) {
      return {};
    }

    // Check the named export name only if it is a startup step module
    return {
      ExportDefaultDeclaration(node) {
        const startupModuleName = path
          .basename(context.filename)
          .replace(".st.ts", "");

        const startupFunctionName = node?.declaration?.id?.name;

        if (startupModuleName !== startupFunctionName) {
          context.report({
            node,
            message: `Startup modules must export a startup function of the same name. Found '${startupFunctionName}' in '${startupModuleName}'`,
          });
        }
      },
    };
  },
};

function isStartupStepModule(filePath) {
  const relativePath = path.relative(
    path.join(__dirname, `../src/startup`),
    filePath,
  );

  const isFileInStartupFolder =
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath) &&
    filePath.endsWith(".st.ts");

  return isFileInStartupFolder;
}
