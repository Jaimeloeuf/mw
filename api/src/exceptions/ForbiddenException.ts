import type { JSendFail } from "../http/JSend.js";
import { HttpTransformerableException } from "./HttpTransformerableException.js";

/**
 * Used when an action's actor is forbidden (not authorized) from performing it.
 */
export class ForbiddenException extends HttpTransformerableException {
  constructor(
    /**
     * Accepts an `optionalMessage` to override the default exception message.
     */
    optionalMessage?: string
  ) {
    super(optionalMessage ?? `Forbidden Exception`);
  }

  transformToJSendFail(): JSendFail<string> {
    return {
      status: "fail",
      data: this.message,
    };
  }
}
