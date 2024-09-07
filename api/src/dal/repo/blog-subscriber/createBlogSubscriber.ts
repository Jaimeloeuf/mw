import { apiDB } from "../../kysely/index.js";
import type { CreateBlogSubscriber } from "../../kysely/index.js";

export function createBlogSubscriber(blogSubscriber: CreateBlogSubscriber) {
  return apiDB
    .insertInto("blog_subscriber")
    .values(blogSubscriber)
    .returningAll()
    .executeTakeFirstOrThrow();
}
