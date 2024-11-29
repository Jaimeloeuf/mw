# api/src/infra/Telegram/Bots
All Telegram Bots are defined in this folder, look at any other bot for reference, and take a look at the base TelegramBot class for reference.


## Naming
Remember to name all bot classes with `.in.ts` so that it will be part of the infra namespace during codegen, for you to access it later with `infra.TelegramBotsMyBotName()`


## Bot addition/deletion
1. Once a new Bot is added or a Bot is deleted, re-run codegen with `npm run codegen all` to update the generated `infra` export namespace. The codegen step responsible for this is `genInfraBarrelFile`.
1. Register the bot's commands in `registerAllTelegramBotCommands.st.ts` startup module.
1. Register the bot's webhook in `registerAllTelegramBotWebhookUrls.st.ts` startup module.
1. Register the bot's webhook controller routing in `telegram.ct.ts` HTTP controller file.