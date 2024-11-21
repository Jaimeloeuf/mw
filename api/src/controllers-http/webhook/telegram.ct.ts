import { z } from "zod";

import { config } from "../../config/index.js";
import { NotFoundException } from "../../exceptions/index.js";
import { httpController } from "../../http/index.js";
import { logger } from "../../logging/index.js";
import { HttpStatusCode } from "../../types/index.js";

export default httpController({
  version: 1,
  method: "get",
  path: "/webhook/telegram/:telegramWebhookSecretPath/:telegramBotToken",
  guards: null,
  urlParamsValidator: z.object({
    telegramWebhookSecretPath: z.string(),
    telegramBotToken: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: z.any(),
  async httpRequestHandler({ urlParams, requestBody, setHttpStatusCode }) {
    // Ensure that the caller knows the webhook secret path token
    if (
      urlParams.telegramWebhookSecretPath !== config.tele_webhook_secret_path
    ) {
      throw new NotFoundException("API Route not found");
    }

    // Validate if it is a Bot we own, and call its own service to handle things.
    urlParams.telegramBotToken;

    logger.verbose("Telegram Webhook Controller", requestBody);

    setHttpStatusCode(HttpStatusCode.Ok_200);
  },
});
