import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Generic HTTP transformable Service level Exception.
 */
export class ServiceException extends HttpTransformerableException {
  constructor(e: Error = new Error("Service Exception")) {
    super(e.message);

    this.name = e.name;

    if (e.stack !== undefined) {
      this.stack = e.stack;
    }

    if (e.cause !== undefined) {
      this.cause = e.cause;
    }
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 500,
      jsendData: [ServiceException.name, this.message],
    };
  }
}
