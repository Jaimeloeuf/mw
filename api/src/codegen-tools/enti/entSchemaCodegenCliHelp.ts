import pc from "picocolors";

export function entSchemaCodegenCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run scripts:enti"));
  console.log(pc.green("npm run scripts:enti help"));
  console.log();
  console.log("See all available scripts:enti modules");
  console.log(pc.green("npm run scripts:enti list"));
  console.log();
  console.log("Validate that generated code is not manually modified");
  console.log(pc.green("npm run scripts:enti validate"));
  console.log();
  console.log("Run all scripts:enti modules");
  console.log(pc.green("npm run scripts:enti all"));
  console.log();
  console.log(
    "Run a single scripts:enti module, e.g. run the module genHttpRoutesTable",
  );
  console.log(pc.green("npm run scripts:enti genHttpRoutesTable"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
