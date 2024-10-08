import pc from "picocolors";

export function printCodegenCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run codegen"));
  console.log(pc.green("npm run codegen help"));
  console.log();
  console.log("See all available codegen modules");
  console.log(pc.green("npm run codegen list"));
  console.log();
  console.log("Validate that generated code is not manually modified");
  console.log(pc.green("npm run codegen validate"));
  console.log();
  console.log("Run all codegen modules");
  console.log(pc.green("npm run codegen all"));
  console.log();
  console.log(
    "Run a single codegen module, e.g. run the module genHttpRoutesTable",
  );
  console.log(pc.green("npm run codegen genHttpRoutesTable"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
