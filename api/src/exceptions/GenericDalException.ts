import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * HTTP transformable Exception for Generic DAL exceptions/errors.
 */
export class GenericDalException extends HttpTransformerableException {
  constructor(
    /**
     * Either provide an `optionalMessage` string or an options object.
     */
    options:
      | string
      | {
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
        },
  ) {
    if (typeof options === "string") {
      super(options);
      this.httpStatusCode = 500;
      return;
    }

    super(options.optionalMessage ?? "Generic DAL Exception");
    this.httpStatusCode = options.httpStatusCode ?? 500;
    this.details = options.details;
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
