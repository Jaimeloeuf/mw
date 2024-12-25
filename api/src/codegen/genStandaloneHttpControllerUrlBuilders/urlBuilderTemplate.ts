import { config } from "../../config/index.js";
import { HttpControllerFile } from "../utils/index.js";

// Need to generate at build time so it doesnt need to be bundled with the Next stuff
const apiBaseUrl = config.base_url_to_self();

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
    // If it is a non URL param path part, just add it back into the path string
    // as it is without any modifications.
    if (!pathPart.startsWith(":")) {
      pathString += `/${pathPart}`;
      continue;
    }

    const urlParam = pathPart.replace(":", "");
    pathString += `/\${options.urlParams.${urlParam}}`;
  }

  const controllerName = `${file.name}Controller`;

  return `import type * as t from "../../../__generated/httpControllerTypeDefinitions.generated.js";
import type { UrlBuilderOptions } from "./UrlBuilderOptions.generated.js";

import { createUrlQueryParamsString } from "./createUrlQueryParamsString.generated";

export const ${urlBuilderName} = (
  options: UrlBuilderOptions<{
    urlParams: t.${controllerName}_UrlParams;
    urlQueryParams: t.${controllerName}_QueryParams;
  }>,
) => \`${apiBaseUrl}/api${getVersionPrefix(file)}${pathString}\${createUrlQueryParamsString((options as any)?.urlQueryParams)}\`;
`;
}
