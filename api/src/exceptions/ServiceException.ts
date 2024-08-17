import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Generic HTTP transformable Service level Exception.
 */
export class ServiceException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Service Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 500,
      jsendData: [ServiceException.name, this.message],
    };
  }
}
