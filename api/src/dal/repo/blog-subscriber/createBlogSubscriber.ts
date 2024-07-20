import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export function createBlogSubscriber(blogSubscriber: NewBlogSubscriber) {
  return db
    .insertInto("blog_subscriber")
    .values(blogSubscriber)
    .returningAll()
    .executeTakeFirstOrThrow();
}
