import { HttpStatusCode } from "../types/HttpStatusCode.js";
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
      httpStatusCode: HttpStatusCode.InternalServerError_500,
      jsendData: [ServiceException.name, this.message],
    };
  }
}
