import { z } from "zod";

import { httpController } from "../../http/index.js";

export default httpController({
  version: 1,
  method: "get",
  path: "/check/checklist/:checklistID",
  guards: null,
  urlParamsValidator: z.object({
    checklistID: z.string(),
  }),
  urlQueryParamsValidator: null,
  requestBodyValidator: null,
  async httpRequestHandler({ urlParams }) {
    urlParams.checklistID;
  },
});
