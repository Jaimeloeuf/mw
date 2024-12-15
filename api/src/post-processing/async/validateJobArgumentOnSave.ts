import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

import { InvalidInternalStateException } from "../../exceptions/InvalidInternalStateException.js";

/**
 * Validate Job arguments using the zod validator if any, if valid, return the
 * parsed argument.
 *
 * If arguments is invalid an error will be thrown.
 *
 * If there is no argumentValidator given, assume that the job does not take any
 * arguments and returns null instead.
 */
export function validateJobArgumentOnSave<T>(
  asyncJobConfig: AsyncJobTypeConfig<T>,
  jobArguments?: unknown,
) {
  if (asyncJobConfig.argumentValidator === undefined) {
    return null;
  }

  const { success, data, error } =
    asyncJobConfig.argumentValidator.safeParse(jobArguments);

  if (!success) {
    throw new InvalidInternalStateException(
      `Invalid Async Job arguments for '${asyncJobConfig.name}' ` +
        error.toString(),
    );
  }

  return data;
}
