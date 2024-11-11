import type { BlogSubscriber } from "../../kysely/index.js";

import { apiDB } from "../../kysely/index.js";
import { dataFn } from "../dataFn.js";

export default dataFn(async function blogSubscriberDeleteBlogSubscriber(
  id: BlogSubscriber["id"],
) {
  await apiDB
    .deleteFrom("blog_subscriber")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
});
