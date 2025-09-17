const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that codegen functions defined in codegen modules have the same name.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If the file is not a codegen step module, ignore checks by returning
    // empty visitor object.
    if (!isCodegenStepModule(context.filename)) {
      return {};
    }

    // Check the named export name only if it is a codegen module
    return {
      ExportNamedDeclaration(node) {
        const codegenModuleName = path
          .basename(context.filename)
          .replace(".ts", "");

        const codegenFunctionName = node?.declaration?.id?.name;

        if (codegenModuleName !== codegenFunctionName) {
          context.report({
            node,
            message: `Codegen modules must export a codegen function of the same name. Found '${codegenFunctionName}' in '${codegenModuleName}'`,

            // Not giving a fixer so that users can do symbol rename instead,
            // as the function name is usually referenced in other places too.
            // fix(fixer) {
            //   const invalidFunctionName = context.sourceCode.getFirstToken(
            //     node,
            //     {
            //       filter: (token) =>
            //         token.type === "Identifier" && token.value !== "async",
            //     },
            //   );
            //   if (!invalidFunctionName) {
            //     return null;
            //   }
            //   return fixer.replaceText(invalidFunctionName, codegenModuleName);
            // },
          });
        }
      },
    };
  },
};

function isCodegenStepModule(filePath) {
  const relativePath = path.relative(
    path.join(__dirname, `../src/codegen-tools/cogenie/steps`),
    filePath,
  );

  const isFileInCodegenStepFolder =
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath) &&
    relativePath.startsWith("gen");

  if (!isFileInCodegenStepFolder) {
    return false;
  }

  // A codegen step module has this relative path pattern
  // 'genDataFunctionBarrelFile/genDataFunctionBarrelFile.ts'
  const [codegenFoldeName, codegenModuleName] = relativePath
    .replace(".ts", "")
    .split("/");

  return codegenFoldeName === codegenModuleName;
}
