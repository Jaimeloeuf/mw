import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { httpController } from "../../http/index.js";

export default httpController({
  version: 1,
  method: "post",
  path: "/leetcode/ques",
  guards: null,
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    url: z.string().url(),
    tags: z.array(z.string()),
  }),
  async httpRequestHandler({ requestBody, setHttpStatusCode }) {
    setHttpStatusCode(201);
    return sv.leetcodeCreateLeetcodeQues(requestBody);
  },
});
