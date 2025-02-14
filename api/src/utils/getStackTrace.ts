import { json } from "./json.js";

export const getStackTrace = {
  /**
   * Get stack trace in as `Array<string>`.
   *
   * ## Details
   * Uses the `Error` stack to get the current stack trace, before we process it
   * and JSON stringify it.
   */
  asArray(numberOfStackFramesToDrop: number = 0) {
    return (
      Error()
        .stack?.split("\n")
        // Always drop at least 1 line, since this isnt part of the stack
        // frames, but rather the word 'Error'.
        .slice(1 + numberOfStackFramesToDrop)
        .map((s) =>
          s
            // Remove the tab indentation
            .trim()
            // Remove 'at ' at the start to only keep symbol name and location
            .replace("at ", ""),
        ) ?? []
    );
  },

  /**
   * Get stack trace as prettified JSON string using `getStackTrace.asArray`.
   */
  asJsonString(...args: Parameters<typeof this.asArray>) {
    return json.stringifyPretty(this.asArray(...args));
  },
};
