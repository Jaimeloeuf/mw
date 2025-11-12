import type { HttpControllerFile } from "../../utils/index.js";

const getVersionPrefix = (file: HttpControllerFile) =>
  file.version === '"neutral"' ? "" : "/v" + file.version;

export function urlBuilderTemplate(
  file: HttpControllerFile,
  urlBuilderName: string,
) {
  // "/".split("/") produces ['', ''], so need to filter these out first
  const pathParts = file.httpRoute
    .split("/")
    .filter((pathPart) => pathPart !== "");

  // Generate the path string using URL params passed into the URL builder
  let pathString = "";
  for (const pathPart of pathParts) {
    // If it is a non URL param path part, just add it back into the path string
    // as it is without any modifications.
    if (!pathPart.startsWith(":")) {
      pathString += `/${pathPart}`;
      continue;
    }

    const urlParam = pathPart.replace(":", "");
    pathString += `/\${options.urlParams.${urlParam}}`;
  }

  const controllerName = `${file.name}Controller`;

  const urlParamTypeSymbol = `${controllerName}_UrlParams`;
  const queryParamTypeSymbol = `${controllerName}_QueryParams`;
  const inputDTOTypeSymbol = `${controllerName}_InputDTO`;
  const outputDTOTypeSymbol = `${controllerName}_OutputDTO`;

  return `import type {
  ${urlParamTypeSymbol},
  ${queryParamTypeSymbol},
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";
import type { UrlBuilderOptions } from "./UrlBuilderOptions.generated.js";

import { createUrlQueryParamsString } from "./createUrlQueryParamsString.generated";

export type {
  ${inputDTOTypeSymbol},
  ${outputDTOTypeSymbol},
} from "../../../__generated/httpControllerTypeDefinitions.generated.js";

export const ${urlBuilderName} = (
  options: UrlBuilderOptions<{
    urlParams: ${urlParamTypeSymbol};
    urlQueryParams: ${queryParamTypeSymbol};
  }>,
) => \`\${process.env["BASE_URL_TO_SELF"]}/api${getVersionPrefix(file)}${pathString}\${createUrlQueryParamsString((options as any)?.urlQueryParams)}\`;
`;
}
