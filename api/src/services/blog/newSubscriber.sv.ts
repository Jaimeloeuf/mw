import { df, infra } from "../../__generated/index.js";
import { ConflictException } from "../../exceptions/index.js";
import { SimplePostProcessing } from "../../spp/index.js";
import { blogEmailService } from "./blogEmailService.js";

/**
 * Add new subscriber for blog
 */
export default async function BlogNewSubscriber(email: string) {
  const isSubscribed =
    await df.blogSubscriberIsEmailAlreadySubscribed.runAndThrowOnError(email);

  if (isSubscribed) {
    throw new ConflictException(`Email '${email}' already subscribed!`);
  }

  const blogSubscriberResult =
    await df.blogSubscriberCreateBlogSubscriber.runAndThrowOnError({
      blog_id: "JJ's blog",
      email: email.toLowerCase(),
      created_at: $DateTime.now.asIsoDateTime(),
      updated_at: $DateTime.now.asIsoDateTime(),
    });

  SimplePostProcessing(BlogNewSubscriber.name)
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
      await infra
        .TelegramBotsMwBot()
        .notifyAdmin.runAndThrowOnError(
          `New blog subscriber: ${blogSubscriberResult.email}`,
        );
    })
    .run();
}
