import type { CogenieStep } from "../../CogenieStep.js";

import { codegenForTs } from "../../../../codegen-lib/index.js";
import { getHttpControllerFiles } from "../../utils/index.js";
import { urlBuilderTemplate } from "./urlBuilderTemplate.js";

/**
 * Generate a list of UrlBuilder functions for every single HTTP Controller, so
 * that URLs can be built in a type safe way internally.
 */
export class GenHttpControllerUrlBuilders implements CogenieStep {
  getFiles() {
    return {
      httpControllerUrlBuilders: {
        name: "httpControllerUrlBuilders",
        extension:
          codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusion,
      },
      urlBuilderBarrelFile: {
        name: "urlBuilderBarrelFile",
        extension: codegenForTs.generatedCodeFileExtension,
      },
    } as const;
  }

  async generate() {
    const controllerFiles = await getHttpControllerFiles();

    const urlBuilders = controllerFiles.map(urlBuilderTemplate).join("\n");

    const generatedCode = `import type {
  RemoveMapKeyIfNever,
  VoidIfAllPropertiesInObjectIsVoid,
} from "../types/index.js";
import { config } from "../config/index.js";
import type * as t from "./httpControllerTypeDefinitions${codegenForTs.generatedCodeFileExtensionForJsImport}";

type UrlBuilderOptions<T> = VoidIfAllPropertiesInObjectIsVoid<
  RemoveMapKeyIfNever<T>
>;

function createUrlQueryParamsString(
  urlQueryParams: $NullableAndOptional<Record<string, any>>,
) {
  if (urlQueryParams == null) {
    return "";
  }

  const queryParams = new URLSearchParams();

  for (const [k, v] of Object.entries(urlQueryParams)) {
    queryParams.append(k, v?.toString() as string);
  }

  return "?" + queryParams.toString();
}

${urlBuilders}
`;

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerUrlBuilders,
      generatedCode,
      this.getFiles().httpControllerUrlBuilders.name,

      // Do not re-export this in the barrel file, as we want users to access all
      // the URL Builder functions via the `urlBuilder` symbol as defined below.
      { doNotIncludeInGeneratedFolderBarrelFile: true },
    );

    await codegenForTs.genAndSaveGeneratedCode(
      GenHttpControllerUrlBuilders,
      `export * as urlBuilder from "./${this.getFiles().httpControllerUrlBuilders.name}${codegenForTs.generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}";\n`,
      this.getFiles().urlBuilderBarrelFile.name,
    );
  }
}
