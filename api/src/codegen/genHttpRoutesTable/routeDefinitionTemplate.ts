import { HttpControllerFile } from "../utils/getHttpControllerFiles/HttpControllerFile.js";

const getVersionPathPrefix = (file: HttpControllerFile) =>
  file.version === '"neutral"'
    ? ""
    : `("/v${file.version}" satisfies typeof c.${file.controllerName}.version) + `;

export const routeDefinitionTemplate = (file: HttpControllerFile): string =>
  `
// ${file.httpMethod.toUpperCase()} /api${file.version === '"neutral"' ? "" : "/v" + file.version}${file.httpRoute}
r["${file.httpMethod}" satisfies typeof c.${file.controllerName}.method](
  ${getVersionPathPrefix(file)}
  ("${file.httpRoute}" satisfies typeof c.${file.controllerName}.path),
  c.${file.controllerName}.routeHandler
);
`;
