import { ControllerFile } from "./ControllerFile.js";

const getVersionedRoute = (version: string | "neutral", route: string) =>
  version === '"neutral"' ? route : `/v${version}${route}`;

export const routeDefinitionTemplate = (file: ControllerFile): string =>
  `app["${file.httpMethod}" satisfies typeof ${file.controllerName}.method](
  "${getVersionedRoute(file.version, file.httpRoute)}" satisfies typeof ${file.controllerName}.path,
  ${file.controllerName}.routeHandler
);
`;
