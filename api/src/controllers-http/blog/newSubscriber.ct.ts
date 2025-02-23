import { z } from "zod";

import { sv } from "../../__generated/index.js";
import { httpController, useHttpRequestGuard } from "../../http/index.js";
import { HttpStatus } from "../../types/index.js";
import { blogRecaptchaGuard } from "./blogRecaptchaGuard.js";

export default httpController({
  version: 1,
  method: "post",
  path: "/blog/subscribe",
  guards: [useHttpRequestGuard("recaptcha", blogRecaptchaGuard)],
  urlParamsValidator: null,
  urlQueryParamsValidator: null,
  requestBodyValidator: z.object({
    email: z.string().email(),
  }),
  async httpRequestHandler({ requestBody, setHttpStatusCode }) {
    await sv.blogNewSubscriber(requestBody.email);
    setHttpStatusCode(HttpStatus.Created_201);
  },
});
