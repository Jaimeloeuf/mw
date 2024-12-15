import type { AsyncJobTypeConfig } from "./AsyncJobTypeConfig.js";

/**
 * Validate Job arguments using the zod validator if any, if valid, return the
 * parsed argument, else return the error.
 */
export function validateJobArgumentOnRead<T = unknown>(
  jobType: AsyncJobTypeConfig<T>,
  jobArguments: unknown,
): [null, null] | [error: null, data: T] | [error: Error, data: null] {
  if (jobType.argumentValidator === undefined) {
    return [null, null];
  }

  const { success, data, error } =
    jobType.argumentValidator.safeParse(jobArguments);

  if (success) {
    return [null, data];
  } else {
    return [error, null];
  }
}
