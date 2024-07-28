/**
 * Export all custom rules under a single plugin.
 */
module.exports = {
  rules: {
    "require-function-name": require("./require-function-name.cjs"),
    "require-function-name-for-dalNoThrow": require("./require-function-name-for-dalNoThrow.cjs"),
  },
};
