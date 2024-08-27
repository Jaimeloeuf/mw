import path from "path";
import { logger } from "../../logging/index.js";
import { generatedSrcDirPath } from "../generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "../genAndSaveGeneratedCode.js";
import { getControllerFiles } from "../utils/getControllerFiles/getControllerFiles.js";

/**
 * Generate all the HTTP API DTO type definitions using all the HTTP controllers
 * in the controllers/ folder, and export it to a big DTO file kind of like a
 * big GraphQL schema file.
 */
export async function genHttpDtoTypeDefinition() {
  const controllerFiles = await getControllerFiles();

  // @todo An advanced version would be to skip export if type resolves to `never`.
  const typeDefinitions = controllerFiles
    .map(
      (file) => `export type ${file.controllerName}_QueryParams = z.infer<
  Exclude<(typeof c.${file.controllerName})["urlQueryParamsValidator"], null>
>;
export type ${file.controllerName}_InputDTO = z.infer<
  Exclude<(typeof c.${file.controllerName})["requestBodyValidator"], null>
>;
export type ${file.controllerName}_OutputDTO = Awaited<
  ReturnType<(typeof c.${file.controllerName})["httpRequestHandler"]>
>;`,
    )

    .join("");

  const generatedCode = `import type { z } from "zod";
import * as c from "./httpControllerBarrelFile.generated.js";

${typeDefinitions}
`;

  const generatedHttpDtoFilePath = path.join(
    generatedSrcDirPath,
    `httpDto.generated.ts`,
  );

  await genAndSaveGeneratedCode(
    genHttpDtoTypeDefinition,
    generatedCode,
    generatedHttpDtoFilePath,
  );

  logger.info(
    genHttpDtoTypeDefinition.name,
    `Generated HTTP DTO type definition file: ${generatedHttpDtoFilePath}`,
  );
}
