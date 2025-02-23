import { HttpStatus, type HttpStatusCode } from "../types/index.js";
import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * HTTP transformable Exception for Generic DAL exceptions/errors.
 */
export class GenericDalException extends HttpTransformerableException {
  static build(
    /**
     * Optional exception message to override the default message.
     */
    optionalMessage?: string,
  ) {
    return new GenericDalException(optionalMessage);
  }

  constructor(msg: string = "Generic DAL Exception") {
    super(msg);
  }

  private httpStatusCode: HttpStatusCode = HttpStatus.InternalServerError_500;

  /**
   * Optionally override the default 500 HTTP status code.
   */
  setHttpStatusCode(httpStatusCode: HttpStatusCode) {
    this.httpStatusCode = httpStatusCode;
    return this;
  }

  private details?: Array<string>;

  /**
   * Optionally set additional details the caller might wish to supply.
   */
  setAdditionalDetails(details: Array<string>) {
    this.details = details;
    return this;
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: this.httpStatusCode,
      jsendData: [
        GenericDalException.name,
        this.message,
        ...(this.details ?? []),
      ],
    };
  }
}
