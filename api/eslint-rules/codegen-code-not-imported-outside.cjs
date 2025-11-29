const path = require("path");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that all codegen code is only used for codegen and never imported/used outside of codegen folders.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If file is part of codegen, ignore checks by returning empty visitor
    // object.
    if (isCodegenCode(context.filename)) {
      return {};
    }

    // Check all imports of non codegen code modules
    return {
      /**
       * For static `import ... from "..."` statements
       */
      ImportDeclaration(node) {
        reportIfImportingFromCodegen(
          context,
          node,
          node.source && node.source.value,
        );
      },

      /**
       * For dynamic `import(...)` statements
       */
      ImportExpression(node) {
        reportIfImportingFromCodegen(
          context,
          node,
          node.source && node.source.value,
        );
      },
    };
  },
};

const codegenLibPath = path.join(__dirname, `../src/codegen-lib`);
const codegenToolsPath = path.join(__dirname, `../src/codegen-tools`);

function isCodegenCode(filePath) {
  const codegenLibRelativePath = path.relative(codegenLibPath, filePath);

  const fileIsInCodegenLib =
    codegenLibRelativePath &&
    !codegenLibRelativePath.startsWith("..") &&
    !path.isAbsolute(codegenLibRelativePath);

  const codegenToolsRelativePath = path.relative(codegenToolsPath, filePath);

  const fileIsInCodegenTools =
    codegenToolsRelativePath &&
    !codegenToolsRelativePath.startsWith("..") &&
    !path.isAbsolute(codegenToolsRelativePath);

  return fileIsInCodegenLib || fileIsInCodegenTools;
}

function reportIfImportingFromCodegen(context, nodeForReport, sourceValue) {
  // Source value could be something invalid or something "virtual:"
  if (typeof sourceValue !== "string" || !sourceValue) {
    return;
  }

  // Using simple heuristic check on the import path string
  // A more advance version would be to resolve the module/imported-path and
  // re-use the `isCodegenCode` function to check if it is codegen code.
  if (sourceValue.includes("codegen")) {
    context.report({
      node: nodeForReport,
      message: `Importing codegen code is not allowed outside codegen folder, found import of '${sourceValue}'`,
    });
  }
}
