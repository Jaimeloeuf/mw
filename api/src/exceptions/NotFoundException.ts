import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when a piece of resource needed to perform the requested action is not
 * found.
 */
export class NotFoundException extends HttpTransformerableException {
  constructor(
    /**
     * Accepts an `optionalMessage` to override the default exception message.
     */
    optionalMessage?: string
  ) {
    super(optionalMessage ?? `Not Found Exception`);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 404,
      jsendData: [NotFoundException.name, this.message],
    };
  }
}
