import { Exception } from "./Exception.js";
import type { JSendFail } from "../http/JSend.js";

export abstract class HttpTransformerableException extends Exception {
  /**
   * Call method to transform exception data into a JSON serializable object
   * following the JSend specification for failures.
   */
  abstract transformToJSendFail(): JSendFail<string>;
}
