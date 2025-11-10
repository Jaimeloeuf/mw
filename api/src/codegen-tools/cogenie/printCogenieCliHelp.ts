import pc from "picocolors";

export function printCogenieCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run codegen:cogenie"));
  console.log(pc.green("npm run codegen:cogenie help"));
  console.log();
  console.log("See all available codegen modules");
  console.log(pc.green("npm run codegen:cogenie list"));
  console.log();
  console.log("Validate that generated code is not manually modified");
  console.log(pc.green("npm run codegen:cogenie validate"));
  console.log();
  console.log("Run all codegen modules");
  console.log(pc.green("npm run codegen:cogenie all"));
  console.log();
  console.log(
    "Run a single cogenie step, e.g. run the step GenHttpRoutesTable",
  );
  console.log(pc.green("npm run codegen:cogenie GenHttpRoutesTable"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
