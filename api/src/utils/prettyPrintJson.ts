import { logger } from "../logging/index.js";

/**
 * Common way to pretty print JS Objects.
 *
 * If stringification fails and JSON.stringify throws, it will be caught and the
 * error will be logged, and an empty string will be returned instead.
 */
export function prettyPrintJson(obj: any) {
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    logger.error(
      prettyPrintJson.name,
      `JSON.stringify threw while trying to stringify: ${obj}`
    );
    logger.error(prettyPrintJson.name, `JSON.stringify threw: ${e}`);

    return "";
  }
}
