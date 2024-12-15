import { InvalidInternalStateException } from "../exceptions/index.js";
import { logger } from "../logging/index.js";

/**
 * Utility wrappers over `JSON`.
 */
export const json = {
  /**
   * This is basically `JSON.stringify`, but re-throws errors, to convert them
   * to `InvalidInternalStateException` error classes for better handling by
   * controllers like `httpController`.
   */
  stringify(maybeJsonStringifiable: unknown) {
    try {
      return JSON.stringify(maybeJsonStringifiable);
    } catch (error) {
      throw new InvalidInternalStateException(
        `JSON.stringify failed with '${error?.toString()}' on: ${maybeJsonStringifiable}`,
      );
    }
  },

  /**
   * Internally wraps `json.stringify` with try/catch so that this will never
   * throw. If there is an error, this will log it verbosely in non-prod
   * environments and return an empty string.
   */
  stringifySafely(maybeJsonStringifiable: unknown) {
    try {
      return json.stringify(maybeJsonStringifiable);
    } catch (error) {
      logger.nonProdVerbose("json.stringifySafely", error);

      return "";
    }
  },

  /**
   * Prettify the JSON string output for better logging readability.
   *
   * If there is an error, this will never throw, it will log it verbosely and
   * return an empty string.
   */
  stringifyPretty(obj: unknown) {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      logger.verbose(
        "json.stringifyPretty",
        `JSON.stringify threw while trying to stringify: ${obj}`,
      );
      logger.verbose("json.stringifyPretty", `JSON.stringify threw: ${e}`);

      return "";
    }
  },

  /**
   * This is basically `JSON.parse`, but re-throws errors, to convert them
   * to `InvalidInternalStateException` error classes for better handling by
   * controllers like `httpController`.
   */
  parse<ParsedType = unknown>(maybeJsonString: string): ParsedType {
    try {
      return JSON.parse(maybeJsonString);
    } catch (error) {
      throw new InvalidInternalStateException(
        `JSON.parse failed with '${error?.toString()}' on: ${maybeJsonString}`,
      );
    }
  },

  /**
   * Internally wraps `json.parse` with try/catch so that this will never
   * throw. If there is an error, this will log it verbosely in non-prod
   * environments.
   */
  parseSafely<ParsedType>(
    maybeJsonString: string,
  ): [null, ParsedType] | [Error, null] {
    try {
      return [null, json.parse<ParsedType>(maybeJsonString)];
    } catch (error) {
      logger.nonProdVerbose("json.parseSafely", error);
      // Safe to cast as Error as it is definitely an error after `json.parse`
      // try/catch re-throw for Error type conversion.
      return [error as Error, null];
    }
  },
};
