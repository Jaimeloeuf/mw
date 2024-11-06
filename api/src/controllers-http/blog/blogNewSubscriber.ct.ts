import { z } from "zod";
import { httpController, useHttpRequestGuard } from "../../http/index.js";
import { blogRecaptchaGuard } from "./blogRecaptchaGuard.js";
import { blogService } from "../../services/index.js";

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
    await blogService.newSubscriber(requestBody.email);
    setHttpStatusCode(201);
  },
});
