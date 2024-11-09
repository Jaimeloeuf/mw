import { z } from "zod";
import { httpController } from "../../http/index.js";
import { sv } from "../../__generated/index.js";

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
    setHttpStatusCode(201);
    return sv.bucketlistCreateOne(requestBody.name, requestBody.description);
  },
});
