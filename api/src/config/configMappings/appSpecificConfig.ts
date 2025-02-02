import { z } from "zod";

import { createConfig } from "../utils/createConfig.js";

/**
 * App specific config (grouped by app)
 */
export const appSpecificConfig = {
  /**
   * Recaptcha secret token for the blog site
   */
  blog_recaptcha_secret: createConfig(z.string(), function () {
    return process.env["BLOG_RECAPTCHA_SECRET"];
  }),

  /**
   * Email address used to send out transactional emails.
   */
  blog_email_address: createConfig(
    z.string().email().default("robot@jjss.quest"),
    function () {
      return process.env["BLOG_EMAIL_ADDRESS"];
    },
  ),

  /**
   * The 'reply to email address' users see in their transactional emails.
   */
  blog_email_reply: createConfig(
    z.string().email().default("jaimeloeuf@gmail.com"),
    function () {
      return process.env["BLOG_EMAIL_REPLY"];
    },
  ),

  /**
   * Flag to let service know if running on GCP platform. Only set this to
   * `true` when running service in Google Cloud Platform to use GCP's ADC.
   */
  muwno_gcp: createConfig(
    z
      .enum(["true", "false"])
      .default("false")
      .transform((v) => v === "true"),
    function () {
      return process.env["MUWNO_GCP"];
    },
  ),

  /**
   * Recaptcha secret token for muwno
   */
  muwno_recaptcha_secret: createConfig(z.string(), function () {
    return process.env["MUWNO_RECAPTCHA_SECRET"];
  }),

  /**
   * Postmark email service API key.
   */
  muwno_postmark_api_key: createConfig(z.string(), function () {
    return process.env["MUWNO_POSTMARK_API_KEY"];
  }),

  /**
   * Email address used for transactional emails.
   */
  muwno_email_transactional_address: createConfig(
    z.string().email().default("robot@muwno.com"),
    function () {
      return process.env["MUWNO_EMAIL_TRANSACTIONAL_ADDRESS"];
    },
  ),

  /**
   * Email address for user replies to transactional emails.
   */
  muwno_email_transactional_reply: createConfig(
    z.string().email().default("help@muwno.com"),
    function () {
      return process.env["MUWNO_EMAIL_TRANSACTIONAL_REPLY"];
    },
  ),

  /**
   * Email address used for survey email blasts.
   */
  muwno_email_blast_address: createConfig(
    z.string().email().default("survey-blasts@muwno.com"),
    function () {
      return process.env["MUWNO_EMAIL_BLAST_ADDRESS"];
    },
  ),

  /**
   * Email address for user replies to email blast emails.
   */
  muwno_email_blast_reply: createConfig(
    z.string().email().default("help@muwno.com"),
    function () {
      return process.env["MUWNO_EMAIL_BLAST_REPLY"];
    },
  ),

  /**
   * API key to access OpenAI's API.
   */
  muwno_openai_api_key: createConfig(z.string(), function () {
    return process.env["MUWNO_OPENAI_API_KEY"];
  }),

  /**
   * muwno's OpenAI Org ID.
   */
  muwno_openai_org: createConfig(z.string(), function () {
    return process.env["MUWNO_OPENAI_ORG"];
  }),

  /**
   * muwno Stripe Secret Key.
   */
  muwno_stripe_secret_key: createConfig(z.string(), function () {
    return process.env["MUWNO_STRIPE_SECRET_KEY"];
  }),

  /**
   * muwno Stripe Webhook Secret.
   */
  muwno_stripe_webhook_secret: createConfig(z.string(), function () {
    return process.env["MUWNO_STRIPE_WEBHOOK_SECRET"];
  }),

  /**
   * muwno Stripe Webhook Path Secret.
   */
  muwno_stripe_webhook_path: createConfig(z.string(), function () {
    return process.env["MUWNO_STRIPE_WEBHOOK_PATH"];
  }),

  /**
   * muwno Telegram bot's token.
   */
  muwno_tele_bot_token: createConfig(z.string(), function () {
    return process.env["MUWNO_TELE_BOT_TOKEN"];
  }),

  /**
   * Chat ID of the team's telegram admin chat for notifications.
   */
  muwno_tele_admin_chat_id: createConfig(z.string(), function () {
    return process.env["MUWNO_TELE_ADMIN_CHAT_ID"];
  }),

  /**
   * API Key for OpenMeter.
   */
  muwno_openmeter_api_key: createConfig(z.string(), function () {
    return process.env["MUWNO_OPENMETER_API_KEY"];
  }),

  /**
   * The Form app's root link.
   */
  muwno_form_link: createConfig(z.string().url(), function () {
    return process.env["MUWNO_FORM_LINK"];
  }),

  /**
   * Arbitrary default TTL
   */
  muwno_throttle_ttl: createConfig(z.number().default(3000), function () {
    return process.env["MUWNO_THROTTLE_TTL"] === undefined
      ? undefined
      : parseInt(process.env["MUWNO_THROTTLE_TTL"]);
  }),

  /**
   * Arbitrary default limit within each TTL period
   */
  muwno_throttle_limit: createConfig(z.number().default(150), function () {
    return process.env["MUWNO_THROTTLE_LIMIT"] === undefined
      ? undefined
      : parseInt(process.env["MUWNO_THROTTLE_LIMIT"]);
  }),

  /**
   * whatch Telegram bot's token.
   */
  whatch_tele_bot_token: createConfig(z.string(), function () {
    return process.env["WHATCH_TELE_BOT_TOKEN"];
  }),
} as const;
