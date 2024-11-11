import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../codegenForTs/index.js";
import { getHttpControllerFiles } from "../utils/index.js";

/**
 * Generate type definitions from all the HTTP controllers in the controllers/
 * folder, and export it to file kind of like a big GraphQL schema file.
 */
export async function genHttpControllerTypeDefinitions() {
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
import * as c from "./httpControllerBarrelFile${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";

${typeDefinitions}
`;

  await genAndSaveGeneratedCode(
    genHttpControllerTypeDefinitions,
    generatedCode,
    "httpControllerTypeDefinitions",
  );
}
