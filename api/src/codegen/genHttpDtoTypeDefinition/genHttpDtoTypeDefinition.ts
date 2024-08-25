import fs from "fs/promises";
import path from "path";
import { logger } from "../../logging/index.js";
import { generatedSrcDirPath } from "../generatedSrcDirPath.js";
import { genAndSaveGeneratedCode } from "../genAndSaveGeneratedCode.js";
import type { ControllerFile } from "./ControllerFile.js";

/**
 * Generate all the HTTP API DTO type definitions using all the HTTP controllers
 * in the controllers/ folder, and export it to a big DTO file kind of like a
 * big GraphQL schema file.
 */
export async function genHttpDtoTypeDefinition() {
  const controllerFolderPath = path.join(
    import.meta.dirname,
    `../../controllers`
  );

  // Read all files in /controller/**
  const controllerFilesDirent = await fs.readdir(controllerFolderPath, {
    recursive: true,
    withFileTypes: true,
  });

  const controllerFiles = await Promise.all(
    controllerFilesDirent
      // Only keep valid .ts files
      .filter((file) => file.name.includes("ts") && file.name !== "index.ts")
      .map(async function (file) {
        const fullFilePath = path.resolve(file.parentPath, file.name);
        const fileContent = await fs.readFile(fullFilePath, {
          encoding: "utf8",
        });
        return {
          name: file.name,
          path: fullFilePath,
          httpRoute: fileContent.match(/path: "(.*)",/)?.[1],
          controllerName: fileContent.match(/export const (.*) =/)?.[1],
        };
      })
  );

  const typeDefinitions = controllerFiles
    // There may be certain files that are not actual controller files in
    // /controller/** like helper functions etc... filter these out.
    .filter(
      (file): file is ControllerFile =>
        file.httpRoute !== undefined && file.controllerName !== undefined
    )

    // Sort these files by the http route strings alphabetically
    .sort((a, b) =>
      // @todo if they are the same string but diff version, then should sort by version..?
      a.httpRoute > b.httpRoute ? 1 : b.httpRoute > a.httpRoute ? -1 : 0
    )

    // Generate the import and type definition statements, and combine them
    // into 2 different arrays.
    // @todo An advanced version would be to skip export if type resolves to `never`.
    .reduce((typeDefinitions, file) => {
      typeDefinitions.push(`export type ${file.controllerName}_QueryParams = z.infer<
  Exclude<(typeof c.${file.controllerName})["urlQueryParamsValidator"], null>
>;
export type ${file.controllerName}_InputDTO = z.infer<
  Exclude<(typeof c.${file.controllerName})["requestBodyValidator"], null>
>;
export type ${file.controllerName}_OutputDTO = Awaited<
  ReturnType<(typeof c.${file.controllerName})["httpRequestHandler"]>
>;`);
      return typeDefinitions;
    }, [] as Array<string>)

    // Join array of type definitions into a single string
    .join("");

  const generatedCode = `import type { z } from "zod";
import * as c from "./httpControllerBarrelFile.generated.js";

${typeDefinitions}
`;

  const generatedHttpDtoFilePath = path.join(
    generatedSrcDirPath,
    `httpDto.generated.ts`
  );

  await genAndSaveGeneratedCode(
    genHttpDtoTypeDefinition,
    generatedCode,
    generatedHttpDtoFilePath
  );

  logger.info(
    genHttpDtoTypeDefinition.name,
    `Generated HTTP DTO type definition file: ${generatedHttpDtoFilePath}`
  );
}
