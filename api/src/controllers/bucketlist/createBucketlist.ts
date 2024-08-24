import { z } from "zod";
import { httpController } from "../../http/index.js";
import { bucketlistService } from "../../services/index.js";

export const createBucketlistController = httpController({
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
    return bucketlistService.createBucketlist(
      requestBody.name,
      requestBody.description
    );
  },
});
