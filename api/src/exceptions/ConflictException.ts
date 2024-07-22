import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action is in conflict with existing data or another action.
 */
export class ConflictException extends HttpTransformerableException {
  constructor(
    /**
     * Accepts an `optionalMessage` to override the default exception message.
     */
    optionalMessage?: string
  ) {
    super(optionalMessage ?? `Conflict Exception`);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 409,
      jsendData: [ConflictException.name, this.message],
    };
  }
}
