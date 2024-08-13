/**
 * Export all custom rules under a single plugin.
 */
module.exports = {
  rules: {
    "require-function-name-for-addJob": require("./require-function-name-for-addJob.cjs"),
    "require-function-name-for-dalWrapper": require("./require-function-name-for-dalWrapper.cjs"),
  },
};
