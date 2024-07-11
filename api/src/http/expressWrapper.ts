import type { Request, Response } from "express";
import type { ZodType, infer as zodInfer } from "zod";
import { logger } from "../logging/index.js";
import {
  HttpTransformerableException,
  Exception,
} from "../exceptions/index.js";
import type {
  ValidJsendDatatype,
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
export const expressWrapper = <
  HttpMethodStringLiteralType extends
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "all",
  PathStringLiteralType extends string,
  NullableZodParserType extends ZodType | null,
  RequestDataType = NullableZodParserType extends null
    ? null
    : zodInfer<Exclude<NullableZodParserType, null>>
>(
  method: HttpMethodStringLiteralType,
  path: PathStringLiteralType,
  requestDataValidator: NullableZodParserType,
  httpRequestHandler: (
    requestData: RequestDataType,
    setHttpStatusCode: (statusCode: number) => void
  ) => ValidJsendDatatype
) => ({
  method,
  path,
  routeHandler: (req: Request, res: Response) => {
    try {
      const requestData =
        requestDataValidator === null
          ? null
          : requestDataValidator.parse({
              ...req.params,
              ...req.query,
              ...req.body,
            });

      const data = httpRequestHandler(
        requestData,
        (statusCode: number) => res.status(statusCode) // Wrap to preserve 'this' binding
      );

      res.json({
        status: "success",
        data,
      } satisfies JSendSuccess);
    } catch (error) {
      // Simple error logging
      logger.error(expressWrapper.name, (error as Error)?.stack);

      // If it is an exception that can be transformed into a HTTP response
      // transform it and use that as the response.
      if (error instanceof HttpTransformerableException) {
        const { httpStatusCode, jsendData } =
          error.transformToHttpResponseData();

        res.status(httpStatusCode).json({
          status: "fail",
          data: jsendData,
        } satisfies JSendFail);

        return;
      }

      // This is like if there is an exception, but somehow that exception does
      // not implement the `HttpTransformerableException` class, then we will
      // generate a default message for it.
      if (error instanceof Exception) {
        res
          // Using 400 to indicate that it is an exception rather than error
          // since a retry without modification will probably not work assuming
          // it is not a server error.
          .status(400)
          .json({
            status: "fail",
            data: ["Exception without HTTP transformer", error.message],
          } satisfies JSendFail);

        return;
      }

      res.json({
        status: "error",
        message: "Internal Server Error!",
        data: [error instanceof Error ? error.message : "unknown error"],
      } satisfies JSendError);
    }
  },
});
