const path = require("path");
const { createHash } = require("crypto");

module.exports = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Ensure that all generated (codegened) files are valid, by checking if the hash is correct.",
    },
    fixable: "code",
    schema: [],
  },
  create(context) {
    // If the file is not a generated file, ignore checks by returning empty
    // visitor object.
    if (!isGeneratedFile(context.filename)) {
      return {};
    }

    const fileWithoutHash = context.sourceCode.text.replace(
      /sha256\([^)]*\)/,
      "",
    );

    const hash = createHash("sha256")
      .update(fileWithoutHash)
      .digest()
      .toString("hex");

    const extractedFileHash =
      context.sourceCode.text.match(/sha256\((.*)\)/)?.[1];

    // If the file is not modified/invalid, ignore checks by returning empty
    // visitor object.
    if (extractedFileHash === hash) {
      return {};
    }

    return {
      // The Program node represents the root of the AST (the entire file).
      // This ensures the rule runs once for the entire file.
      Program(node) {
        context.report({
          message: `Generated file's hash is invalid and it might be modified. Fix this by re-running the codegen step.`,
          node,
        });
      },
    };
  },
};

const generatedFilesFolderPath = path.join(__dirname, `../src/__generated`);

function isGeneratedFile(filePath) {
  const relativePath = path.relative(generatedFilesFolderPath, filePath);
  return (
    relativePath &&
    !relativePath.startsWith("..") &&
    !path.isAbsolute(relativePath)
  );
}
