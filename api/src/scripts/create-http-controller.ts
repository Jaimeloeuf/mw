import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { logger } from "../logging/index.js";

const codeTemplate = (
  controllerName: string,
  httpMethod: string,
  apiPath: string
) => `import { z } from "zod";
// TODO:
// Move this file into a app folder to fix the relative path import
import { httpController, useHttpRequestGuard } from "../../http/index.js";

export const ${controllerName} = httpController({
  version: 1,
  method: "${httpMethod}",
  path: "${apiPath}",
  guards: [/* Your request guards, replace array with null if none */],
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    data: z.string(),
  }),
  async httpRequestHandler({ requestBody }) {
    requestBody;
  },
});

// TODO:
// Remember to run "npm run codegen all" to generate routes->controller mapping
// once you have updated everything in the controller definition to use this.
`;

async function createHttpController() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const controllerName = await rl.question(`Controller name in camelCase: `);

  const allowedHttpMethods = ["get", "post", "put", "patch", "delete", "all"];
  const httpMethod = await rl.question(
    `Express HTTP Method (${allowedHttpMethods.join(", ")}): `
  );

  const apiPath = await rl.question(`API url path (include starting /): `);

  rl.close();

  const controllerFilePath = path.join(
    import.meta.dirname,
    `../controllers/${controllerName}.ts`
  );

  fs.writeFileSync(
    controllerFilePath,
    codeTemplate(controllerName, httpMethod, apiPath)
  );

  logger.info(
    createHttpController.name,
    `Created controller file: ${controllerFilePath}`
  );
  logger.info(
    createHttpController.name,
    `Please update the controller file details and run "npm run codegen all" to update the generated files`
  );
}

createHttpController();
