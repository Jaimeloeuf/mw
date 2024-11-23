/**
 * tApi (telegram API). This uses HTTP POST method and JSON body for sending
 * data by default.
 */
export const tApi = (
  /**
   * Unique bot token for this bot
   */
  botToken: string,

  /**
   * Telegram API method found on https://core.telegram.org/bots/api#available-methods
   */
  tApiMethod: string,

  /**
   * Request body for the API
   */
  body: object = {},
) =>
  fetch(`https://api.telegram.org/bot${botToken}/${tApiMethod}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).then((res) => res.json());
