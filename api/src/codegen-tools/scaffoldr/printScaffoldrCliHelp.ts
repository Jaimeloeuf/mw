import pc from "picocolors";

export function printScaffoldrCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run codegen:scaffoldr"));
  console.log(pc.green("npm run codegen:scaffoldr help"));
  console.log();
  console.log("See all available scaffoldr modules");
  console.log(pc.green("npm run codegen:scaffoldr list"));
  console.log();
  console.log("Run a scaffoldr module, e.g. run the HttpController scaffoldr");
  console.log(pc.green("npm run codegen:scaffoldr HttpController"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
