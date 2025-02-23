import { HttpStatus } from "../types/HttpStatusCode.js";
import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action has exceeded its allowed timeout value.
 */
export class TimeoutException extends HttpTransformerableException {
  constructor(
    optionalMessage: string = "Timeout Exception",
    public readonly details?: Array<string>,
  ) {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: HttpStatus.InternalServerError_500,
      jsendData: [TimeoutException.name, this.message, ...(this.details ?? [])],
    };
  }
}
