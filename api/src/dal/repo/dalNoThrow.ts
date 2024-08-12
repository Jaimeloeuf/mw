import { Exception } from "../../exceptions/index.js";
import { toError } from "../../utils/index.js";
import { logger } from "../../logging/index.js";

/**
 * Used to wrap all DAL repo functions/methods so that they do not throw, and
 * instead have a return type of its original value unioned with `Error`.
 */
export function dalNoThrow<T extends (...args: any) => Promise<any>>(fn: T) {
  // Extra runtime check alongside compile time check with ESLint rule
  // 'mwEslintPlugin/require-function-name-for-dalNoThrow'
  if (fn.name === "") {
    throw new Error(`Functions passed to ${dalNoThrow.name} must be named`);
  }

  async function wrappedFunction(
    ...args: Parameters<T>
  ): Promise<Error | Awaited<ReturnType<T>>> {
    try {
      return await fn(...args);
    } catch (e) {
      // If it is an Exception, let it bubble up.
      // The assumption here is that only services use data repos, and services
      // are only called through controllers that have built in mechanisms for
      // error and exception handling. So instead of returning this exception
      // back to the service for them to throw and we assume they will always
      // throw it once they receive it, we just let it bubble up here.
      if (e instanceof Exception) {
        throw e;
      }

      const error = toError(e);

      logger.verbose(
        dalNoThrow.name,
        `Failed to execute DAL repo call: ${fn.name}`
      );

      logger.error(
        `${dalNoThrow.name}:${fn.name}`,
        error instanceof Error ? error.stack : error
      );

      return error;
    }
  }

  // Reuse fn.name so that logging uses the real name
  Object.defineProperty(wrappedFunction, "name", { value: fn.name });

  return wrappedFunction;
}
