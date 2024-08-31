import { z, type ZodRawShape } from "zod";
import { createConfigMapping } from "../createConfigMapping.js";

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
  blog_email_address: z.string().email().default("robot@jjss.quest"),

  /**
   * The 'reply to email address' users see in their transactional emails.
   */
  blog_email_reply: z.string().email().default("jaimeloeuf@gmail.com"),
} satisfies ZodRawShape;

export const appSpecificConfigData = {
  blog_recaptcha_secret: process.env["BLOG_RECAPTCHA_SECRET"],
  blog_email_address: process.env["BLOG_EMAIL_ADDRESS"],
  blog_email_reply: process.env["BLOG_EMAIL_REPLY"],
} satisfies Record<keyof typeof appSpecificConfigSchema, unknown>;

export const appSpecificConfig = {
  /**
   * Recaptcha secret token for the blog site
   */
  blog_recaptcha_secret: createConfigMapping(
    z.string(),
    process.env["BLOG_RECAPTCHA_SECRET"],
  ),

  /**
   * Email address used to send out transactional emails.
   */
  blog_email_address: createConfigMapping(
    z.string().email().default("robot@jjss.quest"),
    process.env["BLOG_EMAIL_ADDRESS"],
  ),

  /**
   * The 'reply to email address' users see in their transactional emails.
   */
  blog_email_reply: createConfigMapping(
    z.string().email().default("jaimeloeuf@gmail.com"),
    process.env["BLOG_EMAIL_REPLY"],
  ),
} as const;
