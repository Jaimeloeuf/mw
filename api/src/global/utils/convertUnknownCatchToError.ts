declare global {
  /**
   * Converts unknown `e` type to a definite `Error` type before returning it.
   *
   * Since '$convertUnknownCatchToError' is enabled in TSConfig, this utility
   * function helps to ensure that the value gets turned into an Error.
   */
  function $convertUnknownCatchToError(e: unknown): Error;
}

globalThis.$convertUnknownCatchToError = function $convertUnknownCatchToError(
  e: unknown,
) {
  if (e instanceof Error) {
    return e;
  }

  if (typeof e === "string") {
    return new Error(e);
  }

  if (typeof e === "number") {
    return new Error(e.toString());
  }

  // Dynamically load the logger and json utility module instead of importing
  // them at top level to make this function more portable to use.
  // Only downside to this is if the process is killed say by `process.exit(1)`
  // right after the error is returned, and this doesnt get to run at all.
  import("../../logging/index.js").then(({ logger }) =>
    import("../../utils/index.js").then(({ json }) =>
      logger.error(
        $convertUnknownCatchToError.name,
        `Found invalid error type thrown: ${json.stringifyPretty(e)}`,
      ),
    ),
  );

  return new Error(e?.toString?.() ?? "Unknown value caught");
};
