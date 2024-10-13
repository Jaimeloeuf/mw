import { httpController } from "./httpController.js";
import { NotFoundException } from "../exceptions/index.js";

export const routeNotFound = httpController({
  version: "neutral",
  // Method does not matter since this should be a catch all.
  method: "all",
  path: "*",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  httpRequestHandler() {
    const errMsg = "API Route not found";
    const err = new NotFoundException(errMsg);

    // Replace the stack trace with just the error message.
    // In prod, theres a lot of spam/fuzzy calls to find endpoints for
    // vulnerabilities, and since 404 is throw as an exception, the whole stack
    // trace is printed out, which clutters the logs and makes it hard to find
    // things we actually care about. So this just let things stay the same
    // except now with a 1 line stack trace.
    delete err.stack;
    err.stack = errMsg;

    throw err;
  },
});
