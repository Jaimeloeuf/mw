import "../../global/bootstrapGlobalDefinitions.js";
import { printAllScaffoldrModules } from "./printAllScaffoldrModules.js";
import { printScaffoldrCliHelp } from "./printScaffoldrCliHelp.js";
import { runScaffoldrModule } from "./runScaffoldrModule.js";

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

  // List out all scaffoldr modules
  if (arg === "list") {
    await printAllScaffoldrModules();
    return;
  }

  await runScaffoldrModule(arg);
}

scaffoldrCli();
