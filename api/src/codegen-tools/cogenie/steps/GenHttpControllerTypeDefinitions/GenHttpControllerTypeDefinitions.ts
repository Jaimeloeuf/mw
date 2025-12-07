import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getHttpControllerFiles } from "../../utils/index.js";

/**
 * Generate type definitions from all the HTTP controllers in the controllers/
 * folder, and export it to file kind of like a big GraphQL schema file.
 */
export class GenHttpControllerTypeDefinitions implements CogenieStep {
  getFiles() {
    return {
      httpControllerTypeDefinitions: {
        name: "httpControllerTypeDefinitions",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      httpControllerTypeDefinitionBarrelFile: {
        name: "httpControllerTypeDefinitionBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const controllerFiles = await getHttpControllerFiles();

    // @todo An advanced version would be to skip export if type resolves to `never`.
    const typeDefinitions = controllerFiles
      .map(
        (file) => `export type ${file.name}Controller_UrlParams = z.infer<
  NonNullable<(typeof c.${file.name})["urlParamsValidator"]>
>;
export type ${file.name}Controller_QueryParams = z.infer<
  NonNullable<(typeof c.${file.name})["urlQueryParamsValidator"]>
>;
export type ${file.name}Controller_InputDTO = z.infer<
  NonNullable<(typeof c.${file.name})["requestBodyValidator"]>
>;
export type ${file.name}Controller_OutputDTO = Awaited<
  ReturnType<(typeof c.${file.name})["httpRequestHandler"]>
>;
export type ${file.name}Controller_OutputFullDTO =
  JSendSuccess<${file.name}Controller_OutputDTO>;`,
      )
      .join("\n");

    const generatedCode = `import type { z } from "zod";
import type { JSendSuccess } from "../http/JSend.js";
import type { httpControllers as c } from "./httpControllerBarrelFile${codegenForTs.generatedCodeFileExtensionForJsImport}";

${typeDefinitions}
`;

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerTypeDefinitions,
      generatedCode,
      this.getFiles().httpControllerTypeDefinitions,
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerTypeDefinitions,
      `export * as httpControllerTypeDefinitions from "./${this.getFiles().httpControllerTypeDefinitions.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().httpControllerTypeDefinitionBarrelFile,
    );
  }
}
