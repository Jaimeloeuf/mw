import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when a piece of resource needed to perform the requested action is not
 * found.
 */
export class NotFoundException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Not Found Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 404,
      jsendData: [NotFoundException.name, this.message],
    };
  }
}
