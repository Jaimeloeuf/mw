import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForDoc } from "../../../../codegen-lib/index.js";

/**
 * Generate documentation for all the available scripts for the API server.
 */
export class GenScriptsDoc implements CogenieStep {
  getFiles() {
    return {
      scripts: {
        name: "Scripts",
        extension: codegenForDoc.generatedDocFileExtension,
      },
    } as const;
  }

  async generate() {
    const { default: packageJson } = await import(
      "../../../../../package.json",
      {
        assert: {
          type: "json",
        },
      }
    );

    const scriptCommands: Array<string> = [];
    const scriptsPrefix = "scripts:";

    for (const script in packageJson["scripts"]) {
      if (script.startsWith(scriptsPrefix)) {
        scriptCommands.push(script.slice(scriptsPrefix.length));
      }
    }

    const scripts = scriptCommands
      .map(
        (scriptCommand) =>
          `|${scriptCommand}|npm run ${scriptsPrefix}${scriptCommand}`,
      )
      .join("\n");

    const generatedDoc = `# Scripts
This documents all the available scripts [API server](../api/)


## Scripts
| Name | npm run command |
| - | - |
${scripts}`;

    await codegenForDoc.genAndSaveGeneratedDoc(
      GenScriptsDoc,
      generatedDoc,
      this.getFiles().scripts.name,
    );
  }
}
