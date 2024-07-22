import { z } from "zod";
import { expressWrapper } from "../../http/expressWrapper.js";
import { blogRecaptchaGuard } from "./blogRecaptchaGuard.js";
import { blogService } from "../../services/index.js";

export const blogNewSubscriberController = expressWrapper({
  method: "post",
  path: "/blog/subscribe",
  guards: [blogRecaptchaGuard],
  requestDataValidator: z.object({
    email: z.string().email(),
  }),
  async httpRequestHandler({ requestData, setHttpStatusCode }) {
    await blogService.newSubscriber(requestData.email);
    setHttpStatusCode(201);
  },
});
