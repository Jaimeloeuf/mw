import path from "path";

import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForDoc } from "../../../../codegen-lib/index.js";
import { logger } from "../../../../logging/index.js";
import { getTypeofTypeAlias } from "../../../../utils/getTypeofTypeAlias.js";

/**
 * Generated documentation for all the available config values in API server.
 */
export class GenServerConfigDoc implements CogenieStep {
  getFiles() {
    return {
      serverConfigs: {
        name: "Server Configs",
        extension: ".md",
      },
    } as const;
  }

  async generate() {
    const configType = getTypeofTypeAlias(
      path.resolve(import.meta.dirname, "../../../../config/ConfigType.ts"),
      "ConfigType",
    );

    if (configType instanceof Error) {
      logger.error(
        `${GenServerConfigDoc.name}:${getTypeofTypeAlias.name}`,
        configType,
      );
      return;
    }

    const generatedConfigRows = configType
      .map(
        ({ name, type }) =>
          `${name}|${type.replaceAll("|", "\\|").replaceAll("<", "\\<").replaceAll(">", "\\>")}|`,
      )
      .join("\n");

    const generatedCode = `# Server Config
This documents all the available config values for [API server](../api/)


## Configs
| Config value | TS Type |
| - | - |
${generatedConfigRows}`;

    await codegenForDoc.genAndSaveGeneratedDoc(
      GenServerConfigDoc,
      generatedCode,
      this.getFiles().serverConfigs.name,
    );
  }
}
