import { generatedCodeFileExtensionForJsImport } from "../../codegen-lib/codegenForTs/index.js";
import { StartupFile } from "../utils/index.js";

export const startupModuleRunnerTemplate = (
  files: Readonly<Array<StartupFile>>,
) => `import { logger } from "../logging/index.js";
import { st } from "./startupModulesBarrelFile${generatedCodeFileExtensionForJsImport}";

/**
 * Runner function that runs all the startup modules concurrently, and stops the
 * process if any of them fails.
 */
export async function startupModuleRunner() {
  try {
    logger.info(startupModuleRunner.name, "Running (${files.length}) Startup Modules");

    await Promise.all([
      ${files.map((file) => `logBeforeRun(st.${file.name})()`)}
    ]);
  } catch (e) {
    const error = $convertUnknownCatchToError(e);

    logger.error(
      startupModuleRunner.name,
      "Failed while running Startup Module",
      error,
    );

    // Stop the entire process as this should not continue unless all startup
    // modules completed successfully.
    process.exit(1);
  }
}

const logBeforeRun = (fn: () => any) =>
  async function () {
    logger.verbose(\`\${startupModuleRunner.name}:\${fn.name}\`, "Start");
    await fn();
    logger.verbose(\`\${startupModuleRunner.name}:\${fn.name}\`, "Completed");
  };
`;
