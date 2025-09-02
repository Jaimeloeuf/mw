import pc from "picocolors";

export function entSchemaCodegenCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run scripts:entschema-codegen"));
  console.log(pc.green("npm run scripts:entschema-codegen help"));
  console.log();
  console.log("See all available scripts:entschema-codegen modules");
  console.log(pc.green("npm run scripts:entschema-codegen list"));
  console.log();
  console.log("Validate that generated code is not manually modified");
  console.log(pc.green("npm run scripts:entschema-codegen validate"));
  console.log();
  console.log("Run all scripts:entschema-codegen modules");
  console.log(pc.green("npm run scripts:entschema-codegen all"));
  console.log();
  console.log(
    "Run a single scripts:entschema-codegen module, e.g. run the module genHttpRoutesTable",
  );
  console.log(pc.green("npm run scripts:entschema-codegen genHttpRoutesTable"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
