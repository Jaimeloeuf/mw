import { z } from "zod";
import { httpController } from "../../http/index.js";
import { bucketlistService } from "../../services/index.js";

export const createBucketlistController = httpController({
  version: 1,
  method: "post",
  path: "/bucketlist",
  guards: null,
  requestDataValidator: z.object({
    name: z.string(),
    description: z.string(),
  }),
  async httpRequestHandler({ requestData, setHttpStatusCode }) {
    setHttpStatusCode(201);
    return bucketlistService.createBucketlist(
      requestData.name,
      requestData.description
    );
  },
});
