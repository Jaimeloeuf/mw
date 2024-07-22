import { config } from "../../config/index.js";
import { RecaptchaGuard } from "../../guards/index.js";

export const blogRecaptchaGuard = new RecaptchaGuard(
  config.blog_recaptcha_secret
);
