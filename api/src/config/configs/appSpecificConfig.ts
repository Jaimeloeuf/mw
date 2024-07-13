import { z, type ZodRawShape } from "zod";

/**
 * App specific config (grouped by app)
 */
export const appSpecificConfigSchema = {
  /**
   * Recaptcha secret token for the blog site
   */
  blog_recaptcha_secret: z.string(),

  /**
   * Email address used to send out transactional emails.
   */
  blog_email_transactional_address: z
    .string()
    .email()
    .default("robot@jjss.quest"),

  /**
   * The 'reply to email address' users see in their transactional emails.
   */
  blog_email_transactional_reply: z
    .string()
    .email()
    .default("jaimeloeuf@gmail.com"),
} satisfies ZodRawShape;

export const appSpecificConfigData = {
  blog_recaptcha_secret: process.env["BLOG_RECAPTCHA_SECRET"],
  blog_email_transactional_address:
    process.env["BLOG_EMAIL_TRANSACTIONAL_ADDRESS"],
  blog_email_transactional_reply: process.env["BLOG_EMAIL_TRANSACTIONAL_REPLY"],
} satisfies Record<keyof typeof appSpecificConfigSchema, unknown>;
