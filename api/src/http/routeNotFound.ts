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
    throw new NotFoundException("API Route not found");
  },
});
