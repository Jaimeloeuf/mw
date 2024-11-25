import { z } from "zod";

/**
 * Zod schema for all the data fields we care about from a telegram webhook call
 */
export const telegramWebhookDataSchema = z.object({
  update_id: z.number(),
  message: z.object({
    message_id: z.number(),

    /**
     * https://core.telegram.org/bots/api#user
     */
    from: z.object({
      /**
       * This is the same as `message.chat.id`
       */
      id: z.number(),
      first_name: z.string(),
      username: z.string(),
    }),

    /**
     * https://core.telegram.org/bots/api#chat
     */
    chat: z.object({
      /**
       * This is the same as `message.from.id`
       */
      id: z.number(),
      first_name: z.string(),
      username: z.string(),

      /**
       * Should be "private" for private messages
       */
      type: z.string(),
    }),

    /**
     * The actual text message as a UTF-8 string
     */
    text: z.string(),

    /**
     * https://core.telegram.org/bots/api#messageentity
     */
    entities: z
      .array(
        z.object({
          offset: z.number(),
          length: z.number(),

          /**
           * Entity type, e.g. "bot_command" for a /command in text
           */
          type: z.string(),
        }),
      )
      .optional(),
  }),
});

export type TelegramWebhookData = z.infer<typeof telegramWebhookDataSchema>;
