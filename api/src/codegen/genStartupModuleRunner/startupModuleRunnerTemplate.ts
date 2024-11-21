import { generatedCodeFileExtensionForJsImport } from "../codegenForTs/index.js";
import { StartupFile } from "../utils/index.js";

export const startupModuleRunnerTemplate = (
  files: Readonly<Array<StartupFile>>,
) => `import { logger } from "../logging/index.js";
import { unknownCatchToError } from "../utils/index.js";
import { st } from "./startupModulesBarrelFile${generatedCodeFileExtensionForJsImport}";

/**
 * Runner function that runs all the startup modules concurrently, and stops the
 * process if any of them fails.
 */
export async function startupModuleRunner() {
  try {
    await Promise.all([
      ${files.map((file) => `st.${file.name}(),\n`)}
    ]);
  } catch (e) {
    const error = unknownCatchToError(e);

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
`;
