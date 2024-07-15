import { sf } from "simpler-fetch";

export const ProdTelegramBotFF = (telegramBotToken: string) =>
  async function (
    recipientTelegramChatID: string,

    /**
     * Notification message. This supports HTML formatting
     */
    message: string
  ) {
    // Simple wrapper to call the sendMessage API using HTML for formmating
    // instead of MarkdownV2 due to the restrictions in place for parsing
    // markdown text. Especially when trying to send user input directly to
    // telegram API, it may crash as user may use special reserved characters
    // and cause server the crash. Thus the fix to this is just use HTML
    // formatting instead. See links below for reference on this issue.
    // https://core.telegram.org/bots/api#markdownv2-style
    // https://stackoverflow.com/questions/62600596/why-is-a-reserved-character-in-markdownv2-in-telegrams-bot-api
    // https://github.com/telegraf/telegraf/issues/1242
    const { err, res } = await sf
      .useOnce(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`)
      .POST()
      .bodyJSON({
        chat_id: recipientTelegramChatID,
        text: message,
        parse_mode: "HTML",
      })
      .runJSON();

    if (err !== undefined) {
      return err as Error;
    }

    if (!res.ok) {
      return new Error(
        `Telegram message failed to send: ${JSON.stringify(res.data, null, 2)}`
      );
    }

    return true;
  };
