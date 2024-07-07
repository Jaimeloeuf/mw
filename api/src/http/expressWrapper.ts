import type { Request, Response } from "express";
import { HttpTransformerableException } from "../exceptions/index.js";
import type {
  DefaultJsendDatatype,
  JSendSuccess,
  JSendFail,
  JSendError,
} from "./JSend.js";

/**
 * Use this function to wrap httpRequestHandlers/controllers to interface with
 * ExpressJS and to deal with exceptions/errors and JSend format conversions.
 *
 * Notice that this does not pass the httpRequestHandler/controller the
 * `express.Response` function because we want to expose as little of the
 * underlying web server as possible since it can be switched out in the future.
 * Only things it actually require are passed in such as a function to set HTTP
 * status code.
 */
export const expressWrapper =
  <T = DefaultJsendDatatype>(
    httpRequestHandler: (
      req: Request,
      setHttpStatusCode: (statusCode: number) => void
    ) => T
  ) =>
  (req: Request, res: Response) => {
    try {
      const data = httpRequestHandler(
        req,
        // Wrapped to keep its 'this' binding
        (statusCode: number) => res.status(statusCode)
      );

      res.json({
        status: "success",
        data,
      } satisfies JSendSuccess<T>);
    } catch (error) {
      // If it is an exception that can be transformed into a HTTP response
      // transform it and use that as the response.
      if (error instanceof HttpTransformerableException) {
        res.json(error.transformToJSendFail() satisfies JSendFail);
        return;
      }

      res.json({
        status: "error",
        message: "Something went wrong!",
      } satisfies JSendError<string>);
    }
  };
