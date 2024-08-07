import { ControllerFile } from "./ControllerFile.js";

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `app["${file.httpMethod}" satisfies typeof ${file.controllerName}.method](
  "${file.httpRoute}" satisfies typeof ${file.controllerName}.path,
  ${file.controllerName}.routeHandler
);
`;
