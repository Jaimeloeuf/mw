import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { httpController } from "../../http/index.js";
import { HttpStatusCode } from "../../types/index.js";

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
    setHttpStatusCode(HttpStatusCode.Created_201);
    return sv.bucketlistCreateOne(requestBody.name, requestBody.description);
  },
});
