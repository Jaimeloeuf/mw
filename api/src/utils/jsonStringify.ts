import { InvalidInternalStateException } from "../exceptions/index.js";

/**
 * This is basically `JSON.stringify`, but re-throws errors, to convert them to
 * `InvalidInternalStateException` error classes for better handling by
 * controllers like `httpController`.
 */
export function jsonStringify(maybeJsonStringifiable: any) {
  try {
    return JSON.stringify(maybeJsonStringifiable);
  } catch (error) {
    throw new InvalidInternalStateException(
      `JSON.stringify failed with '${error?.toString()}' on: ${maybeJsonStringifiable}`,
    );
  }
}
