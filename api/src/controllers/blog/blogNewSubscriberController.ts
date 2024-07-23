import { z } from "zod";
import { httpController } from "../../http/httpController.js";
import { blogRecaptchaGuard } from "./blogRecaptchaGuard.js";
import { blogService } from "../../services/index.js";

export const blogNewSubscriberController = httpController({
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
