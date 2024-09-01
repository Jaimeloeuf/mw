import { apiDB } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export function createBlogSubscriber(blogSubscriber: NewBlogSubscriber) {
  return apiDB
    .insertInto("blog_subscriber")
    .values(blogSubscriber)
    .returningAll()
    .executeTakeFirstOrThrow();
}
