import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action's actor is forbidden (not authorized) from performing it.
 */
export class ForbiddenException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Forbidden Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 403,
      jsendData: [ForbiddenException.name, this.message],
    };
  }
}
