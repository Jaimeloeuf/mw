import { config } from "../../config/index.js";
import { recaptchaGuardFF } from "../../guards/index.js";

export const blogRecaptchaGuard = recaptchaGuardFF(
  config.blog_recaptcha_secret
);
