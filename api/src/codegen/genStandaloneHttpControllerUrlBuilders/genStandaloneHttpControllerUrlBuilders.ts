import { capitalizeFirstLetter } from "../../utils/index.js";
import { genAndSaveGeneratedCode } from "../codegenForTs/index.js";
import { getHttpControllerFiles } from "../utils/index.js";
import { urlBuilderTemplate } from "./urlBuilderTemplate.js";

/**
 * This is a variation of the `genHttpControllerUrlBuilders` codegen step, which
 * does almost the same thing, but specifically generates URL builders for the
 * Next app to be independent modules which can be used by both Next client /
 * server components.
 *
 * ## Note on file location
 * The generated code are generated in the "next" folder instead of the usual
 * "__generated" folder, since it has to be placed together for next for the
 * next production build step.
 */
export async function genStandaloneHttpControllerUrlBuilders() {
  const controllerFiles = await getHttpControllerFiles();

  await genAndSaveGeneratedCode(
    genStandaloneHttpControllerUrlBuilders,
    `import type {
  RemoveMapKeyIfNever,
  VoidIfAllPropertiesInObjectIsVoid,
} from "../../../types/index.js";

export type UrlBuilderOptions<T> = VoidIfAllPropertiesInObjectIsVoid<
  RemoveMapKeyIfNever<T>
>;`,
    "../next/app/urlBuilders/UrlBuilderOptions",
  );

  await genAndSaveGeneratedCode(
    genStandaloneHttpControllerUrlBuilders,
    `export function createUrlQueryParamsString(
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
}`,
    "../next/app/urlBuilders/createUrlQueryParamsString",
  );

  const urlBuilderWrites = controllerFiles.map(async (controllerFile) => {
    const urlBuilderName = `urlBuilderFor${capitalizeFirstLetter(controllerFile.name)}`;

    await genAndSaveGeneratedCode(
      genStandaloneHttpControllerUrlBuilders,

      urlBuilderTemplate(controllerFile, urlBuilderName),

      // Unlike other generated files, this is generated in the "next" folder
      `../next/app/urlBuilders/${urlBuilderName}`,
    );
  });

  await Promise.all(urlBuilderWrites);
}
