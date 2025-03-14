import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { httpController } from "../../http/index.js";

export default httpController({
  version: 1,
  method: "get",
  path: "/bucketlist/:bucketlistID",
  guards: null,
  urlParamsValidator: z.object({
    bucketlistID: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  async httpRequestHandler({ urlParams }) {
    return sv.bucketlistGetOne(urlParams.bucketlistID);
  },
});
