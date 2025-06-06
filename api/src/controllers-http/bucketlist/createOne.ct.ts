import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { httpController, HttpStatus } from "../../http/index.js";

export default httpController({
  version: 1,
  method: "post",
  path: "/bucketlist",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    name: z.string(),
    description: z.string(),
  }),
  async httpRequestHandler({ requestBody, setHttpStatusCode }) {
    setHttpStatusCode(HttpStatus.Created_201);
    return sv.bucketlistCreateOne(requestBody.name, requestBody.description);
  },
});
