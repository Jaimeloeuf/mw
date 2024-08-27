import { blogSubscriberRepo } from "../../dal/index.js";
import { ConflictException } from "../../exceptions/index.js";
import { CreateSimplePostProcessingJob } from "../../post-processing/index.js";
import { notifyAdminWithInternalAdminTelegramBot } from "../../infra/index.js";
import { blogEmailService } from "./blogEmailService.js";

/**
 * Add new subscriber for blog
 */
export async function newSubscriber(email: string) {
  const isSubscribed =
    await blogSubscriberRepo.isEmailAlreadySubscribed.getResultOrThrowOnError(
      email,
    );

  if (isSubscribed) {
    throw new ConflictException(`Email '${email}' already subscribed!`);
  }

  const blogSubscriberResult =
    await blogSubscriberRepo.createBlogSubscriber.getResultOrThrowOnError({
      id: crypto.randomUUID(),
      email: email.toLowerCase(),
    });

  CreateSimplePostProcessingJob(newSubscriber.name)
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
