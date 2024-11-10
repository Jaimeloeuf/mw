import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusion,
} from "../codegenForTs/index.js";
import { getHttpControllerFiles } from "../utils/index.js";

/**
 * Generate all the HTTP API DTO type definitions using all the HTTP controllers
 * in the controllers/ folder, and export it to a big DTO file kind of like a
 * big GraphQL schema file.
 */
export async function genHttpDtoTypeDefinition() {
  const controllerFiles = await getHttpControllerFiles();

  // @todo An advanced version would be to skip export if type resolves to `never`.
  const typeDefinitions = controllerFiles
    .map(
      (file) => `export type ${file.name}Controller_QueryParams = z.infer<
  Exclude<(typeof c.${file.name})["urlQueryParamsValidator"], null>
>;
export type ${file.name}Controller_InputDTO = z.infer<
  Exclude<(typeof c.${file.name})["requestBodyValidator"], null>
>;
export type ${file.name}Controller_OutputDTO = Awaited<
  ReturnType<(typeof c.${file.name})["httpRequestHandler"]>
>;`,
    )

    .join("");

  const generatedCode = `import type { z } from "zod";
import * as c from "./httpControllerBarrelFile${generatedCodeFileExtensionWithNoBarrelFileInclusion.replace(".ts", ".js")}";

${typeDefinitions}
`;

  await genAndSaveGeneratedCode(
    genHttpDtoTypeDefinition,
    generatedCode,
    "httpDto",
  );
}
