import pc from "picocolors";

export function entSchemaCodegenCliHelp() {
  /* eslint-disable no-console */
  console.log("See help menu");
  console.log(pc.green("npm run codegen:enti"));
  console.log(pc.green("npm run codegen:enti help"));
  console.log();
  console.log("See all available EntSchemas");
  console.log(pc.green("npm run codegen:enti list"));
  console.log();
  console.log("Validate EntSchemas");
  console.log(pc.green("npm run codegen:enti validate"));
  console.log();
  console.log("Generate all EntSchema artifacts");
  console.log(pc.green("npm run codegen:enti all"));
  console.log();
  console.log("Generate a single EntSchema artifact");
  console.log(pc.green("npm run codegen:enti EntJohariSchema"));
  console.log();
  console.log(`For more details, see implementation: ${import.meta.dirname}`);
  /* eslint-enable no-console */
}
