import { httpController } from "../http/index.js";
import { config } from "../config/index.js";

export const version = httpController({
  version: "neutral",
  method: "get",
  path: "/version",
  guards: null,
  requestDataValidator: null,
  httpRequestHandler() {
    return `${config.env} - ${"..."}`;
  },
});
