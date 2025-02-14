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
        // Always drop 2 lines
        // The first line is the word 'Error' and isnt part of the stack frames.
        // The second line is the stack frame for this getStackTrace method,
        // which should not be part of the returned stack trace to users.
        .slice(2 + numberOfStackFramesToDrop)
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
  asJsonString(numberOfStackFramesToDrop: number = 0) {
    return json.stringifyPretty(
      this.asArray(
        // Always drop at least 1 more stack frame, which is this `asJsonString`
        // method itself.
        numberOfStackFramesToDrop + 1,
      ),
    );
  },
};
