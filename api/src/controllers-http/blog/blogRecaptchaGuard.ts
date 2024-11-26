import { config } from "../../config/index.js";
import { RecaptchaGuardFF } from "../../guards-shared/index.js";

export const blogRecaptchaGuard = RecaptchaGuardFF(
  config.blog_recaptcha_secret(),
);
