import { z } from "zod";
import { httpController } from "../../http/index.js";
import { leetcodeService } from "../../services/index.js";

export const getLeetcodeQuesController = httpController({
  version: 1,
  method: "get",
  path: "/leetcode/ques/:leetcodeQuesID",
  guards: null,
  urlParamsValidator: z.object({
    leetcodeQuesID: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  async httpRequestHandler({ urlParams }) {
    return leetcodeService.getLeetcodeQues(urlParams.leetcodeQuesID);
  },
});
