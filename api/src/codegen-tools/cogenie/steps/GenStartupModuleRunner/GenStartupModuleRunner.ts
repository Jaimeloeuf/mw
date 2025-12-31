import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getStartupFiles } from "../../utils/index.js";
import { StartupFile } from "../../utils/index.js";

/**
 * Generate a runner function to run all the startup modules concurrently.
 */
export class GenStartupModuleRunner implements CogenieStep {
  getFiles() {
    return {
      startupModulesRunner: {
        name: "startupModulesRunner",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const files = await getStartupFiles();

    const generatedCode = this.startupModuleRunnerTemplate(files);

    await codegenForTs.genAndSaveGeneratedCode(
      GenStartupModuleRunner,
      generatedCode,
      this.getFiles().startupModulesRunner,
    );
  }

  startupModuleRunnerTemplate = (
    files: Readonly<Array<StartupFile>>,
  ) => `import { logger } from "../../logging/index.js";
import { st } from "./startupModulesBarrelFile${codegenForTs.generatedCodeFileExtensionForJsImport}";

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
}
