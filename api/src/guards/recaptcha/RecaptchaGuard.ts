import { config } from "../../config/index.js";
import { ProdRecaptchaGuard } from "./ProdRecaptchaGuard.js";
import { MockRecaptchaGuard } from "./MockRecaptchaGuard.js";

/**
 * Guard that validates recaptcha token found in a HTTP request header to ensure
 * that requests are made by humans.
 */
export const RecaptchaGuard =
  config.env === "production" ? ProdRecaptchaGuard : MockRecaptchaGuard;
