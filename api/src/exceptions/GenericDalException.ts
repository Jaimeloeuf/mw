import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * HTTP transformable Exception for Generic DAL exceptions/errors.
 */
export class GenericDalException extends HttpTransformerableException {
  constructor({
    optionalMessage = "Generic DAL Exception",
    httpStatusCode = 500,
    details,
  }: {
    /**
     * Optional exception message to override the default message.
     */
    optionalMessage?: string;

    /**
     * Optional HTTP status code to override the default 500.
     */
    httpStatusCode?: number;

    /**
     * Optionally any additional data the caller might wish to supply.
     */
    details?: Array<string>;
  }) {
    super(optionalMessage);

    this.httpStatusCode = httpStatusCode;
    this.details = details;
  }

  public readonly httpStatusCode: number;
  public readonly details: Array<string> | undefined;

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
