const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that cogenie step classes defined in cogenie step modules have the same name.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If the file is not a codegen step module, ignore checks by returning
    // empty visitor object.
    if (!isCogenieStepModule(context.filename)) {
      return {};
    }

    // Check the named export name only if it is a cogenie step
    return {
      ExportNamedDeclaration(node) {
        const cogenieStepModuleName = path
          .basename(context.filename)
          .replace(".ts", "");

        const cogenieStepClassName = node?.declaration?.id?.name;

        if (cogenieStepModuleName !== cogenieStepClassName) {
          // Not giving a fixer so that users can do symbol rename instead as
          // the class name could be referenced in other places too.
          context.report({
            node,
            message: `Cogenie step modules must export a Cogenie step class of the same name. Found '${cogenieStepClassName}' in '${cogenieStepModuleName}'`,
          });
        }
      },
    };
  },
};

function isCogenieStepModule(filePath) {
  const relativePath = path.relative(
    path.join(__dirname, `../src/codegen-tools/cogenie/steps`),
    filePath,
  );

  const isFileInCogenieStepFolder =
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath) &&
    relativePath.startsWith("Gen");

  if (!isFileInCogenieStepFolder) {
    return false;
  }

  // A cogenie step module has this relative path pattern
  // 'GenDataFunctionBarrelFile/GenDataFunctionBarrelFile.ts'
  const [cogenieStepFoldeName, cogenieStepModuleName] = relativePath
    .replace(".ts", "")
    .split("/");

  return cogenieStepFoldeName === cogenieStepModuleName;
}
