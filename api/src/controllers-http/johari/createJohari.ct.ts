import { z } from "zod";

import { httpController } from "../../http/index.js";

export default httpController({
  version: 1,
  method: "post",
  path: "/johari/create",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    name: z.string(),
    words: z.array(z.string()),
  }),
  async httpRequestHandler({ requestBody }) {
    requestBody;
  },
});
