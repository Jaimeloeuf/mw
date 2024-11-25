import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { config } from "../../config/index.js";
import { NotFoundException } from "../../exceptions/index.js";
import { httpController } from "../../http/index.js";
import { telegramWebhookDataSchema } from "../../infra-shared/index.js";

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
      urlParams.telegramWebhookSecretPath !== config.tele_webhook_secret_path
    ) {
      throw new NotFoundException("API Route not found");
    }

    // Validate if it is a Bot we own, and call/route to its own service to
    // handle the request. 404 if it isnt a valid bot managed by us.
    switch (urlParams.telegramBotToken) {
      case config.tele_adminbot_token: {
        return sv.mwTelegramWebhook(requestBody);
      }

      case config.muwno_tele_bot_token: {
        return sv.muwnoTelegramWebhook(requestBody);
      }

      case config.whatch_tele_bot_token: {
        return sv.whatchTelegramWebhook(requestBody);
      }

      // If the bot token is not valid
      default: {
        throw new NotFoundException("API Route not found");
      }
    }
  },
});
