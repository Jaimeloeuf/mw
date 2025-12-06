import fs from "fs";
import path from "path";

import { logger } from "../../../../logging/index.js";
import { Scaffoldr } from "../../Scaffoldr.js";

const allowedHttpMethods = ["get", "post", "put", "patch", "delete", "all"];

export default Scaffoldr({
  inputs: [
    {
      name: "controllerName",
      question: "Controller name in camelCase",
      validateAndTransformInput(input: string) {
        if (!new RegExp(/^[a-z][A-Za-z0-9]*$/g).test(input)) {
          throw new Error("Controller name must be camelCase.");
        }
        return input;
      },
    },
    {
      name: "httpMethod",
      question: `Express HTTP Method (${allowedHttpMethods.join(", ")})`,
      validateAndTransformInput(input: string) {
        if (!allowedHttpMethods.includes(input)) {
          throw new Error("HTTP Method must be one of the allowed values");
        }
        return input;
      },
    },
    {
      name: "apiPath",
      question: `API url path (include starting /)`,
      validateAndTransformInput(input: string) {
        if (!input.startsWith("/")) {
          throw new Error("API path must start with /");
        }
        return input;
      },
    },
  ],

  generate(inputs) {
    const controllerFilePath = path.join(
      import.meta.dirname,
      `../../../../controllers-http/${inputs.controllerName}.ct.ts`,
    );

    const generatedCode = codeTemplate(inputs.httpMethod, inputs.apiPath);
    fs.writeFileSync(controllerFilePath, generatedCode);
    // @todo Should return objects of file path and code for the framework to handle the writes

    logger.info(
      Scaffoldr.name,
      `Created controller file: ${controllerFilePath}`,
    );
    logger.info(
      Scaffoldr.name,
      // @todo Maybe an onSave method to help run this???
      `Please update the controller file details and run "npm run codegen:cogenie all" to update the generated files`,
    );
  },
});

const codeTemplate = (
  httpMethod: string,
  apiPath: string,
) => `import { z } from "zod";

import { httpController, useHttpRequestGuard } from "../http/index.js";

// TODO:
// Run "npm run codegen:cogenie all" to generate routes->controller mapping
// after updating controller configs to use this route and delete this comment.
export default httpController({
  version: 1,
  method: "${httpMethod}",
  path: "${apiPath}",
  guards: [
    /* Your request guards, replace array with null if none */
  ],
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    data: z.string(),
  }),
  async httpRequestHandler({ requestBody }) {
    requestBody;
  },
});
`;
