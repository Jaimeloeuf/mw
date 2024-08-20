import { config } from "../../config/index.js";
import { ProdRecaptchaGuardFF } from "./ProdRecaptchaGuardFF.js";
import { MockRecaptchaGuardFF } from "./MockRecaptchaGuardFF.js";

/**
 * Guard that validates recaptcha token found in a HTTP request header to ensure
 * that requests are made by humans.
 */
export const RecaptchaGuardFF =
  config.env === "production" ? ProdRecaptchaGuardFF : MockRecaptchaGuardFF;
