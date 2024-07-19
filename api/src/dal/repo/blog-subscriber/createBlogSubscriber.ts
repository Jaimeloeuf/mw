import { db } from "../../kysely/index.js";
import type { NewBlogSubscriber } from "../../kysely/index.js";

export async function createBlogSubscriber(blogSubscriber: NewBlogSubscriber) {
  return await db
    .insertInto("blogSubscriber")
    .values(blogSubscriber)
    .returningAll()
    .executeTakeFirst();
}
