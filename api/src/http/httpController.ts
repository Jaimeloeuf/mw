import type { Request, Response } from "express";
import type { ZodType, infer as zodInfer } from "zod";
import { ZodError } from "zod";
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
import type { HttpRequestGuard } from "./HttpRequestGuard.js";
import type { UnionToIntersection } from "../types/index.js";

/**
 * Use this function to wrap httpRequestHandlers/controllers to interface with
 * ExpressJS and to deal with exceptions/errors and JSend format conversions.
 *
 * Notice that this does not pass the httpRequestHandler/controller the
 * `express.Response` function because we want to expose as little of the
 * underlying web server as possible since it can be switched out in the future.
 * Only things it actually require are passed in such as a function to set HTTP
 * status code.
 *
 * Execution flow:
 * 1. Run all guard functions sequentially, stop if any of it fails by throwing.
 * 1. Create and validate request data if `requestDataValidator` is provided.
 * 1. Call the provided `httpRequestHandler` with request data.
 * 1. Respond to client with data returned from `httpRequestHandler` if it
 * succeeded, or return an exception/error to the client if anything threw in
 * this execution flow.
 */
export const httpController = <
  const Version extends number | "neutral",
  const HttpMethodStringLiteralType extends
    | "get"
    | "post"
    | "put"
    | "patch"
    | "delete"
    | "all",
  const PathStringLiteralType extends string,
  const Guards extends Readonly<Array<HttpRequestGuard>> | null,
  /**
   * Infer return type of all the Guards combined into a single object, which
   * will be the object passed into `httpRequestHandler` as guardData.
   */
  const GuardsDataType extends Guards extends null
    ? null
    : // Convert the union type of all Guards.check method's return type into an
      // intersection type, i.e., convert `type1 | type2` to `type1 & type2` so
      // that all properties are accessible.
      UnionToIntersection<
        // Exclude all invalid types first before converting the union type to
        // an intersection type, since these invalid types when intersected with
        // valid types will cause the intersection type to become `never`.
        Exclude<
          // Since check method can be async, unwrap the Awaitable return type.
          Awaited<
            // Get a union type of all Guards.check methods' return type.
            ReturnType<
              // Use Exclude on `Guards` type since `GuardsDataType` already did
              // a conditional null type check.
              Exclude<Guards, null>[number]["check"]
            >
          >,
          | void
          | Promise<void>
          | undefined
          | Promise<undefined>
          | null
          | Promise<null>
          | never
        >
      >,
  const NullableZodParserType extends ZodType | null,
  const RequestDataType = NullableZodParserType extends null
    ? null
    : zodInfer<Exclude<NullableZodParserType, null>>,
>({
  version,
  method,
  path,
  guards,
  requestDataValidator,
  httpRequestHandler,
}: {
  /**
   * API version number.
   */
  version: Version;
  /**
   * HTTP method.
   */
  method: HttpMethodStringLiteralType;
  /**
   * HTTP API request path. Same as what will be used for express JS.
   */
  path: PathStringLiteralType;
  /**
   * Optional Guard objects, which will run sequentially till completion. Stops
   * API request if any of these throws, else run request data validator if any
   * once guard checks complete.
   */
  guards: Guards;
  /**
   * Optional request data validator, this ZodType will be used to parse and
   * validate all request data coming in, which includes
   * 1. URL params
   * 1. URL query params
   * 1. request body.
   */
  requestDataValidator: NullableZodParserType;
  /**
   * User defined function that is called to handle the API request once guard
   * functions finish running and request data is validated.
   */
  httpRequestHandler: (context: {
    req: Request;
    guardData: GuardsDataType;
    requestData: RequestDataType;
    setHttpStatusCode: (statusCode: number) => void;
  }) => ValidJsendDatatype | Promise<ValidJsendDatatype>;
}): {
  version: `/v${Version}`;
  method: HttpMethodStringLiteralType;
  path: PathStringLiteralType;
  routeHandler: (req: Request, res: Response) => Promise<void>;
} => ({
  version: `/v${version}`,
  method,
  path,
  routeHandler: async (req: Request, res: Response) => {
    try {
      let guardData: GuardsDataType = {} as GuardsDataType;

      // Run Guard functions sequentialy if any, and before the expensive data
      // validation step. If a guard throws, all subsequent guards are skipped.
      if (guards !== null) {
        for (const guard of guards) {
          guardData = {
            ...guardData,
            ...(await guard.check(req)),
          };
        }
      }

      const requestData =
        requestDataValidator === null
          ? null
          : requestDataValidator.parse({
              ...req.params,
              ...req.query,
              ...req.body,
            });

      const data = await httpRequestHandler({
        req,
        guardData,
        requestData,
        // Wrap to preserve 'this' binding
        setHttpStatusCode: (statusCode: number) => res.status(statusCode),
      });

      res.json({
        status: "success",
        data,
      } satisfies JSendSuccess);
    } catch (error) {
      // Create a err/err-log ID, to log it together with the error and send it
      // back to the client to improve debugging.
      const logID = crypto.randomUUID();

      // Simple error logging
      logger.error(`${httpController.name}:${logID}`, (error as Error)?.stack);

      // If it is an exception that can be transformed into a HTTP response
      // transform it and use that as the response.
      if (error instanceof HttpTransformerableException) {
        const { httpStatusCode, jsendData } =
          error.transformToHttpResponseData();

        res.status(httpStatusCode).json({
          status: "fail",
          // Use flatten as jsendData could be an array
          data: [`ID: ${logID}`, jsendData].flat(),
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
            data: [
              `ID: ${logID}`,
              "Exception without HTTP transformer",
              error.message,
            ],
          } satisfies JSendFail);

        return;
      }

      // Treat Zod input validation/parsing errors as exceptions
      if (error instanceof ZodError) {
        res.status(400).json({
          status: "fail",
          data: [`ID: ${logID}`, "Invalid input data", ...error.issues],
        } satisfies JSendFail);

        return;
      }

      // If instance thrown is none of the above exception types, then it is an
      // error of unknown nature, respond with the appropriate JSend error type.
      res.status(500).json({
        status: "error",
        message: "Internal Server Error!",
        data: [
          `ID: ${logID}`,
          error instanceof Error ? error.message : "unknown error",
        ],
      } satisfies JSendError);
    }
  },
});
