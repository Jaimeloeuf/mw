import { z } from "zod";

import { infra } from "../../__generated/index.js";
import { config } from "../../config/index.js";
import { NotFoundException } from "../../exceptions/index.js";
import { httpController } from "../../http/index.js";
import { telegramWebhookDataSchema } from "../../infra/index.js";

export default httpController({
  version: 1,
  method: "post",
  path: "/webhook/telegram/:telegramWebhookSecretPath/:telegramBotToken",
  guards: null,
  urlParamsValidator: z.object({
    telegramWebhookSecretPath: z.string(),
    telegramBotToken: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: telegramWebhookDataSchema,
  doNotModifyResponseData: true,
  async httpRequestHandler({ urlParams, requestBody }) {
    // Ensure that the caller knows the webhook secret path token
    if (
      urlParams.telegramWebhookSecretPath !== config.tele_webhook_secret_path()
    ) {
      throw new NotFoundException("API Route not found");
    }

    const bot = await infra.TelegramGetBotWithToken(urlParams.telegramBotToken);

    // If the bot token is not valid (no bot found for this token), treat it as
    // a invalid API route.
    if (bot === undefined) {
      throw new NotFoundException("API Route not found");
    }

    // Send telegram webhook 'Update' object for TelegramBot to handle
    return bot.onUpdate(requestBody);
  },
});
