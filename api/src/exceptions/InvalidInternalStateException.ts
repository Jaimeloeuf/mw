import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when there is an invalid internal state that prevents the requested
 * action from being executed. E.g. a User object loaded from data repo has no
 * ID for some reason.
 *
 * This converts to a HTTP 500 code since this is generally not a user
 * recoverable state.
 */
export class InvalidInternalStateException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Invalid Internal State Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 500,
      jsendData: [InvalidInternalStateException.name, this.message],
    };
  }
}
