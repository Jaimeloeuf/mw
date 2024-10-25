import { z } from "zod";
import { createConfigMapping } from "../utils/createConfigMapping.js";

/**
 * App specific config (grouped by app)
 */
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

  /**
   * Flag to let service know if running on GCP platform. Only set this to
   * `true` when running service in Google Cloud Platform to use GCP's ADC.
   */
  muwno_gcp: createConfigMapping(
    z
      .enum(["true", "false"])
      .transform((v) => v === "true")
      .default("false"),
    process.env["MUWNO_GCP"],
  ),

  /**
   * Recaptcha secret token for muwno
   */
  muwno_recaptcha_secret: createConfigMapping(
    z.string(),
    process.env["MUWNO_RECAPTCHA_SECRET"],
  ),

  /**
   * Postmark email service API key.
   * This is optional for development environments as it will be mocked.
   */
  muwno_postmark_api_key: createConfigMapping(
    z.string().optional(),
    process.env["MUWNO_POSTMARK_API_KEY"],
  ),

  /**
   * Email address used for transactional emails.
   */
  muwno_email_transactional_address: createConfigMapping(
    z.string().email().default("robot@muwno.com"),
    process.env["MUWNO_EMAIL_TRANSACTIONAL_ADDRESS"],
  ),

  /**
   * Email address for user replies to transactional emails.
   */
  muwno_email_transactional_reply: createConfigMapping(
    z.string().email().default("help@muwno.com"),
    process.env["MUWNO_EMAIL_TRANSACTIONAL_REPLY"],
  ),

  /**
   * Email address used for survey email blasts.
   */
  muwno_email_blast_address: createConfigMapping(
    z.string().email().default("survey-blasts@muwno.com"),
    process.env["MUWNO_EMAIL_BLAST_ADDRESS"],
  ),

  /**
   * Email address for user replies to email blast emails.
   */
  muwno_email_blast_reply: createConfigMapping(
    z.string().email().default("help@muwno.com"),
    process.env["MUWNO_EMAIL_BLAST_REPLY"],
  ),

  /**
   * API key to access OpenAI's API.
   */
  muwno_openai_api_key: createConfigMapping(
    z.string(),
    process.env["MUWNO_OPENAI_API_KEY"],
  ),

  /**
   * muwno's OpenAI Org ID.
   */
  muwno_openai_org: createConfigMapping(
    z.string(),
    process.env["MUWNO_OPENAI_ORG"],
  ),

  /**
   * muwno Stripe Secret Key.
   */
  muwno_stripe_secret_key: createConfigMapping(
    z.string(),
    process.env["MUWNO_STRIPE_SECRET_KEY"],
  ),

  /**
   * muwno Stripe Webhook Secret.
   */
  muwno_stripe_webhook_secret: createConfigMapping(
    z.string(),
    process.env["MUWNO_STRIPE_WEBHOOK_SECRET"],
  ),

  /**
   * muwno Stripe Webhook Path Secret.
   */
  muwno_stripe_webhook_path: createConfigMapping(
    z.string(),
    process.env["MUWNO_STRIPE_WEBHOOK_PATH"],
  ),

  /**
   * muwno Telegram bot's token.
   * This is optional for development environments as it will be mocked.
   */
  muwno_tele_bot_token: createConfigMapping(
    z.string().optional(),
    process.env["MUWNO_TELE_BOT_TOKEN"],
  ),

  /**
   * Chat ID of the team's telegram admin chat for notifications.
   * This is optional for development environments as it will be mocked.
   */
  muwno_tele_admin_chat_id: createConfigMapping(
    z.string().optional(),
    process.env["MUWNO_TELE_ADMIN_CHAT_ID"],
  ),

  /**
   * API Key for OpenMeter.
   * This is optional for development environments as it will be mocked.
   */
  muwno_openmeter_api_key: createConfigMapping(
    z.string().optional(),
    process.env["MUWNO_OPENMETER_API_KEY"],
  ),

  /**
   * The Form app's root link.
   */
  muwno_form_link: createConfigMapping(
    z.string().url(),
    process.env["MUWNO_FORM_LINK"],
  ),

  /**
   * Arbitrary default TTL
   */
  muwno_throttle_ttl: createConfigMapping(
    z.number().default(3000),
    process.env["MUWNO_THROTTLE_TTL"],
  ),

  /**
   * Arbitrary default limit within each TTL period
   */
  muwno_throttle_limit: createConfigMapping(
    z.number().default(150),
    process.env["MUWNO_THROTTLE_LIMIT"],
  ),
} as const;
