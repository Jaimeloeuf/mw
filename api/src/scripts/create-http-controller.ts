import fs from "fs";
import path from "path";
import readline from "readline/promises";
import { logger } from "../logging/index.js";

const codeTemplate = `import { z } from "zod";
// TODO:
// Move this file into a app folder to fix the relative path import
import { httpController, useHttpRequestGuard } from "../../http/index.js";

export const blogNewSubscriberController = httpController({
  version: 1,
  method: "YOUR_HTTP_METHOD",
  path: "/YOUR_API_PATH",
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

  rl.close();

  const controllerFilePath = path.join(
    import.meta.dirname,
    `../controllers/${controllerName}.ts`
  );

  fs.writeFileSync(controllerFilePath, codeTemplate);

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
