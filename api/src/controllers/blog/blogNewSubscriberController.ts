import { z } from "zod";
import { httpController } from "../../http/index.js";
import { useHttpRequestGuard } from "../../http/useHttpRequestGuard.js";
import { blogRecaptchaGuard } from "./blogRecaptchaGuard.js";
import { blogService } from "../../services/index.js";

export const blogNewSubscriberController = httpController({
  version: 1,
  method: "post",
  path: "/blog/subscribe",
  guards: [useHttpRequestGuard("recaptcha", blogRecaptchaGuard)],
  requestDataValidator: z.object({
    email: z.string().email(),
  }),
  async httpRequestHandler({ requestData, setHttpStatusCode }) {
    await blogService.newSubscriber(requestData.email);
    setHttpStatusCode(201);
  },
});
