import { config } from "../../config/index.js";
import { RecaptchaGuardFF } from "../../guards/index.js";

export const blogRecaptchaGuard = RecaptchaGuardFF(
  config.blog_recaptcha_secret,
);
