import { expressWrapper } from "../http/expressWrapper.js";
import { config } from "../config/index.js";

export const version = expressWrapper("get", "/version", function () {
  return `${config.env} - ${"..."}`;
});
