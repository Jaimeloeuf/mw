import { httpController } from "./httpController.js";
import { NotFoundException } from "../exceptions/index.js";

export const routeNotFound = httpController({
  // Method does not matter since this should be a catch all.
  method: "all",
  path: "*",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    throw new NotFoundException("API Route not found");
  },
});
