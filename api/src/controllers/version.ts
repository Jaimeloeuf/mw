import { httpController } from "../http/httpController.js";
import { config } from "../config/index.js";

export const version = httpController({
  method: "get",
  path: "/version",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return `${config.env} - ${"..."}`;
  },
});
