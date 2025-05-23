import { capitalizeFirstLetter } from "../../utils/index.js";
import { HttpControllerFile } from "../utils/index.js";

const getVersionPrefix = (file: HttpControllerFile) =>
  file.version === '"neutral"' ? "" : "/v" + file.version;

export function urlBuilderTemplate(file: HttpControllerFile) {
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

  return `export const for${capitalizeFirstLetter(file.name)} = (
  options: UrlBuilderOptions<{
    urlParams: t.${controllerName}_UrlParams;
    urlQueryParams: t.${controllerName}_QueryParams;
  }>,
) => \`\${config.base_url_to_self()}/api${getVersionPrefix(file)}${pathString}\${createUrlQueryParamsString((options as any)?.urlQueryParams)}\`;

`;
}
