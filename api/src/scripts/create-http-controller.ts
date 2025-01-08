import fs from "fs";
import path from "path";
import pc from "picocolors";
import readline from "readline/promises";

import { logger } from "../logging/index.js";

const codeTemplate = (
  httpMethod: string,
  apiPath: string,
) => `import { z } from "zod";
import { httpController, useHttpRequestGuard } from "../http/index.js";

export default httpController({
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
  if (!new RegExp(/^[a-z][A-Za-z0-9]*$/g).test(controllerName)) {
    logger.error(
      createHttpController.name,
      `Controller name must be camelCase.`,
    );
    rl.close();
    return;
  }

  const allowedHttpMethods = ["get", "post", "put", "patch", "delete", "all"];
  const httpMethod = await rl.question(
    `Express HTTP Method (${allowedHttpMethods.join(", ")}): `,
  );
  if (!allowedHttpMethods.includes(httpMethod)) {
    logger.error(
      createHttpController.name,
      `HTTP Method must be one of the allowed values`,
    );
    rl.close();
    return;
  }

  const apiPath = await rl.question(`API url path (include starting /): `);
  if (!apiPath.startsWith("/")) {
    logger.error(createHttpController.name, `API path must start with /`);
    rl.close();
    return;
  }

  rl.close();

  const controllerFilePath = path.join(
    import.meta.dirname,
    `../controllers-http/${controllerName}.ct.ts`,
  );

  const generatedCode = codeTemplate(httpMethod, apiPath);
  fs.writeFileSync(controllerFilePath, generatedCode);

  logger.info(
    createHttpController.name,
    `Created controller file: ${controllerFilePath}`,
  );
  logger.info(
    createHttpController.name,
    `Please update the controller file details and run "npm run codegen all" to update the generated files`,
  );
  logger.info(createHttpController.name, `You can also copy the printed code.`);

  // Print out the generated code template without any additional formatting.
  /* eslint-disable no-console */
  console.log(
    "\nFile has been generated but you can copy the output code too\n",
  );
  console.log(pc.green(generatedCode));
  /* eslint-enable no-console */
}

createHttpController();
