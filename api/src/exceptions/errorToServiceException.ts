import { ServiceException } from "src/exceptions/ServiceException.js";

/**
 * Converts an Error into a generic HTTP transformable Service level Exception.
 */
export function errorToServiceException(e: Error) {
  return new ServiceException(e);
}
