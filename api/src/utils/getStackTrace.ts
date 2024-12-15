import { json } from "./json.js";

/**
 * Get stack trace in JSON string format
 *
 * ## Details
 * Uses the `Error` stack to get the current stack trace, before we process it
 * and JSON stringify it.
 */
export const getStackTrace = (numberOfStackFramesToDrop: number = 0) =>
  json.stringifyPretty(
    Error()
      .stack?.split("\n")
      // Always drop at least 1 line, since this isnt part of the stack frames,
      // but rather the word 'Error'.
      .slice(1 + numberOfStackFramesToDrop)
      .map((s) =>
        s
          // Remove the tab indentation
          .trim()
          // Remove 'at ' at the start to only keep symbol name and location
          .replace("at ", ""),
      ),
  );
