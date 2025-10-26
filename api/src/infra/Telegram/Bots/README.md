# api/src/infra/Telegram/Bots
All Telegram Bots are defined in this folder, look at any other bot for reference, and take a look at the base TelegramBot class for reference.


## Naming
Remember to name all bot classes with `.in.ts` so that it will be part of the infra namespace during codegen, for you to access it later with `infra.TelegramBotsMyBotName()`


## Bot addition/deletion
1. Once a new Bot is added or a Bot is deleted, re-run codegen with `npm run codegen:cogenie all` to update the generated `infra` export namespace. The codegen step responsible for this is `genInfraBarrelFile`.
1. Register the bot in [`allBotLoaders.ts`](./allBotLoaders.ts).


## Development
Remember to temporarily remove the production only blocker in [`setupTelegramBots`](../../../startup/telegram/setupTelegramBots.st.ts) in order to test your bot's webhook and commands.