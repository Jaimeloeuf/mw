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
import type { useHttpRequestGuard } from "./useHttpRequestGuard.js";
import type { NonEmptyArray } from "../types/index.js";

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
  const Guards extends Readonly<
    NonEmptyArray<ReturnType<typeof useHttpRequestGuard>>
  > | null,
  /**
   * Infer return type of all the Guards combined into a single object under
   * their specified string literal `guardNamespace`, which will then be passed
   * into `httpRequestHandler` as guardData.
   */
  const GuardsDataType extends Guards extends null
    ? null
    : {
        [T in Exclude<Guards, null>[number]["guardDataNamespace"]]: Awaited<
          ReturnType<Exclude<Guards, null>[number]["guard"]>
        >;
      },
  const NullableUrlParamsZodParserType extends ZodType | null,
  const UrlParamsType extends NullableUrlParamsZodParserType extends null
    ? null
    : zodInfer<Exclude<NullableUrlParamsZodParserType, null>>,
  const NullableUrlQueryParamsZodParserType extends ZodType | null,
  const UrlQueryParamsType extends
    NullableUrlQueryParamsZodParserType extends null
      ? null
      : zodInfer<Exclude<NullableUrlQueryParamsZodParserType, null>>,
  const NullableRequestBodyZodParserType extends ZodType | null,
  const RequestBodyType extends NullableRequestBodyZodParserType extends null
    ? null
    : zodInfer<Exclude<NullableRequestBodyZodParserType, null>>,
  const HttpRequestHandlerReturnType extends
    | ValidJsendDatatype
    | Promise<ValidJsendDatatype>,
  const HttpRequestHandlerType extends (context: {
    req: Request;
    guardData: GuardsDataType;
    urlParams: UrlParamsType;
    urlQueryParams: UrlQueryParamsType;
    requestBody: RequestBodyType;
    /**
     * Use this to set HTTP status code on successful controller executions.
     */
    setHttpStatusCode: (statusCode: number) => void;
  }) => HttpRequestHandlerReturnType,
>({
  version,
  method,
  path,
  guards,
  urlParamsValidator,
  urlQueryParamsValidator,
  requestBodyValidator,
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
   * Optional URL params validator, this ZodType will be used to parse and
   * validate the URL params before using it in the context object.
   */
  urlParamsValidator: NullableUrlParamsZodParserType;
  /**
   * Optional URL query params validator, this ZodType will be used to parse and
   * validate the URL query params before using it in the context object.
   */
  urlQueryParamsValidator: NullableUrlQueryParamsZodParserType;
  /**
   * Optional request body data validator, this ZodType will be used to parse
   * and validate the request body data before using it in the context object.
   */
  requestBodyValidator: NullableRequestBodyZodParserType;
  /**
   * User defined function that is called to handle the API request once guard
   * functions finish running and request data is validated.
   */
  httpRequestHandler: HttpRequestHandlerType;
}): {
  version: `/v${Version}`;
  method: HttpMethodStringLiteralType;
  path: PathStringLiteralType;
  routeHandler: (req: Request, res: Response) => Promise<void>;

  // These values are "re-exported" so that they can be used for type inference
  urlParamsValidator: NullableUrlParamsZodParserType;
  urlQueryParamsValidator: NullableUrlQueryParamsZodParserType;
  requestBodyValidator: NullableRequestBodyZodParserType;
  httpRequestHandler: HttpRequestHandlerType;
} => ({
  version: `/v${version}`,
  method,
  path,
  urlParamsValidator,
  urlQueryParamsValidator,
  requestBodyValidator,
  httpRequestHandler,
  routeHandler: async (req: Request, res: Response) => {
    try {
      let guardData = null as GuardsDataType;

      // Run Guard functions sequentialy if any, and before the expensive data
      // validation step. If a guard throws, all subsequent guards are skipped.
      if (guards !== null) {
        const partialGuardData: GuardsDataType = {} as Exclude<
          GuardsDataType,
          null
        >;

        for (const { guardDataNamespace, guard } of guards) {
          partialGuardData[guardDataNamespace] = await guard(req);
        }

        guardData = partialGuardData;
      }

      // Defaults to 200 ok if no exceptions thrown
      let statusCode = 200;

      const data = await httpRequestHandler({
        req,
        guardData,

        urlParams:
          urlParamsValidator === null
            ? null
            : urlParamsValidator.parse(req.params),

        urlQueryParams:
          urlQueryParamsValidator === null
            ? null
            : urlQueryParamsValidator.parse(req.query),

        requestBody:
          requestBodyValidator === null
            ? null
            : requestBodyValidator.parse(req.body),

        setHttpStatusCode: (code: number) => (statusCode = code),
      });

      res
        // Only set the status code right before sending back the data to ensure
        // that the status code is not sent ahead of time before controller
        // execution succeeds, which might cause issues if the controller thows
        // and an error status code needs to be set.
        .status(statusCode)
        .json({
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
