import { logger } from "../logging/index.js";
import { json } from "./json.js";

/**
 * Since 'useUnknownInCatchVariables' is enabled in TSConfig, this utility
 * function helps to ensure that the value gets turned into an Error.
 */
export function unknownCatchToError(e: unknown) {
  if (e instanceof Error) {
    return e;
  }

  if (typeof e === "string") {
    return new Error(e);
  }

  if (typeof e === "number") {
    return new Error(e.toString());
  }

  logger.error(
    unknownCatchToError.name,
    `Found invalid error type thrown: ${json.stringifyPretty(e)}`,
  );

  return new Error(e?.toString?.() ?? "Unknown value caught");
}
