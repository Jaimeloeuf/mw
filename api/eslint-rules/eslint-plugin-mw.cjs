/**
 * Export all custom rules under a single plugin.
 */
module.exports = {
  rules: {
    "require-function-name-for-addJob": require("./require-function-name-for-addJob.cjs"),
    dataFn: require("./dataFn.cjs"),
    httpController: require("./httpController.cjs"),
    "codegen-function-and-module-same-name": require("./codegen-function-and-module-same-name.cjs"),
    "startup-function-and-module-same-name": require("./startup-function-and-module-same-name.cjs"),
  },
};
