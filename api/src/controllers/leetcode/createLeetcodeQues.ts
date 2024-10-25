import { z } from "zod";
import { httpController } from "../../http/index.js";
import { leetcodeService } from "../../services/index.js";

export const createLeetcodeQuesController = httpController({
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
    return leetcodeService.createLeetcodeQues(requestBody);
  },
});
