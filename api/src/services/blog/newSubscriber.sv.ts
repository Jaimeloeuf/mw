import { df } from "../../__generated/index.js";
import { ConflictException } from "../../exceptions/index.js";
import { notifyAdminWithInternalAdminTelegramBot } from "../../infra-shared/index.js";
import { SimplePostProcessing } from "../../post-processing/index.js";
import { blogEmailService } from "./blogEmailService.js";

/**
 * Add new subscriber for blog
 */
export default async function (email: string) {
  const isSubscribed =
    await df.blogSubscriberIsEmailAlreadySubscribed.getResultOrThrowOnError(
      email,
    );

  if (isSubscribed) {
    throw new ConflictException(`Email '${email}' already subscribed!`);
  }

  const blogSubscriberResult =
    await df.blogSubscriberCreateBlogSubscriber.getResultOrThrowOnError({
      email: email.toLowerCase(),
    });

  SimplePostProcessing("BlogNewSubscriber")
    .runJobsInParallel()
    .addJob(async function sendWelcomeEmail() {
      const result = await blogEmailService(
        blogSubscriberResult.email,
        "(JJ's Blog) You made it!",
        `Thanks for being awesome and subscribing, add this email address to your whitelist to ensure it never goes to spam!`,
      );

      if (result instanceof Error) {
        throw result;
      }
    })
    .addJob(async function notifyAdmin() {
      const notificationError = await notifyAdminWithInternalAdminTelegramBot(
        `New blog subscriber: ${blogSubscriberResult.email}`,
      );

      if (notificationError instanceof Error) {
        throw notificationError;
      }
    })
    .run();
}
