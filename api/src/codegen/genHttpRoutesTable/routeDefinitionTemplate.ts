import { ControllerFile } from "../utils/getControllerFiles/ControllerFile.js";

const getVersionPathPrefix = (file: ControllerFile) =>
  file.version === '"neutral"'
    ? ""
    : `("/v${file.version}" satisfies typeof c.${file.controllerName}.version) + `;

/** Generate a comment describing this HTTP API method and path */
const getApiComment = (file: ControllerFile): string =>
  `// ${file.httpMethod.toUpperCase()} /api${
    file.version === '"neutral"' ? "" : "/v" + file.version
  }${file.httpRoute}`;

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `
${getApiComment(file)}
r["${file.httpMethod}" satisfies typeof c.${file.controllerName}.method](
  ${getVersionPathPrefix(file)}
  ("${file.httpRoute}" satisfies typeof c.${file.controllerName}.path),
  c.${file.controllerName}.routeHandler
);
`;
