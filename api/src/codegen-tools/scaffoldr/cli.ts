import "../../global/bootstrapGlobalDefinitions.js";
import { logger } from "../../logging/index.js";
// import { runScaffoldrModule } from "./runScaffoldrModule.js";
import { printAllScaffoldrModules } from "./printAllScaffoldrModules.js";
import { printScaffoldrCliHelp } from "./printScaffoldrCliHelp.js";

async function scaffoldrCli() {
  // No extra arguments, show help menu
  if (process.argv.length === 2) {
    printScaffoldrCliHelp();
    return;
  }

  const arg = process.argv.at(-1) ?? "";

  // Help menu
  if (arg === "help") {
    printScaffoldrCliHelp();
    return;
  }

  // List out all cogenie steps
  if (arg === "list") {
    await printAllScaffoldrModules();
    return;
  }

  // await runScaffoldrModule(arg);

  logger.error(scaffoldrCli.name, `Invalid cogenie argument: ${arg}\n`);
  printScaffoldrCliHelp();
}

scaffoldrCli();
