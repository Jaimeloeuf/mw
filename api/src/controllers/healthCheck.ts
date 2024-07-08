import { expressWrapper } from "../http/expressWrapper.js";

export const healthCheck = expressWrapper(function () {
  return "ok";
});
