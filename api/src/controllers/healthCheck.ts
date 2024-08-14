import { httpController } from "../http/httpController.js";

export const healthCheck = httpController({
  version: "neutral",
  method: "get",
  path: "/",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return "ok";
  },
});
