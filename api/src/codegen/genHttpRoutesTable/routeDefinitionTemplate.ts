import { HttpControllerFile } from "../utils/index.js";

const getVersionPathPrefix = (file: HttpControllerFile) =>
  file.version === '"neutral"'
    ? ""
    : `("/v${file.version}" satisfies typeof c.${file.name}.version) + `;

export const routeDefinitionTemplate = (file: HttpControllerFile): string =>
  `
// ${file.httpMethod.toUpperCase()} /api${file.version === '"neutral"' ? "" : "/v" + file.version}${file.httpRoute}
r["${file.httpMethod}" satisfies typeof c.${file.name}.method](
  ${getVersionPathPrefix(file)}
  ("${file.httpRoute}" satisfies typeof c.${file.name}.path),
  c.${file.name}.routeHandler
);
`;
