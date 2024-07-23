import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action contains invalid input. E.g. trying to withdraw a
 * negative dollar amount from an ATM.
 */
export class InvalidInputException extends HttpTransformerableException {
  constructor(optionalMessage: string = "Invalid Input Exception") {
    super(optionalMessage);
  }

  transformToHttpResponseData() {
    return {
      httpStatusCode: 400,
      jsendData: [InvalidInputException.name, this.message],
    };
  }
}
