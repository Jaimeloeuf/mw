import path from "path";

import { codegenForDoc } from "../../../../codegen-lib/index.js";
import { logger } from "../../../../logging/index.js";
import { getTypeofTypeAlias } from "./getTypeofTypeAlias.js";
import { serverConfigTemplate } from "./serverConfigTemplate.js";

/**
 * Generated documentation for all the available config values in API server.
 */
export async function genServerConfigDoc() {
  const configType = getTypeofTypeAlias(
    path.resolve(import.meta.dirname, "../../../../config/ConfigType.ts"),
    "ConfigType",
  );

  if (configType instanceof Error) {
    logger.error(
      `${genServerConfigDoc.name}:${getTypeofTypeAlias.name}`,
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

  const generatedCode = serverConfigTemplate(generatedConfigRows);

  await codegenForDoc.genAndSaveGeneratedDoc(
    genServerConfigDoc,
    generatedCode,
    "Server Configs",
  );
}
