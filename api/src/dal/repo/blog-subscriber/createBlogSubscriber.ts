import { apiDB } from "../../kysely/index.js";
import { injectID, OptionalID } from "../injectID.js";
import type { CreateBlogSubscriber } from "../../kysely/index.js";

export function createBlogSubscriber(
  blogSubscriber: OptionalID<CreateBlogSubscriber>,
) {
  return apiDB
    .insertInto("blog_subscriber")
    .values(injectID(blogSubscriber))
    .returningAll()
    .executeTakeFirstOrThrow();
}
