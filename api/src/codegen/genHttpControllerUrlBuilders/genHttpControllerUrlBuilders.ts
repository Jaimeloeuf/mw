import {
  genAndSaveGeneratedCode,
  generatedCodeFileExtensionForJsImport,
  generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport,
} from "../codegenForTs/index.js";
import { getHttpControllerFiles } from "../utils/index.js";
import { urlBuilderTemplate } from "./urlBuilderTemplate.js";

/**
 * Generate a list of UrlBuilder functions for every single HTTP Controller, so
 * that URLs can be built in a type safe way internally.
 */
export async function genHttpControllerUrlBuilders() {
  const controllerFiles = await getHttpControllerFiles();

  const urlBuilders = controllerFiles.map(urlBuilderTemplate).join("");

  const generatedCode = `import type {
  RemoveMapKeyIfNever,
  VoidIfAllPropertiesInObjectIsVoid,
} from "../types/index.js";
import { config } from "../config/index.js";
import type * as t from "./httpControllerTypeDefinitions${generatedCodeFileExtensionForJsImport}";

type UrlBuilderOptions<T> = VoidIfAllPropertiesInObjectIsVoid<
  RemoveMapKeyIfNever<T>
>;

function createUrlQueryParamsString(
  urlQueryParams: undefined | null | Record<string, any>,
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

  const httpControllerUrlBuildersFileName = "httpControllerUrlBuilders";

  await genAndSaveGeneratedCode(
    genHttpControllerUrlBuilders,
    generatedCode,
    httpControllerUrlBuildersFileName,

    // Do not re-export this in the barrel file, as we want users to access all
    // the URL Builder functions via the `urlBuilder` symbol as defined below.
    { doNotIncludeInGeneratedFolderBarrelFile: true },
  );

  await genAndSaveGeneratedCode(
    genHttpControllerUrlBuilders,
    `export * as urlBuilder from "./${httpControllerUrlBuildersFileName}${generatedCodeFileExtensionWithNoBarrelFileInclusionForJsImport}"`,
    "urlBuilderBarrelFile",
  );
}
