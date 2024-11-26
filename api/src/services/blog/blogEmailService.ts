import { config } from "../../config/index.js";
import { EmailServiceFF } from "../../infra/index.js";

export const blogEmailService = EmailServiceFF(
  config.blog_email_address(),
  config.blog_email_reply(),
);
