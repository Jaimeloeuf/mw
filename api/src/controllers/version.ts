import { expressWrapper } from "../http/expressWrapper.js";
import { config } from "../config/index.js";

export const version = expressWrapper("get", "/version", null, function () {
  return `${config.env} - ${"..."}`;
});
