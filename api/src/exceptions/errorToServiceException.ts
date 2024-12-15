import { ServiceException } from "../exceptions/ServiceException.js";

/**
 * Converts an Error into a generic HTTP transformable Service level Exception.
 */
export function errorToServiceException(e: Error) {
  const exception = new ServiceException(e.message);

  exception.name = e.name ?? ServiceException.name;

  if (e.stack !== undefined) {
    exception.stack = e.stack;
  }

  if (e.cause !== undefined) {
    exception.cause = e.cause;
  }

  return exception;
}
