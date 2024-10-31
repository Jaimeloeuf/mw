import { noThrowPromise } from "../../utils/index.js";
import { logger } from "../../logging/index.js";
import {
  ConflictException,
  GenericDalException,
} from "../../exceptions/index.js";

/**
 * Utility wrapper around the `noThrowPromise` utility function, to transform
 * the error if it exists into one of the valid exceptions using the mapping of
 * kysely error code to exception class defined in `kyselyErrorToException`.
 *
 * ### When should I use this?
 * For example when splitting up an object for insertion into multiple tables,
 * we might not want to throw half way if one of the insertion fails. With this,
 * the caller gets back the error if any and the result if succeeded, and they
 * can then decide whats the best course of action if it failed, for e.g. should
 * they delete the previous insertions or continue or throw the error to let the
 * service layer handle it?
 *
 * ### Why should I use this instead of `noThrowPromise`?
 * This is a wrapper on top of it, to map the value thrown into an Exception,
 * as determined by the `kyselyErrorToException` mapping.
 */
export async function kyselyNoThrow<
  T extends Promise<any>,
  SuccessfulReturnType extends Awaited<T> = Awaited<T>,
>(promise: T): Promise<[null, SuccessfulReturnType] | [Error, null]> {
  const noThrowResult = await noThrowPromise(promise);

  if (noThrowResult[0] !== null) {
    noThrowResult[0] = kyselyErrorToException(noThrowResult[0]);
  }

  return noThrowResult;
}

/**
 * Utility to convert a kysely error to an exception with a predefined mapping.
 */
function kyselyErrorToException(e: Error) {
  const kyselyErrorCode = (e as any)?.code;

  switch (kyselyErrorCode) {
    case "23505":
      return new ConflictException("Unique Constraint Violation Exception", [
        (e as any)?.detail,
        (e as any)?.constraint,
      ]);

    default:
      logger.info(
        kyselyErrorToException.name,
        `Unable to map exception to Kysely Error Code '${kyselyErrorCode}', falling back to ${GenericDalException.name}`,
      );
      return GenericDalException.build().setAdditionalDetails([
        (e as any)?.detail,
        (e as any)?.constraint,
      ]);
  }
}
