import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export async function createBlogSubscriber(blogSubscriber: NewBlogSubscriber) {
  return await db
    .insertInto("blog_subscriber")
    .values(blogSubscriber)
    .returningAll()
    .executeTakeFirst();
}
