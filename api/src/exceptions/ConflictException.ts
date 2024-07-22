import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action is in conflict with existing data or another action.
 */
export class ConflictException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Conflict Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 409,
      jsendData: [ConflictException.name, this.message],
    };
  }
}
