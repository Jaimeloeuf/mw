import { urlBuilder } from "../../__generated/index.js";
import { config } from "../../config/index.js";
import { ServiceException } from "../../exceptions/index.js";
import { logger } from "../../logging/index.js";
import { tApi } from "./tApi.js";

export async function registerTelegramWebhookUrl(
  botName: string,
  botToken: string,
) {
  // Following telegram's recommendations to use bot token as path
  const urlObject = new URL(
    urlBuilder.forWebhookTelegram({
      urlParams: {
        telegramWebhookSecretPath: config.tele_webhook_secret_path(),
        telegramBotToken: botToken,
      },
    }),
  );

  // Must be https scheme as specified in telegram bot API docs
  if (urlObject.protocol !== "https:") {
    throw new ServiceException(
      "Only HTTPS URLs are allowed for telegram bot webhooks",
    );
  }

  const setWebhookResponse = await tApi(botToken, "setWebhook", {
    url: urlObject.toString(),
  });

  if (!setWebhookResponse.ok) {
    throw new ServiceException(setWebhookResponse?.description);
  }

  logger.info(
    registerTelegramWebhookUrl.name,
    `Successfully registered telegram webhook URL for ${botName} to: ${urlObject.toString()}`,
  );
}
